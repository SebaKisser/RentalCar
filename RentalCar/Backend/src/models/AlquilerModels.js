import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const AlquilerSchema = new Schema({

	vehiculo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Vehicle'
	},

	fechaPrestamo: {
		type: Date,
		required: true
	},

	fechaDevolucion: {
		type: Date,
		required: true
	},
}, { timestamps: true });

const Alquiler = model('Alquiler', AlquilerSchema);

export default Alquiler;