
import * as chatbotI18nModule from './chatbotI18n.js';

const chatbotI18n = chatbotI18nModule.default || globalThis.ChatbotI18n;

export class PromptService {
    #messages = []
    #config
    #abortController = null

    constructor(config) {
        this.#config = config
    }

    get config() {
        return this.#config
    }

    setConfig(config) {
        const languageChanged = config.currentLanguage !== this.#config.currentLanguage
        this.#config = config
        if (languageChanged) {
            this.#messages = []
        }
    }

    async *promptStream(text) {
        this.#messages.push({
            role: 'user',
            content: text,
        })

        this.#abortController = new AbortController()

        const url = `${this.#config.proxyUrl.replace(/\/+$/, '')}/api/chat`
        const instructedMessages = chatbotI18n.getMessagesWithLanguageInstruction(
            this.#messages,
            this.#config.responseLanguageInstruction
        )
        const messages = this.#config.responseLanguageInstruction
            ? [{ role: 'system', content: this.#config.responseLanguageInstruction }, ...instructedMessages]
            : instructedMessages
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages }),
            signal: this.#abortController.signal,
        })

        if (!response.ok || !response.body) {
            throw new Error(`Proxy respondeu ${response.status}`)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let assistantContent = ''

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() ?? ''

            for (const line of lines) {
                if (!line.trim()) continue
                let obj
                try {
                    obj = JSON.parse(line)
                } catch {
                    continue
                }
                const chunk = obj.message?.content
                if (chunk) {
                    assistantContent += chunk
                    yield assistantContent
                }
                if (obj.done) {
                    this.#messages.push({ role: 'assistant', content: assistantContent })
                }
            }
        }
    }

    stop() {
        if (this.#abortController) {
            this.#abortController.abort()
            this.#abortController = null
        }
    }
}
