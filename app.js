const express = require('express');
const app = express();
const PORT = 3000;

// Ruta principal (Home)
app.get('/', (req, res) => {
    res.send('¡Servidor básico con Express funcionando correctamente!');
});

// Inicialización del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});