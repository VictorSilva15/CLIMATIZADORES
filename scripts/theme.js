function changeTheme() {
  let button = document.querySelector(".theme button");
  let page = document.body;
  let card = document.querySelectorAll(".card");
  let print = document.querySelector(".print");
  card = Array.from(card);
  card.map((x) => {
    x.classList.toggle("dark-card");
  });
  page.classList.toggle("dark");
  print.classList.toggle("dark");
  if (page.classList.value == "dark") {
    button.innerHTML = `<i class="far fa-moon"></i>`;
  } else {
    button.innerHTML = `<i class="fas fa-sun"></i>`;
  }
}
