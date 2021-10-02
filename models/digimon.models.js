'use strict' ;
const mongoose = require('mongoose');
class DigimonModel {
    constructor(name, img, level) {
    this.name = name;
    this.img = img;
    this.level = level;
}}
/////////// DB ////////////
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

module.exports = {
    DigimonModel, 
    DigModel,
    seed
};