
import express from "express"

type Post = {
    id: string;
    content: string;
}

function renderMain(posts: Array<Post>): string {
    return `
        <html>

            <head>

            </head>
            <body>
            <h1>David's Sweet Microblogging Platform</h1>
                ${posts.reduce((acc, cur) => {
        return acc + `
                            <div id="${cur.id}">
                                ${cur.content}
                            </div>
                        `
    }, ``)}



            <div>
                <form method ="POST" >
                    <textarea name="content"></textarea>
                    <button type ="submit">Submit</button>
                </form>
            </div>
            </body>

        </html>


    `;
}


const database: Array<Post> = [{
    id: "1",
    content: "hello!"
},
{
    id: "2",
    content: "world!"
}
];



const app = express();
const port = 3001

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

app.get('/', (req, res) => {
    res.status(200).send(renderMain(database)); 
}); 

app.post('/', (req, res) => {


    const post = req.body;
    database.push({
        content: post.content,
        id: `${Math.random()}`
    });
    res.status(201).send(renderMain(database)); 

}); 



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  