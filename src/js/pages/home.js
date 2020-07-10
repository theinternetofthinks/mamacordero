/**
* HOME Page
* @type {Module pattern}
* @include:
validation();
*/

var Home = (function () {
   
   var breakpoint = Utils.deviceBreakpoints;
   
   var init = function () {
      toogleNav();
      
   };
   
   var toogleNav =function(){
      $('.open-navigation').click(function(e){
         $('body').toggleClass('open')
      });
   }
   
   $('nav a').click(function(e){
      e.preventDefault();
      var scrollToID= $(this).attr('data-target')
      console.log(scrollToID);

      moveToOffset = $(scrollToID).offset().top;     
      $("html, body").animate({
         scrollTop: moveToOffset,
         useTranslate3d: true
      }, 900);
      $('body').removeClass('open')
   })
   
   
   // Public API
   return {
      init: init
   };
   
})();

