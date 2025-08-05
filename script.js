// Sistema de internacionalização
const translations = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      contact: "Contato",
    },
    hero: {
      title: "Olá, eu sou Leo Perachi",
      subtitle: "Desenvolvedor apaixonado por criar soluções inovadoras",
      contactBtn: "Entre em Contato",
      moreBtn: "Saiba Mais",
    },
    about: {
      title: "Sobre Mim",
      subtitle:
        "Desenvolvedor dedicado com foco em criar experiências digitais excepcionais",
      text1:
        "Sou um desenvolvedor apaixonado por tecnologia e inovação. Trabalho com as mais recentes tecnologias para criar soluções que fazem a diferença na vida das pessoas.",
      text2:
        "Minha jornada na programação começou com a curiosidade de entender como as coisas funcionam, e hoje se transformou em uma paixão por criar e inovar.",
      skills: "Habilidades",
    },
    contact: {
      title: "Vamos Conectar",
      subtitle: "Entre em contato ou siga-me nas redes sociais",
    },
    footer: {
      copyright: "© 2024 Leo Perachi. Todos os direitos reservados.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Hello, I'm Leo Perachi",
      subtitle: "Developer passionate about creating innovative solutions",
      contactBtn: "Get in Touch",
      moreBtn: "Learn More",
    },
    about: {
      title: "About Me",
      subtitle:
        "Dedicated developer focused on creating exceptional digital experiences",
      text1:
        "I'm a developer passionate about technology and innovation. I work with the latest technologies to create solutions that make a difference in people's lives.",
      text2:
        "My journey in programming started with the curiosity to understand how things work, and today it has become a passion for creating and innovating.",
      skills: "Skills",
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Get in touch or follow me on social media",
    },
    footer: {
      copyright: "© 2024 Leo Perachi. All rights reserved.",
    },
  },
};

// Idioma atual (padrão: português)
let currentLanguage = "pt";

// Função para traduzir o conteúdo
function translatePage(language) {
  currentLanguage = language;
  const t = translations[language];

  // Navegação
  document.querySelectorAll(".nav-link").forEach((link, index) => {
    const keys = ["home", "about", "contact"];
    if (keys[index]) {
      link.textContent = t.nav[keys[index]];
    }
  });

  // Hero section
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.textContent = t.hero.title;
  }

  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) {
    heroSubtitle.textContent = t.hero.subtitle;
  }

  const contactBtn = document.querySelector(".btn-primary");
  if (contactBtn) {
    contactBtn.textContent = t.hero.contactBtn;
  }

  const moreBtn = document.querySelector(".btn-secondary");
  if (moreBtn) {
    moreBtn.textContent = t.hero.moreBtn;
  }

  // About section
  const aboutTitle = document.querySelector("#about .section-header h2");
  if (aboutTitle) {
    aboutTitle.textContent = t.about.title;
  }

  const aboutSubtitle = document.querySelector("#about .section-header p");
  if (aboutSubtitle) {
    aboutSubtitle.textContent = t.about.subtitle;
  }

  const aboutTexts = document.querySelectorAll("#about .about-text p");
  if (aboutTexts.length >= 2) {
    aboutTexts[0].textContent = t.about.text1;
    aboutTexts[1].textContent = t.about.text2;
  }

  const skillsTitle = document.querySelector("#about .skills h3");
  if (skillsTitle) {
    skillsTitle.textContent = t.about.skills;
  }

  // Contact section
  const contactTitle = document.querySelector("#contact .section-header h2");
  if (contactTitle) {
    contactTitle.textContent = t.contact.title;
  }

  const contactSubtitle = document.querySelector("#contact .section-header p");
  if (contactSubtitle) {
    contactSubtitle.textContent = t.contact.subtitle;
  }

  // Footer
  const footerCopyright = document.querySelector(".footer-content p");
  if (footerCopyright) {
    footerCopyright.textContent = t.footer.copyright;
  }

  // Atualizar classes ativas dos botões de idioma
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`[data-lang="${language}"]`).classList.add("active");

  // Salvar preferência no localStorage
  localStorage.setItem("preferred-language", language);
}

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
  // Criar botões de idioma
  createLanguageButtons();

  // Carregar idioma preferido ou usar português como padrão
  const savedLanguage = localStorage.getItem("preferred-language") || "pt";
  translatePage(savedLanguage);

  // Smooth scrolling para links de navegação
  const navLinks = document.querySelectorAll(".nav-link, .footer-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header transparente no scroll
  const header = document.querySelector(".header");

  // Efeito de digitação no título
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = "";

    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        heroTitle.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Inicia a animação após um pequeno delay
    setTimeout(typeWriter, 500);
  }

  // Contador de habilidades (efeito visual)
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Efeito de parallax suave no hero
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Menu mobile (para futuras implementações)

  // Recalcula em redimensionamento

  // Tooltip para links sociais
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.05)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Efeito de destaque no scroll
  const sections = document.querySelectorAll("section");

  const highlightSection = () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
        section.style.opacity = "1";
        section.style.transform = "scale(1)";
      } else {
        section.style.opacity = "0.8";
        section.style.transform = "scale(0.98)";
      }
    });
  };

  window.addEventListener("scroll", highlightSection);
  highlightSection(); // Executa uma vez no carregamento

  // Console log personalizado
  console.log(
    "%c👋 Olá! Bem-vindo ao meu site pessoal!",
    "color: #2563eb; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%c💻 Desenvolvido com HTML, CSS e JavaScript",
    "color: #6b7280; font-size: 14px;"
  );
});

// Função para criar botões de idioma
function createLanguageButtons() {
  const nav = document.querySelector(".nav");

  const languageContainer = document.createElement("div");
  languageContainer.className = "language-buttons";

  const ptBtn = document.createElement("button");
  ptBtn.className = "language-btn active";
  ptBtn.setAttribute("data-lang", "pt");
  ptBtn.innerHTML = "🇧🇷";
  ptBtn.title = "Português";

  const enBtn = document.createElement("button");
  enBtn.className = "language-btn";
  enBtn.setAttribute("data-lang", "en");
  enBtn.innerHTML = "🇺🇸";
  enBtn.title = "English";

  ptBtn.addEventListener("click", () => translatePage("pt"));
  enBtn.addEventListener("click", () => translatePage("en"));

  languageContainer.appendChild(ptBtn);
  languageContainer.appendChild(enBtn);

  nav.appendChild(languageContainer);
}

// Matrix Code Rain Effect
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix characters
const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 10;
const columns = canvas.width / fontSize;

// Array to track the y position of each column
const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

// Colors
const colors = ["#0F0", "#0FF", "#F0F", "#FF0", "#F00", "#00F"];

function draw() {
  // Semi-transparent black background to create fade effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the characters
  ctx.fillStyle = "#0F0"; // Matrix green
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    // Random character from matrix
    const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];

    // Draw the character
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset to top when reaching bottom
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

// Animation loop
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start animation
animate();
