const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");
const { result } = require("underscore");
// Create a single supabase client for interacting with your database
const supabaseUrl = "https://jnzbidaokbumcwymajsd.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuemJpZGFva2J1bWN3eW1hanNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MTc0NjUsImV4cCI6MjAzNzE5MzQ2NX0.mUcXuiWup1vSoCfkq3p3BBOdYnLRLr3JWLqp-OVGZQU";
const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router();

router.put("/", async (req, res) => {
    const {auth_user_id,token,nombre,edad,genero,telefono,direccion,ciudad,correo}=req.body.usuarioActualizado
    // console.log("act: req.body.usuarioActualizado->",req.body.usuarioActualizado); // borrar
    if (token) {
        console.log("Act : Entra a actualizar"); //borrar
        try {
            console.log("act: auth_user_id->", auth_user_id); // borrar
            // Revisa si el usuario ya existe
            let { data: existingUser, error: fetchError } = await supabase
                .from("usuarios")
                .select("*")
                .eq("auth_user_id", auth_user_id)
                .single();
            console.log("act : existingUser->", existingUser); //borrar
            console.log("act : fetchError->", fetchError); //borrar
            var result;
            // Verifica si el usuario existe o no
            if (existingUser) {
                // Si el usuario SI existe lo actualiza
                console.log("lo actualiza v2");
                const { data, error } = await supabase
                    .from("usuarios")
                    .update({
                        nombre: nombre,
                        edad: edad,
                        genero: genero,
                        telefono: telefono,
                        direccion: direccion,
                        ciudad: ciudad
                    })
                    .eq("auth_user_id", auth_user_id);
                console.log("act : data->", data);
                console.log("act : error->", error );
                if (error) throw error;
                result = data;
            } else {
                // Si el usuario NO existe, lo crea
                console.log("lo inserta v2");
                const { data, error } = await supabase
                    .from("usuarios")
                    .insert([
                    {
                        auth_user_id: auth_user_id,
                        nombre: nombre,
                        edad: edad,
                        genero: genero,
                        telefono: telefono,
                        direccion: direccion,
                        ciudad: ciudad
                    }
                ]);
                if (error) throw error;
                result = data;
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(400).json({
            error: "Actualizar : No tiene autenticación vigente. Ingrese de nuevo.",
        });
    }
});

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
            .select()

            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(usuarios) 
            }
    } else {
        res.status(400).json({error: "Crea : Faltan campos obligatorios (correo y password)."})
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
