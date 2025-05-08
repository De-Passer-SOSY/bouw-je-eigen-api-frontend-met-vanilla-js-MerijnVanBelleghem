const express = require('express');
const cors = require('cors');
const db = require('./backend/services/db');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/pianos", async (req, res) => {
    try{
        const pianos = await db("pianos")
        res.status(200).json(pianos);
    }catch{
        res.status(500).json({message:"Internal server error"});
    }
});

app.get("/piano/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const piano = await db("pianos").where("id", id);
        if(piano){
            res.status(200).json(piano);
        } else {
            res.status(404).json({message:"Piano not found"});
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});

app.listen(3333, () => {
   console.log("Server started on port 3333");
});