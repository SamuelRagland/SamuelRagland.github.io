const open = document.getElementById('open-nav');
let test = true;

open.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('active');
    test = !test;
    test ? open.textContent = '=' : open.textContent = 'x';
  console.log('clicked');
});

console.log('open');