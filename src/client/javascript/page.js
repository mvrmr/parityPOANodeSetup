import "babel-polyfill";
import 'material-design-lite';
import '../scss/common.scss';

//IMPORT FRONTEND COMPONENTS here
import ExampleComponent from './components/ExampleComponent/ExampleComponent';

class page {
  constructor() {
    // Put your fronend javascript here
    this.playIntro();
  }

  playIntro() {
    const html = document.querySelector('html');
    const footer = document.querySelector('.r-footer');
    setTimeout(()=>html.classList.add('is-entered'), 1000);
    setTimeout(()=>footer.classList.add('r-footer--show'), 1000 * 2);
    ExampleComponent.init();
  }
}

new page();
export default page;
