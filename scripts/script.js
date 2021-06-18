let App = document.querySelector(".App");
let h1 = document.querySelector(".title-1");
const url = "https://climatizadores-json.vercel.app/devices.json";

async function convertJson() {
  try {
    let response = await fetch(url);
    response = await response.json();
    response = await response.airConditioning;
    h1.innerHTML += ` (${response.length})`;
    response.map((item, index) => {
      App.innerHTML += `
        <div class="card ${item.state == -1 ? "turnoff" : ""}">

          <div class="info">
            <i class="fa fa-thermometer-empty"></i>
            <p>AC${index + 1}</p>
            <i class="fa fa-exclamation-circle"></i>
          </div>

          <div class="values">
            <div class="circle">
              <p>AC</p>
            </div>
            <h3>${
              item.state == 1
                ? item.damp != null
                  ? '<i class="fas fa-temperature-low"></i>  ' +
                    item.temperature +
                    "<br>" +
                    '<i class="fas fa-tint"></i>  ' +
                    item.damp +
                    "%"
                  : '<i class="fas fa-wrench"></i>'
                : " "
            }</h3>
          </div>

          <div class="${
            item.state == 1 ? "on" : item.state == 0 ? "stand" : "off"
          }">
          
          <p> <i class="fa fa-circle"></i> ${
            item.state == 1
              ? "LIGADO"
              : item.state == 0
              ? "STAND BY"
              : "DESLIGADO"
          }</p>
          ${
            item.state == 1 || item.state == 0
              ? '<i class="fa fa-check"></i>'
              : '<i class="fa fa-exclamation-triangle"></i>'
          }
          </div>
        </div>
      `;
      return item;
    });

    //function that show air conditioner informations
    let show = document.querySelectorAll(".fa-exclamation-circle");
    let div = document.createElement("div");
    let print = document.querySelector(".print");
    div.classList.add("informations");

    show = Array.from(show);

    show.map((x, i) => {
      x.style.cursor = "help";
      let content = `
      <i class="fas fa-question-circle"></i>
        <ul>
          <li>- Climatizador: ${i + 1}</li>
          <li>- Estado: ${
            response[i].state == 1
              ? "LIGADO"
              : response[i].state == 0
              ? "STAND BY"
              : "DESLIGADO"
          }</li>
          <li>- Temperatura: ${response[i].temperature}</li>
          <li>- Umidade: ${response[i].damp}</li>
        </ul>
      `;

      x.addEventListener("mouseenter", (e) => {
        div.innerHTML = content;
        print.appendChild(div);
      });
      x.addEventListener("mouseleave", (e) => {
        print.innerHTML = "";
      });
    });

    return response;
  } catch (err) {
    h1.innerHTML = "[ERROR], We can't acess now, try later";
    console.log(err);
  }
}
convertJson();
