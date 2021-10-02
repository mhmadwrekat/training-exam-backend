'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const Axios = require('axios') ;
require('dotenv').config();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const PORT = process.env.PORT;
mongoose.connect('mongodb://localhost:27017/test1', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(PORT, () => {console.log(`✔️ You In Port : ${PORT}✔️!`);})
/////////////////////////// API
class DigimonModel {constructor(name, img, level) {
    this.name = name;
    this.img = img;
    this.level = level;
}}
const getData = async (req, res) => {
    let Url = 'https://digimon-api.vercel.app/api/digimon';
    let axiosRes = await Axios.get(Url);
    let Data = axiosRes.data;
    let cleanData = Data.map(item => {
        return new DigimonModel(item.name, item.img, item.level);
    })
    res.status(200).json( cleanData );
}
app.get('/data', getData);
/////////////////////////////// DATABASE
const SCM = new mongoose.Schema({
    name: String,
    img: String,
    level: String
});
let seed = () => {
    let newDig = new DigModel({
        name: "name test",
        img: "img test",
        level: 'level test'
    });
    newDig.save();
}
const DigModel = mongoose.model('test', SCM);
////////////////////// Retern All Data From DB
let bookController = (req, res) => {
    DigModel.find().then(data => {
        res.status(200).json(data);
    })
}
app.get('/DBdata', bookController);
//////////////////////////////// Post New  
const createBookController = async (req, res) => {
    let bookData = req.body;
    let newBook = DigModel(bookData);
    newBook.save();
    let data = await DigModel.find({});
    res.status(201).json(data);
}
app.post('/create', createBookController);
//////////////////////////////// UPDATE
const updateBookController = async (req, res) => {
    let bookId = req.params.id;
    let update = req.body;
    DigModel.findOne({ _id: bookId }).then(item => {
        item.name = update.name,
            item.img = update.img,
            item.level = update.level
        item.save();
    });
    let up = await DigModel.find({});
    res.status(200).send(up);
}
app.put('/update/:id', updateBookController)
////////////////////////////// DELETE
const deleteBookController = (req, res) => {
    let id = req.params.id;
    DigModel.findByIdAndDelete(id, (error, data) => {
        if (error) {
            res.status(500).send("ERROR ❌");
        } else {
            DigModel.find({}).then(books => {
                res.json(books);
            })
        }
    })
}
app.delete('/delete/:id', deleteBookController);
/////////////////////////////////////////////////////