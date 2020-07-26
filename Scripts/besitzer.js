"use strict";
var Endabgabe;
(function (Endabgabe) {
    async function init() {
        let response = await fetch("http://localhost:8100/getBestellungen");
        let responseText = await response.text();
        await Endabgabe.getProductsJson("../products.json");
        let bestellungen = JSON.parse(responseText);
        console.log(bestellungen);
        await Endabgabe.getProductsJson("../products.json");
        aktualiseren();
    }
    init();
    let button = document.getElementById("aktualisieren");
    button.addEventListener("click", aktualiseren);
    async function aktualiseren() {
        let response = await fetch("http://localhost:8100/getBestellungen");
        let responseText = await response.text();
        let bestellungen = JSON.parse(responseText);
        let div = document.getElementById("bestellungen");
        if (div.hasChildNodes()) {
            deleteAllElements();
        }
        for (let index = 0; index < bestellungen.length; index++) {
            div.appendChild(generateBestellung(bestellungen[index]));
        }
    }
    function deleteAllElements() {
        let div = document.getElementById("bestellungen");
        console.log(div.childNodes.length);
        while (div.hasChildNodes()) {
            div.childNodes.item(0).remove();
        }
    }
    async function deleteOneItem(_event) {
        let button = _event.target;
        console.log(button);
        let id = button.parentElement?.getAttribute("produktID");
        let url = "http://localhost:8100/delete?id=" + id;
        await fetch(url);
        button.parentElement?.parentElement?.remove();
    }
    function generateBestellung(bestellung) {
        let div = document.createElement("div");
        div.className = "bestellungContainer";
        let bestellungHeaderDiv = document.createElement("div");
        bestellungHeaderDiv.className = "bestellungHeader";
        div.appendChild(bestellungHeaderDiv);
        let bestellungHeaderH2 = document.createElement("h2");
        bestellungHeaderH2.innerHTML = "Bestellung";
        bestellungHeaderDiv.appendChild(bestellungHeaderH2);
        let bestellungItemContainer = document.createElement("div");
        bestellungItemContainer.className = "bestellungItemContainer";
        div.appendChild(bestellungItemContainer);
        if (bestellung[0] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(0, bestellung[0]));
        }
        if (bestellung[1] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(1, bestellung[1]));
        }
        if (bestellung[2] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(2, bestellung[2]));
            ;
        }
        if (bestellung[3] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(3, bestellung[3]));
        }
        if (bestellung[4] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(4, bestellung[4]));
        }
        if (bestellung[5] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(5, bestellung[5]));
        }
        if (bestellung[6] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(6, bestellung[6]));
        }
        let bestellungsAdresse = document.createElement("div");
        bestellungsAdresse.className = "bestellungsAdresse";
        bestellungItemContainer.appendChild(bestellungsAdresse);
        if (bestellung.name != undefined) {
            let name = document.createElement("p");
            name.innerHTML = "Name: " + bestellung.name;
            bestellungsAdresse.appendChild(name);
        }
        if (bestellung.straße != undefined) {
            let straße = document.createElement("p");
            straße.innerHTML = "Straße: " + bestellung.straße;
            bestellungsAdresse.appendChild(straße);
        }
        let stadt = document.createElement("p");
        stadt.innerHTML = "Stadt: " + bestellung.stadt;
        bestellungsAdresse.appendChild(stadt);
        // let status: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        // status.innerHTML = <string>bestellung.stadt;
        // bestellungsAdresse.appendChild(name);
        let bestellungGeliefert = document.createElement("div");
        bestellungGeliefert.className = "bestellungButton";
        div.appendChild(bestellungGeliefert);
        let button = document.createElement("button");
        button.type = "submit";
        button.setAttribute("produktID", bestellung._id);
        div.appendChild(button);
        button.addEventListener("click", deleteOneItem);
        let span = document.createElement("span");
        span.innerHTML = "Geliefert";
        button.appendChild(span);
        let button2 = document.createElement("button");
        button.type = "submit";
        button2.setAttribute("produktID", bestellung._id);
        div.appendChild(button2);
        let span2 = document.createElement("span");
        span2.innerHTML = "Edit";
        button2.appendChild(span2);
        return div;
    }
    function generateBestellungItem(index, anzahl) {
        let div = document.createElement("div");
        div.className = "bestellungItem";
        let h2 = document.createElement("h2");
        h2.innerHTML = anzahl + "x " + Endabgabe.products[index].name;
        div.appendChild(h2);
        let img = document.createElement("img");
        img.src = Endabgabe.products[index].image;
        div.appendChild(img);
        return div;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=besitzer.js.map