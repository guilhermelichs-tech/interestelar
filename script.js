const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  observer.observe(element);
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    const visual = document.querySelector('.hero-visual');
    if (visual && offset < window.innerHeight && window.innerWidth > 580) {
      visual.style.transform = `translateY(${offset * 0.08}px)`;
    }
  }, { passive: true });
}

const orbitTeams = document.querySelectorAll('.orbit-team');

const closeOrbitTeams = (except = null) => {
  orbitTeams.forEach((team) => {
    if (team === except) return;
    team.classList.remove('is-expanded');
    team.setAttribute('aria-expanded', 'false');
  });
};

orbitTeams.forEach((team) => {
  const teamName = team.querySelector('img')?.alt || 'time';
  team.setAttribute('role', 'button');
  team.setAttribute('tabindex', '0');
  team.setAttribute('aria-label', `Ampliar logo do time ${teamName}`);
  team.setAttribute('aria-expanded', 'false');

  const toggleTeam = (event) => {
    event.stopPropagation();
    const willExpand = !team.classList.contains('is-expanded');
    closeOrbitTeams(team);
    team.classList.toggle('is-expanded', willExpand);
    team.setAttribute('aria-expanded', String(willExpand));
  };

  team.addEventListener('click', toggleTeam);
  team.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTeam(event);
    }
  });
});

document.addEventListener('click', () => closeOrbitTeams());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeOrbitTeams();
});

const copyPixButton = document.querySelector('.copy-pix-button');

copyPixButton?.addEventListener('click', async () => {
  const pixKey = copyPixButton.dataset.pix;
  if (!pixKey) return;

  try {
    await navigator.clipboard.writeText(pixKey);
    copyPixButton.textContent = 'Copiado!';
    copyPixButton.classList.add('copied');
    window.setTimeout(() => {
      copyPixButton.textContent = 'Copiar';
      copyPixButton.classList.remove('copied');
    }, 2200);
  } catch {
    copyPixButton.textContent = 'Selecione a chave';
  }
});
