const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://srlydytvjzipvxmzrvbz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybHlkeXR2anppcHZ4bXpydmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0ODM2NTgsImV4cCI6MjAzNjA1OTY1OH0.k6hH0RPNGsFhSZSpsGhaZZd054xN-aKyEKS2NuBKirc"
);

const router = Router();

// router.get("/:correo", async (req, res) => 
//     {   
//     let { data: usuarios, error } = await supabase
//         .from("usuarios")
//         .select("*")
//         .eq("correo", req.params.correo); 
//         if (error) {
//             res.status(400).json(error);
//         } else {
//             res.status(200).json(usuarios);
//         }
// }
// );

// Crea Usuario
router.post("/signUp", async (req, res) => {
    let { data, error } = await supabase.auth.signUp({
        email: req.body.correo,
        password: req.body.password
    });
    if (error) {
        res.status(405).json(error)
    } else {
        res.status(200).json(data);
    }
});

// Login de usuario
router.post("/", async (req, res) => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.correo,
        password: req.body.password
    });
    if (error) {
        res.status(405).json(error);
    } else {
        res.status(200).json(data);
    }
});

// Obtenga el objeto JSON para el usuario que inició sesión.
router.get("/", async (req, res) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (error) {
        res.status(405).json(error);
    } else {
        res.status(200).json(data);
    }
});

module.exports = router;
