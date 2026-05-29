const express = require('express');
const cors = require('cors');
require('dotenv').config({
    path: __dirname + '/.env'
});

const app = express();

app.use(cors());
app.use(express.json());

const igRoutes = require('./routes/igRoutes');
const compareRoutes = require('./routes/compareRoutes');

app.use('/api/instagram', igRoutes);
app.use('/api/compare', compareRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});