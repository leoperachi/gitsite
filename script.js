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
  window.dispatchEvent(
    new CustomEvent("site-language-change", { detail: { language } }),
  );
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
    "color: #2563eb; font-size: 16px; font-weight: bold;",
  );
  console.log(
    "%c💻 Desenvolvido com HTML, CSS e JavaScript",
    "color: #6b7280; font-size: 14px;",
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
let columns = Math.floor(canvas.width / fontSize);

// Array to track the y position of each column
const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

// Skills to highlight inside the matrix
const skills = [
  "System Documentation",
  "FULL STACK DEV",
  ".NET DEV",
  "JAVASCRIPT DEV",
  "REACT",
  "ASP.NET",
  "C#",
  "System Deployment",
  "VB.NET",
  "ENTITY FRAMEWORK",
  "VUE.JS",
  "API Testing",
  "GIT",
  "HTML/CSS",
  "System Maintenance",
  "SQL",
  "NOSQL",
  "NODE.JS",
  "API Monitoring",
  "MONGO DB",
  "POSTGRESQL",
  "System Performance",
  "MYSQL",
  "IA",
  "OLLAMA",
  "LLMS",
  "SQL SERVER",
  "jQuery",
  "Bootstrap",
  "Tailwind CSS",
  "Docker",
  "System Analysis",
  "API Documentation",
  "AWS",
  "Azure",
  "API Performance",
  "System Security",
  "MCP",
  "Android",
  "IOS",
  "Flutter",
  "React Native",
  "Python",
  "PHP",
  "System Testing",
  "API Security",
  "SCRUM",
  "AGILE",
  "System Optimization",
  "API Development",
  "SCRUM DEVELOPER",
  "System Design",
  "API Design",
  "API Management",
  "System Architecture",
  "System Implementation",
];

// Active skill reveals are drawn by the same rain loop, so the words feel
// like they are formed by real columns instead of painted over the canvas.
const activeReveals = [];
let nextWordAt = performance.now() + 400;

// Cursor into the skills list so we cycle in order without repeating
// a text that's already visible on screen.
let skillsCursor = 0;

function pickNextSkill() {
  const active = new Set(activeReveals.map((w) => w.text));
  for (let i = 0; i < skills.length; i++) {
    const idx = (skillsCursor + i) % skills.length;
    if (!active.has(skills[idx])) {
      skillsCursor = (idx + 1) % skills.length;
      return skills[idx];
    }
  }
  return null; // every skill is currently active
}

// Spawn zone for skill words — relative to canvas internal size.
// The canvas is displayed at 200% via CSS, so only canvas pixels in
// [0..canvas.width/2] × [0..canvas.height/2] are actually on-screen.
// These ratios target the right side of the visible viewport.
// The TOP edge is overridden at spawn time by the real navbar height
// (see getNavbarBottomCanvasY) so text never renders behind the fixed nav.
const SPAWN_ZONE = {
  xMin: 0.18, // ~36% of visible viewport
  xMax: 0.46, // ~92% of visible viewport
  yMin: 0.12, // baseline; effective top is max(this, navbar bottom + margins)
  yMax: 0.47, // close to the bottom of the visible canvas area
};

// On viewports ≤768px the canvas is pinned to the bottom of `.hero` via CSS,
// so the visible portion of the canvas internal coordinates is the bottom half.
// These ratios target that visible bottom half.
const MOBILE_SPAWN_ZONE = {
  yMin: 0.62,
  yMax: 0.92,
};

// The navbar is position: fixed on top of the canvas. We measure its real
// height from the DOM at spawn time and convert it to canvas internal
// coordinates so the spawn zone always sits below it, regardless of viewport
// size or CSS scaling of the canvas element.
const headerEl = document.querySelector(".header");

function getNavbarCanvasMetrics() {
  const navHeight = headerEl ? headerEl.getBoundingClientRect().height : 80;
  const rect = canvas.getBoundingClientRect();
  const yScale = canvas.height / Math.max(rect.height, 1);
  const navHeightCanvasY = navHeight * yScale;
  // Navbar is position: fixed at viewport top (y = 0..navHeight).
  // Convert its bottom edge from viewport y → canvas internal y so this works
  // regardless of where the canvas display element sits in the viewport.
  const navBottomCanvasY = Math.max(0, (navHeight - rect.top) * yScale);

  return {
    navBottomCanvasY,
    navHeightCanvasY,
  };
}

function spawnSkillWord() {
  const text = pickNextSkill();
  if (!text) return; // all skills currently on screen

  const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

  // Dynamic top: keep text + glow strictly below the navbar.
  const { navBottomCanvasY, navHeightCanvasY } = getNavbarCanvasMetrics();
  const glowPadding = 22; // canvas px of safety for the glow

  const columnRange = MatrixSkillRain.getRevealColumnRange({
    canvasWidth: canvas.width,
    fontSize,
    zoneMinRatio: SPAWN_ZONE.xMin,
    zoneMaxRatio: SPAWN_ZONE.xMax,
    textLength: text.length,
    totalColumns: columns,
  });
  const rowZone = isMobileViewport ? MOBILE_SPAWN_ZONE : SPAWN_ZONE;
  const rowRange = MatrixSkillRain.getRevealRowRange({
    canvasHeight: canvas.height,
    fontSize,
    zoneMinRatio: rowZone.yMin,
    zoneMaxRatio: rowZone.yMax,
    navBottomCanvasY,
    navHeightCanvasY,
    glowPadding,
  });
  let startColumn = 0;
  let targetRow = 0;
  let placed = false;
  for (let attempt = 0; attempt < 14 && !placed; attempt++) {
    startColumn =
      columnRange.minColumn +
      Math.floor(
        Math.random() *
          Math.max(columnRange.maxColumn - columnRange.minColumn + 1, 1),
      );
    targetRow =
      rowRange.minRow +
      Math.floor(
        Math.random() * Math.max(rowRange.maxRow - rowRange.minRow + 1, 1),
      );

    placed = !activeReveals.some((reveal) => {
      const sameRow = Math.abs(reveal.targetRow - targetRow) <= 2;
      const overlapsColumns =
        startColumn < reveal.startColumn + reveal.text.length + 3 &&
        startColumn + text.length + 3 > reveal.startColumn;
      return sameRow && overlapsColumns;
    });
  }

  if (!placed) {
    // Roll the cursor back so this skill is picked again on the next tick
    skillsCursor = (skillsCursor - 1 + skills.length) % skills.length;
    return;
  }

  activeReveals.push(
    MatrixSkillRain.createSkillReveal({
      text,
      startColumn,
      targetRow,
      now: performance.now(),
      readableDuration: isMobileViewport ? 1600 : undefined,
      dissolveDuration: isMobileViewport ? 850 : undefined,
    }),
  );
}

function pruneFinishedReveals(now) {
  for (let i = activeReveals.length - 1; i >= 0; i--) {
    if (now >= activeReveals[i].endsAt) {
      activeReveals.splice(i, 1);
    }
  }
}

function getRevealForCell(column, row, now, randomGlyph) {
  for (const reveal of activeReveals) {
    const result = MatrixSkillRain.getRevealGlyph(
      reveal,
      column,
      row,
      now,
      randomGlyph,
    );

    if (result) {
      return result;
    }
  }

  return {
    glyph: randomGlyph(),
    phase: "rain",
    alpha: 1,
    glow: 0,
  };
}

function applyRainStyle(revealGlyph) {
  if (revealGlyph.phase === "readable") {
    const readableAlpha = window.matchMedia("(max-width: 768px)").matches
      ? Math.min(1, revealGlyph.alpha + 0.12)
      : revealGlyph.alpha;
    ctx.fillStyle = `rgba(230, 255, 230, ${readableAlpha})`;
    ctx.shadowColor = "rgba(0, 255, 120, 0.9)";
    ctx.shadowBlur = 10 * revealGlyph.glow;
    return;
  }

  if (revealGlyph.phase === "forming") {
    ctx.fillStyle = `rgba(80, 255, 120, ${revealGlyph.alpha})`;
    ctx.shadowColor = "rgba(0, 255, 80, 0.55)";
    ctx.shadowBlur = 5 * revealGlyph.glow;
    return;
  }

  if (revealGlyph.phase === "dissolving") {
    ctx.fillStyle = `rgba(0, 255, 80, ${0.35 + revealGlyph.alpha * 0.45})`;
    ctx.shadowColor = "rgba(0, 255, 80, 0.45)";
    ctx.shadowBlur = 6 * revealGlyph.glow;
    return;
  }

  ctx.fillStyle = "#0F0";
  ctx.shadowBlur = 0;
}

function drawRevealCells(now) {
  // Draw fixed cells inside the same matrix grid while the rain keeps moving.
  for (const reveal of activeReveals) {
    for (const letter of reveal.letters) {
      const revealGlyph = MatrixSkillRain.getRevealGlyph(
        reveal,
        letter.column,
        letter.row,
        now,
        () => matrixArray[Math.floor(Math.random() * matrixArray.length)],
      );

      applyRainStyle(revealGlyph);

      if (revealGlyph.phase !== "rain") {
        ctx.fillText(
          revealGlyph.glyph,
          letter.column * fontSize,
          letter.row * fontSize,
        );
      }
    }
  }
}

function draw() {
  // Semi-transparent black background to create fade effect
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const now = performance.now();
  pruneFinishedReveals(now);

  if (now >= nextWordAt && activeReveals.length < 4) {
    spawnSkillWord();
    // Next spawn: 650–1500ms later, enough time to notice each formation.
    nextWordAt = now + 650 + Math.random() * 850;
  }

  // Draw the rain characters
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";

  for (let i = 0; i < drops.length; i++) {
    const row = drops[i];
    const revealGlyph = getRevealForCell(
      i,
      row,
      now,
      () => matrixArray[Math.floor(Math.random() * matrixArray.length)],
    );

    applyRainStyle(revealGlyph);
    ctx.fillText(revealGlyph.glyph, i * fontSize, row * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  drawRevealCells(now);
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
  columns = Math.floor(canvas.width / fontSize);
  drops.length = 0;
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
});

// Start animation
animate();
