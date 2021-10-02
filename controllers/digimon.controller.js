'use strict' ;
const Axios = require('axios') ;
const DigimonModel = require('../models/digimon.models') ;

const getData = async (req, res) => {
    let Url = 'https://digimon-api.vercel.app/api/digimon';
    let axiosRes = await Axios.get(Url);
    let Data = axiosRes.data;
    let cleanData = Data.map(item => {
        return new DigimonModel(item.name, item.img, item.level);
    })
    res.status(200).json( cleanData );
}

module.exports = getData ;