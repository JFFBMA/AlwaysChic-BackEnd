const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");
// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://srlydytvjzipvxmzrvbz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybHlkeXR2anppcHZ4bXpydmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0ODM2NTgsImV4cCI6MjAzNjA1OTY1OH0.k6hH0RPNGsFhSZSpsGhaZZd054xN-aKyEKS2NuBKirc"
);
const router = Router();

router.get("/", async (req, res) => {
    let { data: usuarios, error } = await supabase
        .from("usuarios")
        .select("*");
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(usuarios);
        }
});

router.get("/:id", async (req, res) => {
    let { data: usuarios, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", req.params.id);
    if (error) {
        res.status(400).json(error);
    } else {
        res.status(200).json(usuarios);
    }
});

router.post("/", async (req, res) => {
    const { nombres, genero, nacionalidad, correo, password } = req.body;

    if (correo && password) {
        const { data: usuarios, error } = await supabase
            .from("usuarios")
            .insert([
                {
                nombres: nombres,
                genero: genero,
                nacionalidad: nacionalidad,
                correo: correo,
                password: password
                }
            ])
            .select();
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(usuarios) 
            }
    } else {
        res.status(400).json({error: "Crea : Faltan campos obligatorios (correo y password)."})
    }
});

router.put("/", async (req, res) => {
    const { id, nombres, genero, nacionalidad, correo, password } = req.body;
    
    if ( correo && password ) {
        
        const { data: usuarios, error } = await supabase
            .from("usuarios")
            .update({
                nombres: nombres,
                genero: genero,
                nacionalidad: nacionalidad,
                correo: correo,
                password: password
            })
            .eq("id", id)
            .select();
        
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(usuarios);
        }
    } else {
        res.status(400).json({error: "Actualiza : El correo y el password son obligatorios."});
    }
});

router.delete("/:id", async (req, res) => {
    const { data: usuarios, error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", req.params.id)
        .select()
    if (error) {
        res.status(400).json(error);
    } else {
        res.status(200).json(usuarios);
    }
});

module.exports = router;
