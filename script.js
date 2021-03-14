var body = document.querySelector('body');
var downButton = body.querySelector('button.down');
var mainTitle = body.querySelector('h1.main_title');


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(SplitText);

function scrollTop() {
    gsap.to(window, {
      duration: 2,
      scrollTo: {
        y: "#slide-0" },
  
      ease: "power2.inOut" });
  
    gsap.to('.footer__link-top-line', {
      scaleY: 1,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power4" });

let down = body.querySelector('button.downButton');
down.addEventListener("click", e => {
    e.preventDefault();
    scrollTop();
});
}