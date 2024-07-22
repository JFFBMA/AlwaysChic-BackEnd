const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");

// Create a single supabase client for interacting with your database
const supabaseUrl = "https://jnzbidaokbumcwymajsd.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuemJpZGFva2J1bWN3eW1hanNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MTc0NjUsImV4cCI6MjAzNzE5MzQ2NX0.mUcXuiWup1vSoCfkq3p3BBOdYnLRLr3JWLqp-OVGZQU";
const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router()

// Crea Usuario
router.post("/signUp", async (req, res) => {
    console.log("está entrando al registro");
    try {
        let { data, error } = await supabase.auth.signUp({
            email: req.body.correo,
            password: req.body.password,
        })
        console.log("signup :Data->", data)
        console.log("signup :Error->", error);
        if (error) {
            res.status(405).json(error)
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Login de usuario
router.post("/", async (req, res) => {
    console.log("entra al login" )
    let { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.correo,
        password: req.body.password
    });
    console.log("login: data->",data)
    console.log("login: error->",error)
    if (error) {
        res.status(405).json(error)
    } else {
        //const accessToken = data.session.access_token;
        res.status(200).json(data)
    }
})

module.exports = router;
