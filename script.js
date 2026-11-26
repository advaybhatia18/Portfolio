// Scroll reveal animation
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Active state for floating navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-btn');

const updateActiveNav = () => {
  let current = 'hero';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === `#${current}`);
  });
};

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// Glassmorphism card hover spotlight glow
document.querySelectorAll('.glass-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Interactive skill-to-project highlighting
const skillToProjectMap = {
  'Python': ['ResQlink — Emergency Response Platform', 'B2B AI Engine — Prospecting & Automation', 'DSA & CS Vault'],
  'C++': ['DSA & CS Vault'],
  'C': ['ResQlink — Emergency Response Platform'],
  'JavaScript': ['ResQlink — Emergency Response Platform', 'AdiizzHQ — Developer Brand & Studio'],
  'HTML5': ['ResQlink — Emergency Response Platform', 'AdiizzHQ — Developer Brand & Studio'],
  'CSS3': ['ResQlink — Emergency Response Platform', 'AdiizzHQ — Developer Brand & Studio'],
  'FastAPI': ['ResQlink — Emergency Response Platform'],
  'REST APIs': ['ResQlink — Emergency Response Platform', 'B2B AI Engine — Prospecting & Automation'],
  'Supabase': ['ResQlink — Emergency Response Platform'],
  'PostgreSQL': ['ResQlink — Emergency Response Platform'],
  'AI Agents': ['B2B AI Engine — Prospecting & Automation'],
  'LLMs': ['B2B AI Engine — Prospecting & Automation'],
  'Git': ['ResQlink — Emergency Response Platform', 'AdiizzHQ — Developer Brand & Studio'],
  'GitHub': ['ResQlink — Emergency Response Platform', 'AdiizzHQ — Developer Brand & Studio'],
  'DSA': ['DSA & CS Vault'],
  'OOP': ['DSA & CS Vault'],
  'Trees & Graphs': ['DSA & CS Vault'],
  'Hashing': ['DSA & CS Vault'],
  'API Automation': ['B2B AI Engine — Prospecting & Automation']
};

const skillTags = document.querySelectorAll('.skill-tag');
const projectCards = document.querySelectorAll('.proj-card');

skillTags.forEach((tag) => {
  const skillName = tag.textContent.trim();
  const targetTitles = skillToProjectMap[skillName];

  if (targetTitles && targetTitles.length > 0) {
    tag.style.cursor = 'pointer';

    tag.addEventListener('mouseenter', () => {
      projectCards.forEach((card) => {
        const cardTitle = card.querySelector('.proj-title').textContent.trim();
        if (targetTitles.includes(cardTitle)) {
          card.classList.add('highlighted');
        } else {
          card.classList.add('faded');
        }
      });
    });

    tag.addEventListener('mouseleave', () => {
      projectCards.forEach((card) => {
        card.classList.remove('highlighted', 'faded');
      });
    });
  }
});
