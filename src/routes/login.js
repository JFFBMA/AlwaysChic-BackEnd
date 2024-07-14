const { Router } = require("express");
const { createClient } = require("@supabase/supabase-js");
// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://srlydytvjzipvxmzrvbz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNybHlkeXR2anppcHZ4bXpydmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0ODM2NTgsImV4cCI6MjAzNjA1OTY1OH0.k6hH0RPNGsFhSZSpsGhaZZd054xN-aKyEKS2NuBKirc"
);
const router = Router();

router.get("/:correo", async (req, res) => 
    {   
    let { data: usuarios, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("correo", req.params.correo); 
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(usuarios);
        }
}
);

module.exports = router;
