import './ExampleComponent.scss';
import $ from 'jquery';
//import CONST from '../../../../CONSTANTS';
const ExampleComponent = (()=>{
  const doSomething = () => {
    // This is a fronend component example , put your code here
  };
  const sayHello = () => {

    //alert(`hi there! I'm ${CONST.MYNAME}!`);
  };
  const init = () => {
    $(document).ready(function () {
      const $inputField = $(".bp-input");
      //debugger;
      $(".bp-submit").on("click", function() {
        var val = $inputField.val();
        //console.log(val);
        //console.log($(".bp-input"));
        if (val != "") {
          alert("Hello " + val + "!");
        }
      });
    });
  };
  return {
    doSomething,
    sayHello,
    init
  };
})();

export default ExampleComponent;
