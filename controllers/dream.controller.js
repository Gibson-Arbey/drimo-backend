const { response, request } = require('express');


const Dream = require('../models/dream.model');
const Usuario = require('../models/user.model');

const getDreams = async (req = request, res = response) => {
    try {
        const dreams = await Dream.find();
        return res.json({ msg: dreams});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const getDreamById = async (req = request, res = response) => {
    try {
        const { dreamId } = req.params; 
        const dream = await Dream.findById(dreamId);
        if(!dream) {
            return res.status(404).json({msg: "Sueño no encontrado"})
        }
        return res.json({ msg: dream});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const dreamRegister = async(req = request, res = response) => {
    try {
        const { userId, title, description, labels, sleepFactors } = req.body;

        const usuario = await Usuario.findById(userId);

        if (!usuario) {
        return res.status(404).json({ msg: "Usuario no existe" });
        }

        const newDream = new Dream({
            userId,
            title,
            description,
            label: labels,
            sleepFactors,
            dateDream: Date.now()
        });


        await newDream.save();

        return res.status(201).json({ msg: "Sueño registrado exitosamente"});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const updateDream = async(req = request, res = response) => {
    try {
        const { dreamId } = req.params;

        const { title, description, labels, sleepFactors } = req.body;

        const dream = await Dream.findById(dreamId);

        if (!dream) {
        return res.status(404).json({ msg: "El sueño no existe" });
        }

        await Dream.findByIdAndUpdate(id, {
            title,
            description,
            label: labels,
            sleepFactors,
        });

        return res.status(200).json({ msg: "Sueño actualizado exitosamente"});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

const deleteDream = async(req = request, res = response) => {
    try {
        const { dreamId } = req.params; 
        const dream = await Dream.findByIdAndDelete(dreamId);
        if(!dream) {
            return res.status(404).json({msg: "Sueño no encontrado"})
        }
        return res.json({ msg: "Sueño eliminado exitosamente"});
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = {
    dreamRegister,
    getDreams,
    getDreamById,
    deleteDream,
    updateDream
}