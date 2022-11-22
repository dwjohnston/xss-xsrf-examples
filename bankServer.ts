import express from "express"
import cookieParser from "cookie-parser";
import qs from "qs";


const app = express();
const port = 3001

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 


const database : Record<any, {password: string, balance: number}> = {
    "joebloggs": {
        password: "foo", 
        balance: 100
    }
}

const cookieDb : Record<string, string> = {

}

app.post('/api/auth', (req, res) => {


    const {
        user, password
    } = req.body; 

    console.log(user, password);


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


app.get("/api/update-balance", (req, res) => {


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

    const changeAmountInt =  parseInt(changeAmount as string); 

    if (!changeAmount || typeof changeAmountInt!== "number"){
        res.status(400).end(); 
        return; 
    }

    database[user].balance += changeAmountInt; 

    res.status(200).send(JSON.stringify({balance: database[user].balance}));
}); 

app.get("/api/get-balance", (req, res) => {
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
