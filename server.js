const path = require("path");
const express = require("express");
const { initDb, getDb } = require("./src/db");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "src", "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  try {
    const db = await getDb();
    const recipes = await db.all(
      "SELECT id, title, image_url, created_at FROM recipes ORDER BY created_at DESC"
    );
    res.render("index", { recipes });
  } catch (error) {
    next(error);
  }
});

app.get("/recipes/new", (req, res) => {
  res.render("new");
});

app.post("/recipes", async (req, res, next) => {
  try {
    const { title, ingredients, procedure, imageUrl } = req.body;
    const db = await getDb();

    if (!title || !ingredients || !procedure) {
      return res.status(400).send("Faltan campos obligatorios.");
    }

    const result = await db.run(
      `INSERT INTO recipes (title, ingredients, procedure, image_url)
       VALUES (?, ?, ?, ?)`
    , [title.trim(), ingredients.trim(), procedure.trim(), imageUrl?.trim() || null]);

    res.redirect(`/recipes/${result.lastID}`);
  } catch (error) {
    next(error);
  }
});

app.get("/recipes/:id", async (req, res, next) => {
  try {
    const db = await getDb();
    const recipe = await db.get(
      "SELECT id, title, ingredients, procedure, image_url, created_at FROM recipes WHERE id = ?",
      req.params.id
    );

    if (!recipe) {
      return res.status(404).send("Receta no encontrada");
    }

    res.render("show", { recipe });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Ocurrió un error inesperado.");
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo iniciar la base de datos:", error);
    process.exit(1);
  });
