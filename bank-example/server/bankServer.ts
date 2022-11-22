const express = require("express");
const cookieParser = require("cookie-parser");
const  qs = require( "qs");

const app = express();
const port = 3001

app.use(express.json()); 
app.use(cookieParser());

export const foo = {}; 



const database : Record<any, {password: string, balance: number}> = {
    "joebloggs": {
        password: "foo", 
        balance: 100
    }
}

const cookieDb : Record<string, string> = {

}

app.post('/auth', (req, res) => {


    const {
        user, password
    } = req.body; 


    if(!database[user] || database[user].password !== password){
        res.status(401).end(); 
        return; 
    }

    else {

        const cookieValue = `${Math.random()}`; 
        cookieDb[cookieValue] = user; 

        res.cookie('auth', cookieValue ); 
        res.status(200).end(); 
        return;
    }
})


app.get("/update-balance", (req, res) => {


    const authCookie = req.cookies["auth"]; 
    if (!authCookie) {
        res.status(403).end(); 
        return; 
    }
    const user = cookieDb[authCookie]; 
    if (!user){
        res.status(403).end(); 
        return; 
    }

    //@ts-ignore
    const queryParams = qs.parse(req.query);
    const {changeAmount} = queryParams;

    if (!changeAmount || typeof changeAmount !== "number"){
        res.status(400).end(); 
        return; 
    }

    database[user].balance += changeAmount; 

    res.status(200).end();
}); 

app.get("/get-balance", (req, res) => {
    const authCookie = req.cookies["auth"]; 
    if (!authCookie) {
        res.status(403).end(); 
        return; 
    }
    const user = cookieDb[authCookie]; 
    if (!user){
        res.status(403).end(); 
        return; 
    }
    res.status(200).send(JSON.stringify({balance: database[user].balance}));
}); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
