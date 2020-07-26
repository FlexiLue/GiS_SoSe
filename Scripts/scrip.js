"use strict";
var Endabgabe;
(function (Endabgabe) {
    Endabgabe.hasBehaelter = false;
    Endabgabe.maxEis = 0;
    Endabgabe.maxTopping = 0;
    Endabgabe.danke = false;
    async function init() {
        let abschicken = document.querySelector("form button");
        abschicken.addEventListener("click", Endabgabe.handleBestellung);
        await Endabgabe.getProductsJson("../products.json");
        generateProductList();
        localStorage.clear();
        // updateBestellung();
    }
    init();
    function generateProductList() {
        for (let i = 0; i < Endabgabe.products.length; i++) {
            if (Endabgabe.products[i].categorie.match("behälter")) {
                generateProduct(document.getElementById("behaelter"), i);
            }
            if (Endabgabe.products[i].categorie.match("eis")) {
                generateProduct(document.getElementById("eis"), i);
            }
            if (Endabgabe.products[i].categorie.match("topping")) {
                generateProduct(document.getElementById("topping"), i);
            }
        }
    }
    function handleBuy(_event) {
        let button = _event.target;
        let index = button.getAttribute("index");
        let topping = document.getElementById("bestellungTopping");
        let eis = document.getElementById("bestellungEis");
        let behaelter = document.getElementById("bestellungBehälter");
        if (Endabgabe.products[parseInt(index)].categorie.match("behälter") && !Endabgabe.hasBehaelter) {
            Endabgabe.hasBehaelter = true;
            saveToLocalstorage(index);
            updateBestellung(index, behaelter);
            updatePreis(index);
        }
        if (Endabgabe.products[parseInt(index)].categorie.match("eis") && Endabgabe.maxEis < 4) {
            Endabgabe.maxEis++;
            saveToLocalstorage(index);
            updateBestellung(index, eis);
            updatePreis(index);
        }
        if (Endabgabe.products[parseInt(index)].categorie.match("topping") && Endabgabe.maxTopping < 2) {
            Endabgabe.maxTopping++;
            saveToLocalstorage(index);
            updateBestellung(index, topping);
            updatePreis(index);
        }
    }
    function handleDelete(_event) {
        let button = _event.target;
        let index = button.getAttribute("index");
        let p = document.getElementById("price");
        let price = parseFloat(p.innerHTML);
        if (Endabgabe.products[parseInt(index)].categorie.match("behälter") && Endabgabe.hasBehaelter) {
            Endabgabe.hasBehaelter = false;
        }
        if (Endabgabe.products[parseInt(index)].categorie.match("eis")) {
            Endabgabe.maxEis = Endabgabe.maxEis - (1 * parseFloat(localStorage.getItem(index)));
        }
        if (Endabgabe.products[parseInt(index)].categorie.match("topping")) {
            Endabgabe.maxTopping--;
        }
        price = price - (Endabgabe.products[parseInt(index)].price * parseFloat(localStorage.getItem(index)));
        p.innerHTML = price.toString() + " €";
        localStorage.removeItem(index);
        button.parentNode?.parentNode?.removeChild(button.parentNode);
    }
    function deleteAllBestellungen() {
        let bestellungTopping = document.getElementById("bestellungTopping");
        let bestellungEis = document.getElementById("bestellungEis");
        let bestellungBehälter = document.getElementById("bestellungBehälter");
        let anzahlToppings = bestellungTopping.childNodes.length;
        let anzahlBehälter = bestellungBehälter.childNodes.length;
        let anzahlEis = bestellungEis.childNodes.length;
        for (let index = 0; index < anzahlBehälter; index++) {
            bestellungBehälter.childNodes.item(0).remove();
        }
        for (let index = 0; index < anzahlEis; index++) {
            bestellungEis.childNodes.item(0).remove();
        }
        for (let index = 0; index < anzahlToppings; index++) {
            bestellungTopping.childNodes.item(0).remove();
        }
    }
    Endabgabe.deleteAllBestellungen = deleteAllBestellungen;
    //Saves hinzugeügte Dinge zum localStorage
    function saveToLocalstorage(index) {
        if (localStorage.getItem(index) != null) {
            let anzahl = parseInt(localStorage.getItem(index));
            anzahl = anzahl + 1;
            localStorage.setItem(index, String(anzahl));
        }
        else {
            localStorage.setItem(index, "1");
        }
    }
    //updated die Bestellung
    function updateBestellung(index, container) {
        let anzahl = parseInt(localStorage.getItem(index));
        console.log(anzahl);
        if (anzahl < 2) {
            console.log("bin hier");
            container.appendChild(generateBestellungItem(parseInt(index), 1));
        }
        else {
            let h3 = document.querySelector("[heading=\"" + index + "\"]");
            h3.innerHTML = localStorage.getItem(index) + "x";
        }
    }
    //updated den Preis
    function updatePreis(index) {
        let p = document.getElementById("price");
        let price = parseFloat(p.innerHTML);
        console.log("Price before" + price);
        price = price + Endabgabe.products[parseInt(index)].price;
        console.log("Price after" + price);
        p.innerHTML = price.toString() + " €";
    }
    function generateBestellungItem(index, anzahl) {
        let div = document.createElement("div");
        let h3Times = document.createElement("h3");
        h3Times.innerHTML = anzahl + "x";
        h3Times.setAttribute("heading", index.toString());
        div.appendChild(h3Times);
        let h3Name = document.createElement("h3");
        h3Name.innerHTML = Endabgabe.products[index].name;
        div.appendChild(h3Name);
        let img = document.createElement("img");
        img.setAttribute("src", Endabgabe.products[index].image);
        div.appendChild(img);
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("index", index.toString());
        button.innerHTML = "Löschen";
        button.addEventListener("click", handleDelete);
        div.appendChild(button);
        return div;
    }
    function generateProduct(container, productIndex) {
        let productcontainer = document.createElement("div");
        productcontainer.className = "productcontainer";
        container?.appendChild(productcontainer);
        let h2 = document.createElement("h2");
        h2.innerHTML = Endabgabe.products[productIndex].name;
        productcontainer.appendChild(h2);
        let img = document.createElement("img");
        img.setAttribute("src", Endabgabe.products[productIndex].image);
        productcontainer.appendChild(img);
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("index", productIndex.toString());
        button.innerHTML = "Hinzufügen";
        button.addEventListener("click", handleBuy);
        productcontainer.appendChild(button);
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=scrip.js.map