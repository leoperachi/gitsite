// Sistema de internacionalização
const translations = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      contact: "Contato"
    },
    hero: {
      title: "Olá, eu sou Leo Perachi",
      subtitle: "Desenvolvedor apaixonado por criar soluções inovadoras",
      contactBtn: "Entre em Contato",
      moreBtn: "Saiba Mais"
    },
    about: {
      title: "Sobre Mim",
      subtitle: "Desenvolvedor dedicado com foco em criar experiências digitais excepcionais",
      text1: "Sou um desenvolvedor apaixonado por tecnologia e inovação. Trabalho com as mais recentes tecnologias para criar soluções que fazem a diferença na vida das pessoas.",
      text2: "Minha jornada na programação começou com a curiosidade de entender como as coisas funcionam, e hoje se transformou em uma paixão por criar e inovar.",
      skills: "Habilidades"
    },
    contact: {
      title: "Vamos Conectar",
      subtitle: "Entre em contato ou siga-me nas redes sociais"
    },
    footer: {
      copyright: "© 2024 Leo Perachi. Todos os direitos reservados."
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      contact: "Contact"
    },
    hero: {
      title: "Hello, I'm Leo Perachi",
      subtitle: "Developer passionate about creating innovative solutions",
      contactBtn: "Get in Touch",
      moreBtn: "Learn More"
    },
    about: {
      title: "About Me",
      subtitle: "Dedicated developer focused on creating exceptional digital experiences",
      text1: "I'm a developer passionate about technology and innovation. I work with the latest technologies to create solutions that make a difference in people's lives.",
      text2: "My journey in programming started with the curiosity to understand how things work, and today it has become a passion for creating and innovating.",
      skills: "Skills"
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Get in touch or follow me on social media"
    },
    footer: {
      copyright: "© 2024 Leo Perachi. All rights reserved."
    }
  }
};

// Idioma atual (padrão: português)
let currentLanguage = 'pt';

// Função para traduzir o conteúdo
function translatePage(language) {
  currentLanguage = language;
  const t = translations[language];

  // Navegação
  document.querySelectorAll('.nav-link').forEach((link, index) => {
    const keys = ['home', 'about', 'contact'];
    if (keys[index]) {
      link.textContent = t.nav[keys[index]];
    }
  });

  // Hero section
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.textContent = t.hero.title;
  }

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.textContent = t.hero.subtitle;
  }

  const contactBtn = document.querySelector('.btn-primary');
  if (contactBtn) {
    contactBtn.textContent = t.hero.contactBtn;
  }

  const moreBtn = document.querySelector('.btn-secondary');
  if (moreBtn) {
    moreBtn.textContent = t.hero.moreBtn;
  }

  // About section
  const aboutTitle = document.querySelector('#about .section-header h2');
  if (aboutTitle) {
    aboutTitle.textContent = t.about.title;
  }

  const aboutSubtitle = document.querySelector('#about .section-header p');
  if (aboutSubtitle) {
    aboutSubtitle.textContent = t.about.subtitle;
  }

  const aboutTexts = document.querySelectorAll('#about .about-text p');
  if (aboutTexts.length >= 2) {
    aboutTexts[0].textContent = t.about.text1;
    aboutTexts[1].textContent = t.about.text2;
  }

  const skillsTitle = document.querySelector('#about .skills h3');
  if (skillsTitle) {
    skillsTitle.textContent = t.about.skills;
  }

  // Contact section
  const contactTitle = document.querySelector('#contact .section-header h2');
  if (contactTitle) {
    contactTitle.textContent = t.contact.title;
  }

  const contactSubtitle = document.querySelector('#contact .section-header p');
  if (contactSubtitle) {
    contactSubtitle.textContent = t.contact.subtitle;
  }

  // Footer
  const footerCopyright = document.querySelector('.footer-content p');
  if (footerCopyright) {
    footerCopyright.textContent = t.footer.copyright;
  }

  // Atualizar classes ativas dos botões de idioma
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-lang="${language}"]`).classList.add('active');

  // Salvar preferência no localStorage
  localStorage.setItem('preferred-language', language);
}

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
  // Criar botões de idioma
  createLanguageButtons();

  // Carregar idioma preferido ou usar português como padrão
  const savedLanguage = localStorage.getItem('preferred-language') || 'pt';
  translatePage(savedLanguage);

  // Inicializa Three.js
  initSolarSystem();

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

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  });

  // Animação de entrada para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Elementos para animar
  const animateElements = document.querySelectorAll(
    ".skill-item, .social-link, .contact-item"
  );

  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

  // Efeito de hover nos botões
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

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
  const createMobileMenu = () => {
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelector(".nav-links");

    if (
      window.innerWidth <= 768 &&
      !document.querySelector(".mobile-menu-btn")
    ) {
      const mobileBtn = document.createElement("button");
      mobileBtn.className = "mobile-menu-btn";
      mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
      mobileBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-color);
                cursor: pointer;
                display: block;
            `;

      mobileBtn.addEventListener("click", function () {
        navLinks.style.display =
          navLinks.style.display === "flex" ? "none" : "flex";
        navLinks.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    display: ${
                      navLinks.style.display === "flex" ? "none" : "flex"
                    };
                `;
      });

      nav.appendChild(mobileBtn);
    }
  };

  // Inicializa menu mobile
  createMobileMenu();

  // Recalcula em redimensionamento
  window.addEventListener("resize", createMobileMenu);

  // Efeito de loading suave
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });

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
  const nav = document.querySelector('.nav');
  
  const languageContainer = document.createElement('div');
  languageContainer.className = 'language-buttons';
  
  const ptBtn = document.createElement('button');
  ptBtn.className = 'language-btn active';
  ptBtn.setAttribute('data-lang', 'pt');
  ptBtn.innerHTML = '🇧🇷';
  ptBtn.title = 'Português';
  
  const enBtn = document.createElement('button');
  enBtn.className = 'language-btn';
  enBtn.setAttribute('data-lang', 'en');
  enBtn.innerHTML = '🇺🇸';
  enBtn.title = 'English';
  
  ptBtn.addEventListener('click', () => translatePage('pt'));
  enBtn.addEventListener('click', () => translatePage('en'));
  
  languageContainer.appendChild(ptBtn);
  languageContainer.appendChild(enBtn);
  
  nav.appendChild(languageContainer);
}

// Variáveis globais para Three.js
let scene, camera, renderer;
let planets = [];
let stars = [];
let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };
let cameraDistance = 15;
let cameraRotationX = 0;
let cameraRotationY = 0;

// Configuração do sistema solar
const solarSystemConfig = {
  sun: {
    radius: 0.5,
    color: 0xffdd00,
    position: [0, 0, 0],
    speed: 0,
  },
  mercury: {
    radius: 0.08,
    color: 0x8c7853,
    distance: 1.5,
    speed: 0.02,
    inclination: 0.1,
  },
  venus: {
    radius: 0.12,
    color: 0xffa500,
    distance: 2.2,
    speed: 0.015,
    inclination: 0.05,
  },
  earth: {
    radius: 0.13,
    color: 0x0066cc,
    distance: 3,
    speed: 0.01,
    inclination: 0.02,
  },
  mars: {
    radius: 0.1,
    color: 0xff4400,
    distance: 4,
    speed: 0.008,
    inclination: 0.03,
  },
  jupiter: {
    radius: 0.3,
    color: 0xffaa00,
    distance: 6,
    speed: 0.005,
    inclination: 0.01,
  },
  saturn: {
    radius: 0.25,
    color: 0xffdd88,
    distance: 8,
    speed: 0.003,
    inclination: 0.02,
  },
};

// Função para inicializar Three.js
function initSolarSystem() {
  const canvas = document.getElementById("threejs-canvas");
  if (!canvas) return;

  // Configuração da cena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000011);

  // Configuração da câmera
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  updateCameraPosition();

  // Configuração do renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Criar estrelas de fundo
  createStars();

  // Criar sistema solar
  createSolarSystem();

  // Adicionar luzes
  addLights();

  // Adicionar eventos de mouse
  setupMouseControls();

  // Iniciar animação
  animate();
}

// Função para configurar controles do mouse
function setupMouseControls() {
  const canvas = document.getElementById("threejs-canvas");

  // Mouse move
  canvas.addEventListener("mousemove", onMouseMove);

  // Mouse down
  canvas.addEventListener("mousedown", onMouseDown);

  // Mouse up
  canvas.addEventListener("mouseup", onMouseUp);

  // Mouse wheel (zoom)
  canvas.addEventListener("wheel", onMouseWheel);

  // Touch events para mobile
  canvas.addEventListener("touchstart", onTouchStart);
  canvas.addEventListener("touchmove", onTouchMove);
  canvas.addEventListener("touchend", onTouchEnd);

  // Redimensionamento
  window.addEventListener("resize", onWindowResize);
}

// Função para atualizar posição da câmera
function updateCameraPosition() {
  const x =
    cameraDistance * Math.sin(cameraRotationY) * Math.cos(cameraRotationX);
  const y = cameraDistance * Math.sin(cameraRotationX);
  const z =
    cameraDistance * Math.cos(cameraRotationY) * Math.cos(cameraRotationX);

  camera.position.set(x, y, z);
  camera.lookAt(0, 0, 0);
}

// Função para criar estrelas de fundo
function createStars() {
  const starGeometry = new THREE.SphereGeometry(0.02, 8, 8);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < 1000; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    star.material.opacity = Math.random() * 0.8 + 0.2;
    star.material.transparent = true;
    stars.push(star);
    scene.add(star);
  }
}

// Função para criar o sistema solar
function createSolarSystem() {
  // Criar Sol
  const sunGeometry = new THREE.SphereGeometry(
    solarSystemConfig.sun.radius,
    32,
    32
  );
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: solarSystemConfig.sun.color,
    emissive: solarSystemConfig.sun.color,
    emissiveIntensity: 0.3,
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  // Criar planetas
  Object.keys(solarSystemConfig).forEach((planetName) => {
    if (planetName === "sun") return;

    const planetConfig = solarSystemConfig[planetName];

    // Geometria do planeta
    const planetGeometry = new THREE.SphereGeometry(
      planetConfig.radius,
      32,
      32
    );
    const planetMaterial = new THREE.MeshLambertMaterial({
      color: planetConfig.color,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    // Posição inicial
    planet.position.set(planetConfig.distance, 0, 0);
    planet.rotation.x = planetConfig.inclination;

    // Adicionar ao array de planetas
    planets.push({
      mesh: planet,
      config: planetConfig,
      angle: Math.random() * Math.PI * 2,
    });

    scene.add(planet);

    // Criar órbita (linha tracejada)
    const orbitGeometry = new THREE.RingGeometry(
      planetConfig.distance - 0.01,
      planetConfig.distance + 0.01,
      64
    );
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = -Math.PI / 2;
    scene.add(orbit);
  });
}

// Função para adicionar luzes
function addLights() {
  // Luz ambiente
  const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
  scene.add(ambientLight);

  // Luz do Sol
  const sunLight = new THREE.PointLight(0xffffff, 1, 100);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // Luz direcional
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);
}

// Função de animação
function animate() {
  requestAnimationFrame(animate);

  // Animar planetas
  planets.forEach((planet) => {
    planet.angle += planet.config.speed;

    const x = planet.config.distance * Math.cos(planet.angle);
    const z = planet.config.distance * Math.sin(planet.angle);

    planet.mesh.position.x = x;
    planet.mesh.position.z = z;

    // Rotação do planeta em torno do próprio eixo
    planet.mesh.rotation.y += 0.01;
  });

  // Animar estrelas (efeito de brilho)
  stars.forEach((star, index) => {
    star.material.opacity =
      0.2 + 0.6 * Math.sin(Date.now() * 0.001 + index * 0.1);
  });

  // Renderizar a cena
  renderer.render(scene, camera);
}

// Eventos do mouse
function onMouseMove(event) {
  if (isMouseDown) {
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    cameraRotationY += deltaX * 0.01;
    cameraRotationX += deltaY * 0.01;

    // Limitar rotação vertical
    cameraRotationX = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, cameraRotationX)
    );

    updateCameraPosition();
  }

  previousMousePosition.x = event.clientX;
  previousMousePosition.y = event.clientY;
}

function onMouseDown(event) {
  isMouseDown = true;
  previousMousePosition.x = event.clientX;
  previousMousePosition.y = event.clientY;
}

function onMouseUp(event) {
  isMouseDown = false;
}

function onMouseWheel(event) {
  event.preventDefault();

  // Zoom
  cameraDistance += event.deltaY * 0.01;
  cameraDistance = Math.max(5, Math.min(30, cameraDistance));

  updateCameraPosition();
}

// Eventos de touch para mobile
function onTouchStart(event) {
  if (event.touches.length === 1) {
    isMouseDown = true;
    previousMousePosition.x = event.touches[0].clientX;
    previousMousePosition.y = event.touches[0].clientY;
  }
}

function onTouchMove(event) {
  event.preventDefault();

  if (event.touches.length === 1 && isMouseDown) {
    const deltaX = event.touches[0].clientX - previousMousePosition.x;
    const deltaY = event.touches[0].clientY - previousMousePosition.y;

    cameraRotationY += deltaX * 0.01;
    cameraRotationX += deltaY * 0.01;

    cameraRotationX = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, cameraRotationX)
    );

    updateCameraPosition();
  }

  previousMousePosition.x = event.touches[0].clientX;
  previousMousePosition.y = event.touches[0].clientY;
}

function onTouchEnd(event) {
  isMouseDown = false;
}

// Função para redimensionamento da janela
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
