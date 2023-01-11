
import express from "express"

const url = require('url');
const app = express();
const port = 3001

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 


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

                <h1>David's Ecommerce Store</h1>

                ${searchQuery ? `<h2>Showing results for "${searchQuery}"</h2>` : ''}


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


app.get('/', (req, res) => {
    
    
    const searchQuery = req.query.search as string | undefined; 
    let foundProducts = [] as Array<Product>;
    if (searchQuery) {
        foundProducts = database.filter((v) => v.productName.includes(searchQuery ))
    }
    res.status(200).send(renderMain(foundProducts, searchQuery )); 


}); 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  