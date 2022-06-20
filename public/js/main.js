const MIN_WIDTH = 1030;

function closeNav() {
  const nav = document.querySelector('nav');
  const links = document.querySelector('.nav-list');
  const button = document.querySelector('button');

  nav.classList.add('closed');
  nav.classList.remove('open');
  links.classList.add('hidden');
  button.setAttribute('aria-expanded', false);
}

function openNav() {
  const nav = document.querySelector('nav');
  const links = document.querySelector('.nav-list');
  const button = document.querySelector('button');

  nav.classList.add('open');
  nav.classList.remove('closed');
  links.classList.remove('hidden');
  button.setAttribute('aria-expanded', true);
}

function onNavToggle() {
    const nav = document.querySelector('nav');

  if (nav.classList.contains('open')) {
    closeNav();
  } else {
    openNav();
    const firstLi = document.querySelector('.nav-list').firstElementChild;
    firstLi.focus();
  }
}

function forceCloseNav() {
  if (window.innerWidth < MIN_WIDTH) {
    closeNav();
  } else {
    openNav();
  }
}

function handleKeyEvents(e) {
  const focused = document.activeElement;
  const nav = document.querySelector('nav');

  // escape on nav in mobile view
  if (e.keyCode === 27 && nav.classList.contains('open') && window.innerWidth < MIN_WIDTH) {
    closeNav();
    const button = document.querySelector('button');
    button.focus();
  }

  // arrow down on burger button
  else if (e.keyCode === 40 && focused?.getAttribute('aria-controls') === 'nav') {
    openNav();
    const firstLink = document.querySelector('.nav-list').firstElementChild.firstElementChild;
    firstLink.focus();
  }

  // arrow down on nav
  else if (e.keyCode === 40 && focused?.parentElement?.getAttribute('role') === 'menuitem') {
    const nextLink = focused?.parentElement?.nextElementSibling?.firstElementChild;
    if (nextLink) nextLink.focus();
    else {
      const firstLink = document.querySelector('.nav-list').firstElementChild.firstElementChild;
      firstLink.focus();
    }
  }

  // arrow up on burger button
  else if (e.keyCode === 38 && focused?.getAttribute('aria-controls') === 'nav') {
    openNav();
    const lastLink = document.querySelector('.nav-list').lastElementChild.firstElementChild;
    lastLink.focus();
  }

  // arrow up on nav
  else if (e.keyCode === 38 && focused?.parentElement?.getAttribute('role') === 'menuitem') {
    const prevLink = focused?.parentElement?.previousElementSibling?.firstElementChild;
    if (prevLink) prevLink.focus();
    else {
      const lastLink = document.querySelector('.nav-list').lastElementChild.firstElementChild;
      lastLink.focus();
    }
  }
}

function handleLostFocus(e) {
  // focus went outside nav in mobile view
  if (e.relatedTarget?.parentElement?.parentElement?.className !== 'nav-list' && window.innerWidth < MIN_WIDTH) {
    forceCloseNav();
  }
}

let debounceTimer;
const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

window.onload = forceCloseNav;
window.onresize = () => debounce(forceCloseNav, 100);
window.addEventListener('keyup', e => handleKeyEvents(e));
window.addEventListener('DOMContentLoaded', () => {
  const lastLink = document.querySelector('.nav-list').lastElementChild.firstElementChild;
  lastLink.addEventListener('focusout', handleLostFocus);
});