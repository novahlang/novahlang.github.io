function closeNav() {
  const links = document.querySelector('.nav-list');
  const nav = document.querySelector('nav');
  const button = document.querySelector('button');

  nav.classList.add('closed');
  nav.classList.remove('open');
  links.classList.add('hidden');
  button.setAttribute('aria-expanded', false);
}

function openNav() {
  const links = document.querySelector('.nav-list');
  const nav = document.querySelector('nav');
  const button = document.querySelector('button');

  nav.classList.add('open');
  nav.classList.remove('closed');
  links.classList.remove('hidden');
  button.setAttribute('aria-expanded', true);
}

function onNavToggle() {
  const links = document.querySelector('.nav-list');
  const nav = document.querySelector('nav');

  if (nav.classList.contains('open')) {
    closeNav();
  } else {
    openNav();
    links.firstElementChild.firstElementChild.focus();
  }
}

function forceCloseNav() {
  if (window.innerWidth < 1030) {
    closeNav();
  } else {
    openNav();
  }
}

function escapeNav(e) {
  if (e.keyCode === 27) {
    closeNav();
    const main = document.querySelector('#main');
    main.firstElementChild.focus();
  }
}

let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

window.onload = forceCloseNav;
window.onresize = () => debounce(forceCloseNav, 100);
window.addEventListener('keyup', e => escapeNav(e));
window.addEventListener('DOMContentLoaded', () => {
  const lastLink = document.querySelector('.nav-list').lastElementChild.firstElementChild;
  lastLink.addEventListener('blur', forceCloseNav);
});