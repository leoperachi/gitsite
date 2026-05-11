const test = require("node:test");
const assert = require("node:assert/strict");

const {
  getLocalizedChatbotConfig,
  getMessagesWithLanguageInstruction,
} = require("./sdk/src/services/chatbotI18n");

test("getLocalizedChatbotConfig merges language-specific bot copy", () => {
  const config = getLocalizedChatbotConfig(
    {
      primaryColor: "#23A267",
      welcomeBubble: "Olá! como posso\nte ajudar?",
      firstBotMessage: "Mensagem em português",
      locales: {
        en: {
          welcomeBubble: "Hi! how can I\nhelp you?",
          firstBotMessage: "English message",
          inputPlaceholder: "Type your message...",
        },
      },
    },
    "en"
  );

  assert.equal(config.primaryColor, "#23A267");
  assert.equal(config.welcomeBubble, "Hi! how can I\nhelp you?");
  assert.equal(config.firstBotMessage, "English message");
  assert.equal(config.inputPlaceholder, "Type your message...");
  assert.equal(config.currentLanguage, "en");
});

test("getLocalizedChatbotConfig falls back to Portuguese copy", () => {
  const config = getLocalizedChatbotConfig(
    {
      welcomeBubble: "Olá! como posso\nte ajudar?",
      locales: {
        pt: {
          welcomeBubble: "Olá! como posso\nte ajudar?",
        },
      },
    },
    "fr"
  );

  assert.equal(config.welcomeBubble, "Olá! como posso\nte ajudar?");
  assert.equal(config.currentLanguage, "pt");
});

test("getMessagesWithLanguageInstruction reinforces language in the latest user message", () => {
  const messages = [
    { role: "user", content: "Quem é você?" },
    { role: "assistant", content: "Sou o assistente do Leo." },
    { role: "user", content: "Tell me about React" },
  ];

  const result = getMessagesWithLanguageInstruction(
    messages,
    "Always answer in English."
  );

  assert.equal(messages[2].content, "Tell me about React");
  assert.equal(
    result[2].content,
    "Always answer in English.\n\nUser message:\nTell me about React"
  );
});
