// const search = require('express').Router();
const Meds = require('../../models/medicine');
const check = require('../../utils/validation');

module.exports = (req, res) => {
    console.log(req.query.query);
    const query = req.query.query;
    
    if (!query) {
        res.json({
            error: "Por favor ingresar algún parámetro de busqueda..."
        });
        return;
    }

    Meds.find(query)
    .then((results) => {
        res.json(results);
    })
    .catch((error) => {
        throw new Error(`=== Error while searching the db:\n ==== ${error}`);
        res.json([]);
    })
};