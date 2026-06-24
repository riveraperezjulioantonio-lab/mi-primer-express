const express = require('express');
const pool = require('./db'); // Conexión a tu base de datos PostgreSQL
const app = express();

// Middleware obligatorio para recibir datos JSON desde Postman (Parte 2)
app.use(express.json());

// Ruta inicial de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// === PARTE 1: RUTA GET (Consultar todos los alumnos) ===
app.get('/alumnos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM alumno');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar alumnos:', error);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

// === PARTE 2: NUEVA RUTA POST (Insertar un nuevo alumno) ===
app.post('/alumnos', async (req, res) => {
  try {
    const { nombre, apellido, edad, correo } = req.body;

    // Validación básica: Comprobar que no falten campos obligatorios (Parte 4)
    if (!nombre || !apellido || !edad || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Consulta SQL estructurada para insertar los datos de forma segura (Parte 3)
    const resultado = await pool.query(
      'INSERT INTO alumno (nombre, apellido, edad, correo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, edad, correo]
    );

    // Respuesta exitosa indicando que se creó el registro (Código 201 Created)
    res.status(201).json({
      mensaje: 'Alumno insertado correctamente',
      alumno: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al insertar alumno:', error);
    res.status(500).json({ error: 'Error al insertar el alumno' });
  }
});

// Levantar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});