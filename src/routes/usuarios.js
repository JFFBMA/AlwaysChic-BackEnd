require("dotenv").config();
const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");
const { result } = require("underscore");

// Crea cliente Supabase para interactuar con la BD
const supabase = createClient(process.env.DATABASE_URL, process.env.API_KEY);

const router = Router();

// Consulta la tabla "usuarios" buscando por "auth_user_id" que viene por req.
router.get("/:id", async (req, res) => {
    let { data: usuarios, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("auth_user_id", req.params.id);
    if (error) {
        res.status(400).json(error);
    } else {
        res.status(200).json(usuarios);
    }
});

// router.get("/", async (req, res) => {
    
//     const {data: { user }  } = await supabase.auth.getUser();
//     console.log("user:",user)
//     res.status(200).json(user);
//     // leer doc para manejar error
// });

// Inserta o actualiza la tabla "usuarios" buscando por "auth_user_id" que viene por req.
router.put("/", async (req, res) => {
    const {auth_user_id,token,nombre,edad,genero,telefono,direccion,ciudad,correo}=req.body.usuarioActualizado
    if (token) {
        try {
            // Revisa si el usuario ya existe
            let { data: existingUser, error: fetchError } = await supabase
                .from("usuarios")
                .select("*")
                .eq("auth_user_id", auth_user_id)
                .single();
            var result;
            // Verifica si el usuario existe o no
            if (existingUser) {
                // Si el usuario SI existe lo actualiza
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
                if (error) throw error;
                result = data;
            } else {
                // Si el usuario NO existe, lo crea
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

module.exports = router;
