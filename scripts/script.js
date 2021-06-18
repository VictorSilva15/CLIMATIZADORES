let appAir = document.querySelector(".AppAir");
let appSen = document.querySelector(".AppSen");
let title1 = document.querySelector(".title-1");
let title2 = document.querySelector(".title-2");
const url = "https://climatizadores-json.vercel.app/devices.json";

async function convertJson() {
  try {
    let response = await fetch(url);
    response = await response.json();
    let responseAir = await response.airConditioning;
    let responseSensor = await response.sensorsTH;

    title1.innerHTML += ` (${responseAir.length})`;

    //bulding the air conditioning cards
    responseAir.map((item, index) => {
      appAir.innerHTML += `
        <div class="card ${item.state == -1 ? "turnoff" : ""}">

          <div class="info">
            <i class="fa fa-thermometer-empty"></i>
            <p>AC${index + 1}</p>
            <i class="fa fa-exclamation-circle iconShow"></i>
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
            item.state == 1
              ? item.temperature == null
                ? '<i class="fa fa-exclamation-triangle"></i>'
                : '<i class="fa fa-check"></i>'
              : item.state == 0
              ? '<i class="fa fa-check"></i>'
              : '<i class="fa fa-exclamation-triangle"></i>'
          }
          </div>
        </div>
      `;
      return item;
    });

    title2.innerHTML += ` (${responseSensor.length * 2})`;
    //building sensors cards
    responseSensor.map((item, index) => {
      appSen.innerHTML += `
      <div class="card ${item.stateCold == -1 ? "turnoff" : ""}">

        <div class="info">
          <i class="fa fa-thermometer-empty"></i>
          <p>COR.FRIO ${index + 1}</p>
          <i class="fa fa-exclamation-circle"></i>
        </div>

        <div class="values">
          <div class="circle">
            <p>TH</p>
          </div>
        </div>

        <div class="${item.stateCold == 1 ? "on" : "off"}">
      
        <p> <i class="fa fa-circle"></i> ${
          item.stateCold == 1 ? "LIGADO" : "DESLIGADO"
        }</p>
        ${
          item.stateCold == 1
            ? '<i class="fa fa-check"></i>'
            : '<i class="fa fa-exclamation-triangle"></i>'
        }
        </div>
      </div>

      <div class="card ${item.stateHot == -1 ? "turnoff" : ""}">

        <div class="info">
          <i class="fa fa-thermometer-empty"></i>
          <p>COR.QUENTE ${index + 1}</p>
          <i class="fa fa-exclamation-circle"></i>
        </div>

        <div class="values">
          <div class="circle">
            <p>TH</p>
          </div>
        </div>

        <div class="${item.stateHot == 1 ? "on" : "off"}">
      
        <p> <i class="fa fa-circle"></i> ${
          item.stateHot == 1 ? "LIGADO" : "DESLIGADO"
        }</p>
        ${
          item.stateHot == 1
            ? '<i class="fa fa-check"></i>'
            : '<i class="fa fa-exclamation-triangle"></i>'
        }
        </div>
      </div>
      `;
      return item;
    });

    //function that show air conditioner informations
    let show = document.querySelectorAll(".iconShow");
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
            responseAir[i].state == 1
              ? "LIGADO"
              : responseAir[i].state == 0
              ? "STAND BY"
              : "DESLIGADO"
          }</li>
          <li>- Temperatura: ${responseAir[i].temperature}</li>
          <li>- Umidade: ${responseAir[i].damp}</li>
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
    alert("[ERROR], We can't acess now, try later");
    throw Error("[ERROR], We can't acess now, try later");
  }
}
convertJson();
