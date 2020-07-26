"use strict";
var Endabgabe;
(function (Endabgabe) {
    async function handleBestellung() {
        let url = "http://localhost:8100/createBestellung?";
        url = url + bestellungToString(erstelleBestellung());
        console.log(url);
        let formDaten = new FormData(document.forms[0]);
        let besteller = new URLSearchParams(formDaten);
        url = url + besteller.toString();
        await fetch(url);
        if (!Endabgabe.danke) {
            let sidebar = document.getElementById("sidebar");
            let dankeschoen = document.createElement("p");
            dankeschoen.innerHTML = "Danke für ihre Bestellung";
            sidebar.appendChild(dankeschoen);
            Endabgabe.danke = true;
        }
        Endabgabe.deleteAllBestellungen();
        localStorage.clear();
        Endabgabe.maxEis = 0;
        Endabgabe.maxTopping = 0;
        Endabgabe.hasBehaelter = false;
        let form = document.querySelector("form");
        form.reset();
        let p = document.getElementById("price");
        p.innerHTML = "0,00 €";
    }
    Endabgabe.handleBestellung = handleBestellung;
    function bestellungToString(bestellung) {
        let bestellungsString = "";
        bestellungsString = "0=" + bestellung[0] + "&" + "1=" + bestellung[1] + "&" + "2=" + bestellung[2] + "&" + "3=" + bestellung[3] + "&" + "4=" + bestellung[4] + "&" + "5=" + bestellung[5] + "&" + "6=" + bestellung[6] + "&";
        return bestellungsString;
    }
    function erstelleBestellung() {
        let bestellung = {
            0: -1,
            1: -1,
            2: -1,
            3: -1,
            4: -1,
            5: -1,
            6: -1,
            name: "nicht angegeben",
            straße: "nicht angegeben",
            stadt: "nicht angegeben"
        };
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (!key?.match("randid")) {
                let value = localStorage.getItem(key);
                console.log("Key: " + key + " Value: " + value);
                if (key.match("0")) {
                    bestellung[0] = parseInt(value);
                }
                if (key.match("1")) {
                    bestellung[1] = parseInt(value);
                }
                if (key.match("2")) {
                    bestellung[2] = parseInt(value);
                }
                if (key.match("3")) {
                    bestellung[3] = parseInt(value);
                }
                if (key.match("4")) {
                    bestellung[4] = parseInt(value);
                }
                if (key.match("5")) {
                    bestellung[5] = parseInt(value);
                }
                if (key.match("6")) {
                    bestellung[6] = parseInt(value);
                }
            }
        }
        return bestellung;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=bestellung.js.map