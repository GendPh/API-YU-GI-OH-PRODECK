const hamburger = document.querySelector("button.hamburger");
const navBar = document.getElementById("primary-navBar");
const navLogo = navBar.querySelector(".logo")
const navBarList = document.getElementById("primary-navBar-ul");
const navBarLinks = navBarList.querySelectorAll("li");

hamburger.addEventListener("click", () => {

  let gsapDuration = 0.8;

  if (hamburger.classList.contains("is-active")) {
    hamburger.classList.remove("is-active")

    gsap.to(
      navBarList,
      { x: "100%", duration: gsapDuration })

    gsap.set(
      "body",
      { overflow: "auto" })

  } else {
    hamburger.classList.add("is-active");

    gsap.to(
      navBarList,
      { x: 0, duration: gsapDuration });

    gsap.fromTo(
      navBarLinks,
      { opacity: 0, y: "-20%" },
      { opacity: 1, y: 0, delay: 0.3, stagger: 0.45 });

    gsap.set("body", { overflow: "hidden" })
  }
})

ScrollTrigger.create({
  trigger: navBar,
  start: "+=450",
  end: "start bottom",
  markers: false,

  onEnter: () => {
    gsap.fromTo(navBar, { position: "fixed", top: 0, left: 0, right: 0, opacity: 0 }, { opacity: 1, delay: 0.25, background: "#031a21", duration: 0.5 });
    gsap.to(navLogo, { rotate: 360 })
  },
  onLeaveBack: () => {
    gsap.fromTo(navBar, { position: "static" }, { opacity: 1, background: "transparent", duration: 0.5, delay: 0.2 });
    gsap.to(navLogo, { rotate: 0 })
  }
})



gsap.fromTo(navLogo, { scale: 0 }, { scale: 1, duration: .85 }) 