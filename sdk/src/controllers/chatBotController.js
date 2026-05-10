// @ts-check

/**
 * @typedef {import("../views/chatBotView.js").ChatbotView} ChatBotView
 * @typedef {import("../services/promptService.js").PromptService} PromptService
 */

export class ChatbotController {

    #chatbotView;
    #promptService;

    /**
    * @param {Object} deps - Dependencies for the class.
    * @param {ChatBotView} deps.chatbotView - The chatbot view instance.
    * @param {PromptService} deps.promptService - The prompt service instance.
    */
    constructor({ chatbotView, promptService }) {
        this.#chatbotView = chatbotView;
        this.#promptService = promptService;
    }

    async init({ firstBotMessage }) {
        this.#setupEvents();
        this.#chatbotView.renderWelcomeBubble();
        this.#chatbotView.setInputEnabled(true);
        this.#chatbotView.appendBotMessage(firstBotMessage, null, false);
    }

    #setupEvents() {
        this.#chatbotView.setupEventHandlers({
            onOpen: this.#onOpen.bind(this),
            onSend: this.#chatBotReply.bind(this),
            onStop: this.#handleStop.bind(this),
        });
    }

    #handleStop() {
        this.#promptService.stop();
    }

    async #chatBotReply(userMsg) {
        this.#chatbotView.showTypingIndicator();
        this.#chatbotView.setInputEnabled(false);

        let streamingEl = null;
        try {
            for await (const partial of this.#promptService.promptStream(userMsg)) {
                if (!streamingEl) {
                    this.#chatbotView.hideTypingIndicator();
                    streamingEl = this.#chatbotView.createStreamingBotMessage();
                }
                this.#chatbotView.updateStreamingBotMessage(streamingEl, partial);
            }
        } catch (err) {
            if (err?.name !== 'AbortError') {
                console.error(err);
                this.#chatbotView.appendBotMessage(
                    '⚠️ Não consegui falar com o servidor de IA agora. Tente novamente em instantes.'
                );
            }
        } finally {
            this.#chatbotView.hideTypingIndicator();
            this.#chatbotView.setInputEnabled(true);
        }
    }

    async #onOpen() {
        this.#chatbotView.setInputEnabled(true);
    }
}
