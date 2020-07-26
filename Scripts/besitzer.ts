


namespace Endabgabe {
    export interface Bestellung {
        _id?: string;
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        name?: string;
        straße?: string; 
        stadt?: string;
    }


    async function init(): Promise<void> {
        let response: Response = await fetch("http://localhost:8100/getBestellungen");
        let responseText: string = await response.text();
        await getProductsJson("https://flexilue.github.io/GiS_SoSe/products.json");

        let bestellungen: Bestellung[] = JSON.parse(responseText);
        console.log(bestellungen);
        await getProductsJson("https://flexilue.github.io/GiS_SoSe/products.json");
        aktualiseren();
    }

    init();

    let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("aktualisieren");
    button.addEventListener("click", aktualiseren);

    async function aktualiseren(): Promise<void> {
        let response: Response = await fetch("http://localhost:8100/getBestellungen");
        let responseText: string = await response.text();

        let bestellungen: Bestellung[] = JSON.parse(responseText);

        let div: HTMLDivElement = <HTMLDivElement> document.getElementById("bestellungen");

        if (div.hasChildNodes()) {
            deleteAllElements();
        }

        for (let index: number = 0; index < bestellungen.length; index++) {
            div.appendChild(generateBestellung(bestellungen[index]));
        }
    }

    function deleteAllElements(): void {
        let div: HTMLDivElement = <HTMLDivElement> document.getElementById("bestellungen");
        console.log(div.childNodes.length);

        while (div.hasChildNodes()) {
            div.childNodes.item(0).remove();
        }
    }

    async function deleteOneItem(_event: Event): Promise<void> {
        let button: HTMLButtonElement = <HTMLButtonElement> _event.target;
        console.log(button);
        let id: string = <string> button.parentElement?.getAttribute("produktID");

        let url: string = "http://localhost:8100/delete?id=" + id;

        await fetch(url);

        button.parentElement?.parentElement?.remove();
    }

    function generateBestellung(bestellung: Bestellung): HTMLElement {

        let div: HTMLDivElement = <HTMLDivElement> document.createElement("div");
        div.className = "bestellungContainer";

        let bestellungHeaderDiv: HTMLDivElement = <HTMLDivElement> document.createElement("div");
        bestellungHeaderDiv.className = "bestellungHeader";
        div.appendChild(bestellungHeaderDiv);

        let bestellungHeaderH2: HTMLHeadingElement = <HTMLHeadingElement> document.createElement("h2");
        bestellungHeaderH2.innerHTML = "Bestellung";
        bestellungHeaderDiv.appendChild(bestellungHeaderH2);

        let bestellungItemContainer: HTMLDivElement = <HTMLDivElement> document.createElement("div");
        bestellungItemContainer.className = "bestellungItemContainer";
        div.appendChild(bestellungItemContainer);

        if (bestellung[0] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(0, <number> bestellung[0]));
        }
        if (bestellung[1] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(1, <number> bestellung[1]));
        }
        if (bestellung[2] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(2, <number> bestellung[2]));           ;
        }
        if (bestellung[3] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(3, <number> bestellung[3]));
        }
        if (bestellung[4] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(4, <number> bestellung[4]));
        }
        if (bestellung[5] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(5, <number> bestellung[5]));
        }
        if (bestellung[6] != -1) {
            bestellungItemContainer.appendChild(generateBestellungItem(6, <number> bestellung[6]));
        }

        let bestellungsAdresse: HTMLDivElement = <HTMLDivElement> document.createElement("div");
        bestellungsAdresse.className = "bestellungsAdresse";
        bestellungItemContainer.appendChild(bestellungsAdresse);

        if (bestellung.name != undefined) {
            let name: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
            name.innerHTML = "Name: " + <string>bestellung.name;
            bestellungsAdresse.appendChild(name);
        }

        if (bestellung.straße != undefined) {
            let straße: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
            straße.innerHTML = "Straße: " + <string>bestellung.straße;
            bestellungsAdresse.appendChild(straße);
        }
        
    
        let stadt: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        stadt.innerHTML = "Stadt: " +  <string>bestellung.stadt;
        bestellungsAdresse.appendChild(stadt);

        // let status: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        // status.innerHTML = <string>bestellung.stadt;
        // bestellungsAdresse.appendChild(name);


        let bestellungGeliefert: HTMLDivElement = <HTMLDivElement> document.createElement("div");
        bestellungGeliefert.className = "bestellungButton";
        div.appendChild(bestellungGeliefert);

        let button: HTMLButtonElement = <HTMLButtonElement> document.createElement("button");
        button.type = "submit";
        button.setAttribute("produktID", <string> bestellung._id);
        div.appendChild(button);
        button.addEventListener("click", deleteOneItem);

        let span: HTMLSpanElement = <HTMLSpanElement> document.createElement("span");
        span.innerHTML = "Geliefert";
        button.appendChild(span);

        let button2: HTMLButtonElement = <HTMLButtonElement> document.createElement("button");
        button.type = "submit";
        button2.setAttribute("produktID", <string> bestellung._id);
        div.appendChild(button2);

        let span2: HTMLSpanElement = <HTMLSpanElement> document.createElement("span");
        span2.innerHTML = "Edit";
        button2.appendChild(span2);

        return div;
        
    }

    function generateBestellungItem(index: number, anzahl: number): HTMLElement {
        let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        div.className = "bestellungItem";

        let h2: HTMLHeadingElement = <HTMLHeadingElement> document.createElement("h2");
        h2.innerHTML = anzahl + "x " + products[index].name;
        div.appendChild(h2);

        let img: HTMLImageElement = <HTMLImageElement> document.createElement("img");
        img.src = products[index].image;
        div.appendChild(img);

        return div;
    }
}