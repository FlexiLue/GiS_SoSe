namespace Endabgabe {

    export async function handleBestellung(): Promise<void> {
        let url: string = "http://localhost:8100/createBestellung?";
        url = url + bestellungToString(erstelleBestellung());

        console.log(url);

        let formDaten: FormData = new FormData(document.forms[0]);
        let besteller: URLSearchParams = new URLSearchParams(<any>formDaten);

        url = url + besteller.toString();
        
        await fetch(url);

        if (!danke) {
            let sidebar: HTMLDivElement = <HTMLDivElement> document.getElementById("sidebar");
            let dankeschoen: HTMLParagraphElement = <HTMLParagraphElement> document.createElement("p");
            dankeschoen.innerHTML = "Danke für ihre Bestellung";
            sidebar.appendChild(dankeschoen);
            danke = true;
        }

        deleteAllBestellungen();
        localStorage.clear();

        maxEis = 0;
        maxTopping = 0;
        hasBehaelter = false;

        let form: HTMLFormElement = <HTMLFormElement> document.querySelector("form");
        form.reset();


        let p: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("price");
        p.innerHTML = "0,00 €";
        
    }

    function bestellungToString(bestellung: Bestellung): string {
        let bestellungsString: string = "";

        bestellungsString = "0=" + bestellung[0] + "&" + "1=" + bestellung[1] + "&" + "2=" + bestellung[2]  + "&" + "3=" + bestellung[3] + "&" + "4=" + bestellung[4]  + "&" + "5=" + bestellung[5] + "&" + "6=" + bestellung[6] + "&";
        
        return bestellungsString;
    }

    function erstelleBestellung(): Bestellung {
        let bestellung: Bestellung = {
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

        for (let i: number = 0; i < localStorage.length; i++) {
            let key: string = <string>localStorage.key(i);
            if (!key?.match("randid")) {
                let value: string = <string>localStorage.getItem(key);
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


}