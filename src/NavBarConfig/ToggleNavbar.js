const navbar_button_open = document.querySelector("#button-navbar-open");
const navbar_button_close = document.querySelector("#button-navbar-close");
const navbar_el = document.querySelector("#main-navbar");
const navbar_links = document.querySelectorAll("#main-navbar ul a");

navbar_button_open.addEventListener("click", () => {
  navbar_el.classList.add("is-open");
  document.querySelector("body").classList.add("overflow-hidden", "pointer-events-none");
})
navbar_button_close.addEventListener("click", () => {
  navbar_el.classList.remove("is-open");
  document.querySelector("body").classList.remove("overflow-hidden", "pointer-events-none");
})


navbar_links.forEach(link => {
  link.addEventListener("click", () => {
    navbar_links.forEach(all_links => {
      all_links.classList.remove("selected");
    });
    link.classList.add("selected");
    document.querySelector("body").classList.remove("overflow-hidden", "pointer-events-none");
    navbar_el.classList.remove("is-open");
  })
});