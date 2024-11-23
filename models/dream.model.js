
const { Schema, model } = require('mongoose');

const DreamSchema = Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    label: {
        type: [String],
        required: [true, 'La etiqueta es obligatoria'],
    },
    dateDream: {
        type: Date,
        required: [true, 'La fecha del sueño es obligatoria'],
    },
    sleepFactors: {
        type: [String],
        required: [true, 'Los factores de sueño son obligatorios'], 
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});



DreamSchema.methods.toJSON = function() {
    const { __v, _id, password, ...dream  } = this.toObject();
    dream.uid = _id;
    return dream;
}

module.exports = model( 'Dream', DreamSchema );