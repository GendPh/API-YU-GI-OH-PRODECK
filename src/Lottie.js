gsap.registerPlugin(ScrollTrigger);

const heroSwordsLottieContainer = document.getElementById('lottie');

var heroSwordsLottie = bodymovin.loadAnimation({
  container: heroSwordsLottieContainer,
  path: './public/Lottie/swords.json',
  renderer: 'svg' / 'canvas' / 'html',
  loop: true,
  autoplay: true,
  name: "ninja",
})
heroSwordsLottie.addEventListener("complete", () => {
  heroSwordsLottie.setDirection(-1);
  heroSwordsLottie.play();
})

gsap.fromTo(heroSwordsLottieContainer, { scale: 0, opacity: 0, y: 40, x: 50 }, { scale: 1, opacity: 1, y: 0, x: 0, duration: .55 })


ScrollTrigger.create({
  trigger: heroSwordsLottieContainer,
  start: "top 40",

  markers: false,

  onEnter: () => {
    heroSwordsLottie.stop();
  },

  onLeaveBack: () => {
    heroSwordsLottie.play();
  }
})

