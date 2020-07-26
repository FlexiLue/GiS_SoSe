"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let databaseUrl = "mongodb+srv://Flexi:passwort2@cluster0.qh8rt.mongodb.net/GiS_SoSe_2020?retryWrites=true&w=majority";
    let port = Number(process.env.Port);
    let bestellungen;
    if (!port) {
        port = 8100;
    }
    serverInit(port);
    connectToDatabase(databaseUrl);
    function serverInit(_port) {
        let server = HTTP.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", function () {
            console.log("listening");
        });
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        let mongoClient = new Mongo.MongoClient(_url, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoClient.connect();
        bestellungen = mongoClient.db("Eisshop").collection("bestellungen");
        if (bestellungen != null) {
            console.log("Successfully connected to Database and found Collection Bestellungen");
        }
    }
    async function handleRequest(req, res) {
        res.setHeader("content-type", "text/html; charset=utf-8");
        res.setHeader("Access-Control-Allow-Origin", "*");
        if (req.url) {
            let url = Url.parse(req.url, true);
            if (url.pathname?.match("/createBestellung")) {
                bestellungen.insertOne(url.query);
            }
            if (url.pathname == "/getBestellungen") {
                let dbInhalt = bestellungen.find();
                let dbInhaltArray = await dbInhalt.toArray();
                let jsonString = JSON.stringify(dbInhaltArray);
                res.write(jsonString);
            }
            if (url.pathname == "/delete") {
                let id = url.query["id"];
                console.log(id);
                let objectID = new Mongo.ObjectID(id);
                await bestellungen.deleteOne({ "_id": objectID });
            }
        }
        res.end();
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=server.js.map