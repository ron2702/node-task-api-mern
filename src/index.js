
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🔗 Conexión exitosa a MongoDB Atlas.');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error.message);
        process.exit(1); 
    }
}

app.use(express.json());
app.use('/api/tasks', taskRoutes); 

app.get('/', (req, res) => {
    res.send('API de Tareas está corriendo. ¡Lista para el CRUD!');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Express escuchando en el puerto ${PORT}`);
        console.log(`URL: http://localhost:${PORT}`);
    });
});