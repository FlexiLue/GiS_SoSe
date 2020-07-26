


namespace Endabgabe {
    export let hasBehaelter: boolean = false;
    export let maxEis: number = 0;
    export let maxTopping: number = 0;
    export let danke: boolean = false;


    async function init(): Promise<void> {

        let abschicken: HTMLButtonElement = <HTMLButtonElement> document.querySelector("form button");
        abschicken.addEventListener("click", handleBestellung);

        await getProductsJson("../products.json");
        generateProductList();
        localStorage.clear();

        // updateBestellung();
    }

    init();

    function generateProductList(): void {
        for (let i: number = 0; i < products.length; i++) {
            if (products[i].categorie.match("behälter")) {
                generateProduct(<HTMLDivElement>document.getElementById("behaelter"), i);
            }
            if (products[i].categorie.match("eis")) {
                generateProduct(<HTMLDivElement>document.getElementById("eis"), i);
            }
            if (products[i].categorie.match("topping")) {
                generateProduct(<HTMLDivElement>document.getElementById("topping"), i);
            }

        }
    }


    function handleBuy(_event: Event): void {
        let button: HTMLButtonElement = <HTMLButtonElement>_event.target;
        let index: string = <string>button.getAttribute("index");

        let topping: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellungTopping");
        let eis: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellungEis");
        let behaelter: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellungBehälter");

              
        if (products[parseInt(index)].categorie.match("behälter") && !hasBehaelter) {
            hasBehaelter = true;
            saveToLocalstorage(index);
            updateBestellung(index, behaelter);
            updatePreis(index);
        }
        if (products[parseInt(index)].categorie.match("eis") && maxEis < 4) {
            maxEis++;
            saveToLocalstorage(index);
            updateBestellung(index, eis);
            updatePreis(index);
        }
        if (products[parseInt(index)].categorie.match("topping") && maxTopping < 2) {
            maxTopping++;
            saveToLocalstorage(index);
            updateBestellung(index, topping);
            updatePreis(index);
        }
    }
    
    function handleDelete(_event: Event): void {
        let button: HTMLButtonElement = <HTMLButtonElement>_event.target;
        let index: string = <string>button.getAttribute("index");

        let p: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("price");
        let price: number = parseFloat(p.innerHTML);

        if (products[parseInt(index)].categorie.match("behälter") && hasBehaelter) {
            hasBehaelter = false;
        }
        if (products[parseInt(index)].categorie.match("eis")) {
            maxEis = maxEis - (1 * parseFloat(<string>localStorage.getItem(index)));
        }
        if (products[parseInt(index)].categorie.match("topping")) {
            maxTopping--;
        }

        price = price - (products[parseInt(index)].price * parseFloat(<string>localStorage.getItem(index)));
        p.innerHTML = price.toString() + " €";
        localStorage.removeItem(index);

        button.parentNode?.parentNode?.removeChild(button.parentNode);

    }

    export function deleteAllBestellungen(): void {
        let bestellungTopping: HTMLDivElement = <HTMLDivElement> document.getElementById("bestellungTopping");
        let bestellungEis: HTMLDivElement = <HTMLDivElement> document.getElementById("bestellungEis");
        let bestellungBehälter: HTMLDivElement = <HTMLDivElement> document.getElementById("bestellungBehälter");
        
        let anzahlToppings: number = bestellungTopping.childNodes.length;
        let anzahlBehälter: number = bestellungBehälter.childNodes.length;
        let anzahlEis: number = bestellungEis.childNodes.length;
        
        for (let index: number = 0; index < anzahlBehälter; index++) {
            bestellungBehälter.childNodes.item(0).remove();
        }
        for (let index: number = 0; index < anzahlEis; index++) {
            bestellungEis.childNodes.item(0).remove();
        }
        for (let index: number = 0; index < anzahlToppings; index++) {
            bestellungTopping.childNodes.item(0).remove();
        }


    }

    //Saves hinzugeügte Dinge zum localStorage
    function saveToLocalstorage(index: string): void {
        if (localStorage.getItem(index) != null) {
            let anzahl: number = parseInt(<string>localStorage.getItem(index));
            anzahl = anzahl + 1;
            localStorage.setItem(index, String(anzahl));
        } else {
            localStorage.setItem(index, "1");
        }
    }

    //updated die Bestellung
    function updateBestellung(index: string, container: HTMLDivElement): void {

        let anzahl: number = parseInt(<string>localStorage.getItem(index));
        console.log(anzahl);
        if (anzahl < 2) {
            console.log("bin hier");
            container.appendChild(generateBestellungItem(parseInt(index), 1));
        } else {
            let h3: HTMLHeadingElement = <HTMLHeadingElement> document.querySelector("[heading=\"" + index + "\"]");
            h3.innerHTML = localStorage.getItem(index) + "x";
        }
    }

    //updated den Preis
    function updatePreis(index: string): void {
        let p: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("price");
        let price: number = parseFloat(p.innerHTML);
        console.log("Price before" + price);

        price = price + products[parseInt(index)].price;
        console.log("Price after" + price);

        p.innerHTML = price.toString() + " €";
    }


    function generateBestellungItem(index: number, anzahl: Number): HTMLElement {
        let div: HTMLDivElement = document.createElement("div");
        
        let h3Times: HTMLHeadingElement = document.createElement("h3");
        h3Times.innerHTML = anzahl + "x";
        h3Times.setAttribute("heading", index.toString());
        div.appendChild(h3Times);

        let h3Name: HTMLHeadingElement = document.createElement("h3");
        h3Name.innerHTML = products[index].name;
        div.appendChild(h3Name);

        let img: HTMLImageElement = document.createElement("img");
        img.setAttribute("src", products[index].image);
        div.appendChild(img);

        let button: HTMLButtonElement = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("index" , index.toString());
        button.innerHTML = "Löschen";
        button.addEventListener("click", handleDelete);
        div.appendChild(button);

        return div;
    }

    function generateProduct(container: HTMLDivElement, productIndex: number): void {
        let productcontainer: HTMLElement = document.createElement("div");
        productcontainer.className = "productcontainer";
        container?.appendChild(productcontainer);

        let h2: HTMLHeadingElement = document.createElement("h2");
        h2.innerHTML = products[productIndex].name;
        productcontainer.appendChild(h2);

        let img: HTMLImageElement = document.createElement("img");
        img.setAttribute("src", products[productIndex].image);
        productcontainer.appendChild(img);

        let button: HTMLButtonElement = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("index" , productIndex.toString());
        button.innerHTML = "Hinzufügen";
        button.addEventListener("click", handleBuy);
        productcontainer.appendChild(button);

    }
}