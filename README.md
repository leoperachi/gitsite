# Leo Perachi - Personal Website

Um site pessoal moderno e interativo com animação do sistema solar em Three.js, sistema de internacionalização e design responsivo.

## 🌟 Características

- **Animação 3D**: Sistema solar interativo com Three.js
- **Internacionalização**: Suporte para português e inglês
- **Design Responsivo**: Adaptável a todos os dispositivos
- **Elementos Interativos**: Imagem de perfil e WhatsApp flutuantes
- **Animações Suaves**: Efeitos de hover e transições

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis CSS
- **JavaScript**: Interatividade e animações
- **Three.js**: Renderização 3D do sistema solar
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter

## 📱 Funcionalidades

### Sistema Solar Interativo
- Planetas orbitando o Sol em tempo real
- Controles de câmera (zoom, rotação)
- Estrelas de fundo com efeito de brilho
- Responsivo a mouse e touch

### Internacionalização
- Botões de idioma com bandeiras
- Tradução completa do conteúdo
- Persistência da preferência do usuário
- Suporte para português e inglês

### Elementos Flutuantes
- Imagem de perfil no canto superior esquerdo
- Ícone do WhatsApp no canto inferior direito
- Posicionamento absoluto responsivo

## 🌐 Deploy

O site está publicado no GitHub Pages e pode ser acessado em:
**https://leoperachi.github.io/gitsite/**

## 🛠️ Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/leoperachi/gitsite.git
cd gitsite
```

2. Abra o arquivo `index.html` em um navegador

3. Ou use um servidor local:
```bash
python -m http.server 8000
# ou
npx serve .
```

## 📁 Estrutura do Projeto

```
gitsite/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript e Three.js
├── README.md               # Documentação
└── .github/workflows/      # GitHub Actions
    └── deploy.yml          # Workflow de deploy
```

## 🎨 Personalização

### Cores e Estilo
Edite as variáveis CSS em `styles.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #3b82f6;
}
```

### Conteúdo
- **Nome**: Altere "Leo Perachi" no HTML
- **Links**: Atualize GitHub e LinkedIn
- **WhatsApp**: Modifique o número no link
- **Traduções**: Edite o objeto `translations` no JavaScript

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- **Desktop**: Layout completo
- **Tablet**: Layout adaptado
- **Mobile**: Layout otimizado para touch
- **Landscape**: Aproveitamento de espaço horizontal

## 🔧 Configuração do GitHub Pages

1. O repositório está configurado com GitHub Actions
2. Deploy automático na branch `main`
3. Site disponível em `https://leoperachi.github.io/gitsite/`

## 📞 Contato

- **GitHub**: [@leoperachi](https://github.com/leoperachi)
- **LinkedIn**: [Leo Perachi](https://linkedin.com/in/leoperachi)
- **WhatsApp**: Disponível no site

---

**Desenvolvido com ❤️ por Leo Perachi**
