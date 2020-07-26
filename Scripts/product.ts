

namespace Endabgabe {

export let products: Product[] = [];


export interface Product {
    index: number;
    name: string;
    categorie: string;
    image: string; 
    price: number;
}

export async function getProductsJson(_url: RequestInfo): Promise<void> {
    let response: Response = await fetch(_url);
    products = await response.json();
    console.log("JSON geladen");
}

}