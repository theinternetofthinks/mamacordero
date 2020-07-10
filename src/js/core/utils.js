/**
* UTILS
* @type {Module pattern}
* @include:

*/

var Utils = (function () {
   
   var deviceBreakpoints = {
      sm: 576, //portrait and phones
      md: 768, //landscape
      lg: 992, //desktop
      xlg: 1200 //large desktop
   }
   
   
   var core = function () {
      
   };
   

   // Public API
   return {
      core: core
      
   };
   
})();

$(function () {
   
   Utils.core();
   
});

