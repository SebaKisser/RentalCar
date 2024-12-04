import { model, Schema } from 'mongoose';

const VehicleSchema = new Schema({

	tipo: {
		type: String,
		required: [true, 'Proporciona el tipo de vehiculo'],
		enum: {
			values: ['auto', 'camioneta', 'moto'],
			message: 'El tipo debe ser auto, camioneta o moto'
		},
	},
	
	marca: {
		type: String,
		required: [true, 'Proporciona la marca del vehiculo'],
		minLength: [4, 'La marca del vehiculo debe de tener al menos 3 caracteres'],
		maxLength: [10, 'La marca no puede superar los 10 caracteres'],
	},

	modelo: {
		type: String,
		required: [true, 'Proporciona el modelo del vehiculo'],
		minLength: [3, 'El modelo del vehiculo debe de tener al menos 3 caracteres'],
		maxLength: [10, 'El modelo del vehiculo no puede superar los 10 caracteres'],
	},

	color: {
		type: String,
		required: [true, 'Proporciona el color del vehiculo'],
		enum: {
			values: ['Gris', 'Blanco', 'Plateado', 'Negro', 'Rojo', 'Azul'],
			message: 'El color debe estar entre estas opciones: [Gris, Blanco, Plateado, Negro, Rojo, Azul]'
		},
	},

	año: {
		type: Number,
		required: [true, 'Proporciona el año del vehiculo'],
		min: [1990, 'El año debe ser igual o posterior a 1990'],
		max: [new Date().getFullYear(), 'El año no puede ser mayor al año actual'],
	},

	asientos: {
		type: Number,
		required: [true, 'El número de asientos es obligatorio'],
		min: [1, 'El vehiculo debe tener al menos 1 asiento'],
		max: [6, 'El vehiculo no puede tener más de 6 asientos'],
	},

	chapa: {
		type: String,
		required: [true, 'Especifique la matrícula del vehículo'],
		unique: true,
	},

	costoDia: {
		type: Number,
		required: [true, 'Especifique el costo de alquiler por dia'],
		min: [10000, 'El precio minimo es de 10000 Gs.']
	},

	imagen: {
		type: String,
		required: [true, 'La URL de la imagen es obligatoria'],
		match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/, 'URL invalida'],
	},

	disponible: {
		type: Boolean,
		required: [true, 'El estado de disponibilidad es obligatorio'],
		default: true
	},
	
}, { timestamps: true });

const Vehicle = model('Vehicle', VehicleSchema);

export default Vehicle;