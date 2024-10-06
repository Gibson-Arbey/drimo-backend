const { response, request } = require('express');


const Dream = require('../models/dream.model');

const dreamRegister = async(req = request, res = response) => {
    try {
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = {
    dreamRegister
}