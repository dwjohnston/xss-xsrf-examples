import http from "http";
import fs from "fs";
import path from "path";
import qs from "querystring";

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


const server = http.createServer(function (req, res) {
    let reqUrl = req.url;
    console.log("REQUESTED => ", reqUrl);

    if (reqUrl === "/") {
        if (req.method === "POST") {
            var body = '';

            req.on('data', function (data) {
                body += data;

                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    req.connection.destroy();
            });

            req.on('end', function () {
                const post = qs.parse(body);


                if (post.content && typeof post.content === "string") {
                    database.push({
                        content: post.content,
                        id: `${Math.random()}`
                    });

                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(renderMain(database));
                }

            });
        }
        else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(renderMain(database));
        }
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT);
  //the server object listens on port 8080
