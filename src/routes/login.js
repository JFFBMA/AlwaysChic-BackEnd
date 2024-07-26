const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");

// Create a single supabase client for interacting with your database
const supabaseUrl = "https://jnzbidaokbumcwymajsd.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuemJpZGFva2J1bWN3eW1hanNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MTc0NjUsImV4cCI6MjAzNzE5MzQ2NX0.mUcXuiWup1vSoCfkq3p3BBOdYnLRLr3JWLqp-OVGZQU";
const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router()

// Crea Usuario en el esquema de autenticación de Supabase
router.post("/signUp", async (req, res) => {
    try {
        let { data, error } = await supabase.auth.signUp({
            email: req.body.correo,
            password: req.body.password,
        });
        if (error) {
            res.status(405).json(error);
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Login de usuario en el esquema de autenticación de Supabase y devolviendo el nombre en la tabla usuarios
router.post("/", async (req, res) => {
    let { data: authData, error: authError } = await supabase.auth.signInWithPassword(
        {
            email: req.body.correo,
            password: req.body.password,
        });
    if (authError) {
        res.status(401).json({ authError: "Credenciales inválidas" });
    } else {
        // consulto el nombre en usuarios y tomo el nombre para agregarlo a la data y tenerlo en el fronend
        const { data, error } = await supabase
            .from("usuarios")
            .select("nombre")
            .eq("auth_user_id", authData.user.id);
        if (data.length === 0) { 
            authData.nombre = "No olvides actualizar tus datos."
        } else {
            authData.nombre = data[0].nombre
        }
        res.status(200).json(authData);
    }
})

module.exports = router;
