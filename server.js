'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const PORT = process.env.PORT ;
mongoose.connect('mongodb://localhost:27017/test1', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(PORT, () => {console.log(`✔️ You In Port : ${PORT}✔️!`);})
const { getData,
    bookController,
    createBookController,
    deleteBookController,
    updateBookController } = require('./controllers/digimon.controller');
/////////////////////////// API
app.get('/data', getData);
/////////////////////////////// DATABASE
app.get('/DBdata', bookController);
app.post('/create', createBookController);
app.put('/update/:id', updateBookController)
app.delete('/delete/:id', deleteBookController);
/////////////////////////////////////////////////////