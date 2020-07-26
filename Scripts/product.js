"use strict";
var Endabgabe;
(function (Endabgabe) {
    Endabgabe.products = [];
    async function getProductsJson(_url) {
        let response = await fetch(_url);
        Endabgabe.products = await response.json();
        console.log("JSON geladen");
    }
    Endabgabe.getProductsJson = getProductsJson;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=product.js.map