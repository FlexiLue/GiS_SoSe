import * as HTTP from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


namespace Endabgabe {

    let databaseUrl: string = "mongodb+srv://Flexi:passwort2@cluster0.qh8rt.mongodb.net/GiS_SoSe_2020?retryWrites=true&w=majority";
    let port: number = Number (process.env.Port);
    let bestellungen: Mongo.Collection;

    if (!port) {
        port = 8100;
    }

    serverInit(port);
    connectToDatabase(databaseUrl);

    function serverInit (_port: number): void {

        let server: HTTP.Server = HTTP.createServer();
        server.addListener("request", handleRequest);

        server.addListener("listening", function (): void {
            console.log("listening");
        });

        server.listen(_port);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, { useNewUrlParser: true, useUnifiedTopology: true });
        
        await mongoClient.connect();

        bestellungen = mongoClient.db("Eisshop").collection("bestellungen");
        if (bestellungen != null) {
            console.log("Successfully connected to Database and found Collection Bestellungen");
        }
    }


    
    async function handleRequest(req: HTTP.IncomingMessage, res: HTTP.ServerResponse): Promise<void> {
        res.setHeader("content-type", "text/html; charset=utf-8");
        res.setHeader("Access-Control-Allow-Origin", "*");

        if (req.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(req.url, true);

            if (url.pathname?.match("/createBestellung")) {
                bestellungen.insertOne(url.query);
            }

            if (url.pathname == "/getBestellungen") {
                let dbInhalt: Mongo.Cursor<string> = bestellungen.find();
                let dbInhaltArray: string[] = await dbInhalt.toArray();
                let jsonString: string = JSON.stringify(dbInhaltArray);
                res.write(jsonString);
            }

            if (url.pathname == "/delete") {

                let id: string = <string>url.query["id"];
                console.log(id);
                let objectID: Mongo.ObjectID = new Mongo.ObjectID(id);

                await bestellungen.deleteOne({ "_id": objectID });
            }
        }


        res.end();
    }

}