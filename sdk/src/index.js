// @ts-check

import { ChatbotView } from './views/chatBotView.js';
import { PromptService } from './services/promptService.js'
import { ChatbotController } from './controllers/chatBotController.js';
import * as chatbotI18nModule from './services/chatbotI18n.js';

(async () => {
    const root = new URL('../../', import.meta.url);
    const fromMainProject = (path) => new URL(path, root).toString();
    const [css, html, baseConfig] = await Promise.all([
        fetch(fromMainProject('./sdk/ew-chatbot.css')).then(r => r.text()),
        fetch(fromMainProject('./sdk/ew-chatbot.html')).then(r => r.text()),
        fetch('./botData/chatbot-config.json').then(r => r.json()),
    ]);
    const i18n = chatbotI18nModule.default || globalThis.ChatbotI18n;
    const getLocalizedConfig = i18n.getLocalizedChatbotConfig;
    const initialLanguage = localStorage.getItem("preferred-language") || "pt";
    const config = getLocalizedConfig(baseConfig, initialLanguage);

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    const promptService = new PromptService(config);
    const chatbotView = new ChatbotView(config);
    const controller = new ChatbotController({ chatbotView, promptService });

    controller.init({ firstBotMessage: config.firstBotMessage });

    window.addEventListener("site-language-change", (event) => {
        const language = event.detail?.language || "pt";
        const nextConfig = getLocalizedConfig(baseConfig, language);
        controller.setLanguage(nextConfig);
    });
})();
