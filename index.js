// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='type-writer-effect'>
  <h2 class='title'>Type Writer Effect</h2>
  <h3>
    John Doe The
    <span data-target data-wait='2000' data-words='["Developer", "Designer", "Creator"]'></span>
  </h3>
</div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor(targetElement, words, wait = 3000) {
    this.targetElement = document.querySelector(`${targetElement}`);
    this.words = JSON.parse(this.targetElement.getAttribute(words));
    this.wait = parseInt(this.targetElement.getAttribute(wait), 10);
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;

    this.typing();
  }

  /**
   * @function typing - Type text
   */
  typing = () => {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    this.txt = fullTxt.substring(0, this.isDeleting ? this.txt.length - 1 : this.txt.length + 1);

    this.targetElement.innerHTML = `<span class='txt'>${this.txt}</span>`;
    let typeSpeed = 300;

    if (this.isDeleting) typeSpeed /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.typing(), typeSpeed);
  };
}

// ⚡️Class instance
new App('[data-target]', 'data-words', 'data-wait');
