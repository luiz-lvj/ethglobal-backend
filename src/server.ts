import "./setup";
import app from "./app";
import "reflect-metadata";
import { AppDataSource } from "./data-source";


AppDataSource.initialize().then(async () => {


    const port = process.env.PORT || 4000;


    app.listen(port, () =>{
        console.log(`Server listening on port ${port}.`)
    })    

}).catch((err) => {
    console.log(err);
    throw new Error("Unable to connect to database - error: " + err.message);
})