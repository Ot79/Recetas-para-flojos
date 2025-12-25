# Recetas para flojos

Web simple para publicar recetas con ingredientes, imágenes y procedimiento. Incluye:

- Página inicial con el listado de recetas.
- Página individual por receta.
- Formulario para crear recetas.
- Almacenamiento persistente con SQLite.

## Requisitos

- Node.js 18+

## Uso local

```bash
npm install
npm run start
```

Abre `http://localhost:3000`.

La base de datos se guarda en `data/recipes.db` (se crea automáticamente). Si quieres
usar otro destino, define `DB_PATH`.

## Hosting recomendado (para que no quede en tu computadora)

Puedes desplegar la app y la base de datos en la nube para que todo quede online:

### Opción rápida (SQLite con almacenamiento persistente)

1. **Render** o **Fly.io** permiten montar un volumen persistente.
2. Configura el volumen para que apunte a `/data`.
3. Define `DB_PATH=/data/recipes.db` en las variables de entorno.

### Opción escalable (PostgreSQL gestionado)

Si quieres un servicio de base de datos separado:

- **Supabase**, **Neon** o **Railway** ofrecen PostgreSQL gestionado.
- Luego puedes migrar el proyecto a PostgreSQL usando un ORM (ej. Prisma o Drizzle).

### Hosting de la web

- **Render**: sencillo para apps Node.
- **Railway**: despliegue rápido y gestión de DB.
- **Fly.io**: buena opción para apps con volumen persistente.

---

Si necesitas que adapte la app a PostgreSQL o que agregue edición/eliminación de recetas,
puedo hacerlo.
