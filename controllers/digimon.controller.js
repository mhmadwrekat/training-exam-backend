'use strict' ;
const Axios = require('axios') ;
const { DigModel , DigimonModel } = require('../models/digimon.models');
////////////////////// API
const getData = async (req, res) => {
    let Url = 'https://digimon-api.vercel.app/api/digimon';
    let axiosRes = await Axios.get(Url);
    let Data = axiosRes.data;
    let cleanData = Data.map(item => {
        return new DigimonModel(item.name, item.img, item.level);
    })
    res.status(200).json( cleanData );
}
////////////////////// Retern All Data From DB
let bookController = (req, res) => {
    DigModel.find().then(data => {
        res.status(200).json(data);
    })
}
//////////////////////////////// Post New  
const createBookController = async (req, res) => {
    let bookData = req.body;
    let newBook = DigModel(bookData);
    newBook.save();
    let data = await DigModel.find({});
    res.status(201).json(data);
}
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
////////////////////////////// DELETE
const deleteBookController = (req, res) => {
    let id = req.params.id;
    DigModel.findByIdAndDelete(id, (error, data) => {
        if (error) {
            res.status(500).send("ERROR ❌");
        } else {
            DigModel.find({}).then(books => {
                res.json(books);
            })}})}
module.exports = {
    getData,
    updateBookController,
    deleteBookController,
    createBookController,
    bookController
} ;