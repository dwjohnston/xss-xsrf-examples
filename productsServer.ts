import http from "http";
import fs from "fs";
import path from "path";
import qs from "querystring";
const url = require('url');

type Product = {
    id: string;
    productName: string;
    productDescription: string;
}

function renderMain(posts: Array<Product>, searchQuery?: string): string {
    return `
        <html>

            <head>

            </head>
            <body>

                ${searchQuery && `<h2>Showing results for "${searchQuery}"</h2>`}


                ${posts.length === 0 ? `<p>No products found</p>` : ``}

                ${posts.reduce((acc, cur) => {
        return acc + `
                            <div id="${cur.id}">
                                <strong>${cur.productName}</strong> <span>${cur.productDescription}</span>
                            </div>
                        `
    }, ``)}



            <div>

                
                <form method ="GET" >
                    <h3>Search for products</h3>
                    <input type="text" name="search"></textarea>
                    <button type ="submit">Submit</button>
                </form>
            </div>
            </body>

        </html>


    `;
}


const database: Array<Product> = [{
    id: "1",
    productName: "shoe",
    productDescription: "to put on your feet"

},
{
    id: "2",
    productName: "hat",
    productDescription: "to put on your head",
}
];


const server = http.createServer(function (req, res) {
    let reqUrl = req.url;
    console.log("REQUESTED => ", reqUrl);


    const queryObject = url.parse(req.url, true).query;

    let foundProducts = [] as Array<Product>;
    if (queryObject.search) {
        foundProducts = database.filter((v) => v.productName.includes(queryObject.search))
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(renderMain(foundProducts, queryObject.search));



});

const PORT = process.env.PORT || 8080;
server.listen(PORT);
  //the server object listens on port 8080
