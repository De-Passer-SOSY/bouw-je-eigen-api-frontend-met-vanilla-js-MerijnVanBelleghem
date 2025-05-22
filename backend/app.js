const express = require('express');
const cors = require('cors');
const db = require('./services/db');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./services/swagger.json')

const app = express();
app.use(cors());
app.use(express.json());
// alle piano's tonen
app.get("/pianos", async (req, res) => {
    try{
        const pianos = await db("pianos")
        res.status(200).json(pianos);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});
// piano met specifiek id tonen
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
// nieuwe piano toevoegen
app.post("/newPiano", async (req, res) => {
    const {merk, model, type, bouwjaar, prijs} = req.body;

    if (!merk || !model || !type || !bouwjaar || !prijs) {
        return res.status(400).json({message:"Vul alle velden in"});
    }
    try {
        const [id] = await db("pianos").insert({merk, model, type, bouwjaar, prijs});
        res.status(201).json({
            message:"Succesvol toegevoegd",
            id: id
        });
    } catch(error) {
        res.status(500).json({message:"Fout bij toevoegen van piano"});
    }
})
// piano info updaten
app.put("/updatePiano/:id", async (req, res) => {
   const id = parseInt(req.params.id);
   const {merk, model, type, bouwjaar, prijs} = req.body;

   if (!merk || !model || !type || !bouwjaar || !prijs) {
       return res.status(400).json({message:"Vul alle velden in"});
   }
   try {
       const count = await db("pianos")
           .where({id})
           .update({merk, model, type, bouwjaar, prijs});
       if (count === 0){
           return res.status(404).json({message:"Piano niet gevonden"});
       }

       const updated = await db("pianos").where({id}).first();
       res.status(200).json({
          message: "Piano bijgewerkt",
          updated: updated
       });
   }catch(error){
       res.status(500).json({message:"Fout bij updaten van databank"});
   }
});

app.delete("/deletePiano/:id", async (req, res) => {
   const id = parseInt(req.params.id);
   try{
       const deleted = await db("pianos").where("id", id).delete()
       if (deleted === 0){
           res.status(404).json({message:"Piano niet gevonden"});
       }
       res.status(200).json({message:"Piano verwijdert"});
   }catch(error){
       res.status(500).json({message:"Interne serverfout"});
   }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3333, () => {
   console.log("Server gestart op: http://localhost:3333/");
});