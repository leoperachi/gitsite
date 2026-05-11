(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ChatbotI18n = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function resolveLanguage(baseConfig, language) {
    const locales = baseConfig.locales || {};
    if (locales[language]) return language;
    if (locales.pt) return "pt";
    return language;
  }

  function getLocalizedChatbotConfig(baseConfig, language) {
    const resolvedLanguage = resolveLanguage(baseConfig, language);
    const localized = baseConfig.locales?.[resolvedLanguage] || {};

    return {
      ...baseConfig,
      ...localized,
      currentLanguage: resolvedLanguage,
    };
  }

  function getMessagesWithLanguageInstruction(messages, instruction) {
    if (!instruction) return messages;

    const latestUserIndex = messages.findLastIndex(
      (message) => message.role === "user"
    );

    if (latestUserIndex === -1) return messages;

    return messages.map((message, index) => {
      if (index !== latestUserIndex) return { ...message };

      return {
        ...message,
        content: `${instruction}\n\nUser message:\n${message.content}`,
      };
    });
  }

  return {
    getLocalizedChatbotConfig,
    getMessagesWithLanguageInstruction,
  };
});
