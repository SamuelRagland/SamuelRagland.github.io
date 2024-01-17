const open = document.getElementById('open-nav');
let test = true;

open.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('active');
    test = !test;
    test ? open.textContent = '=' : open.textContent = 'x';
  console.log('clicked');
  console.log(host.shadowRoot);
  console.log(sheet);
});

const host = document.querySelector( 'spline-viewer' );

const sheet = new CSSStyleSheet;
host.shadowRoot.lastChild.style.display = 'flex';
host.shadowRoot.lastChild.style.flexDirection = 'column';
host.shadowRoot.lastChild.style.justifyContent = 'center';
host.shadowRoot.lastChild.querySelector('canvas').style.margin = 'auto';
host.shadowRoot.lastChild.querySelector('a').style.opacity = '0';