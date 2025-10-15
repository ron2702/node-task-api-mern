
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🔗 Success.');
    } catch (error) {
        console.error('❌ Error connecting to database:', error.message);
        process.exit(1);
    }
}

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); 

app.get('/', (req, res) => {
    res.send('Task API is running. Ready for CRUD operations!');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Express server listening on port ${PORT}`);
        console.log(`URL: http://localhost:${PORT}`);
    });
});