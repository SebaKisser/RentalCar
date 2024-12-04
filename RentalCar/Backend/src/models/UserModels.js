import { model, Schema } from 'mongoose';
import { validarEmail } from '../utils/CustomValidations.js';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({

	nombre: {
		type: String,
		required: [true, 'Por favor proporciona tu nombre'],
		minLength: [3, 'El nombre debe de tener al menos 3 caracteres']
	},

	apellido: {
		type: String,
		required: [true, 'Por favor proporciona tu apellido'],
		minLength: [3, 'El apellido debe de tener al menos 3 caracteres']
	},

	email: {
		type: String,
		required: [true, 'El correo es obligatorio'],
		trim: true,
		lowerCase: true,
		unique: [true, 'El correo ya existe'],
		validate: [validarEmail, 'Por favor ingresa un correo valido']
	},

	password: {
		type: String,
		required: [true, 'El password es obligatorio'],
		minLength: [8, 'El password debe tener al menos 8 caracteres']
	}
	
}, {timestamps: true});


//VALIDACION Y CONFIRMACION DE PASSWORD
UserSchema.virtual('confirmPassword')
	.get(function() {
		return this._confirmPassword;
	})
	.set(function(value){
		this._confirmPassword = value;
	});


UserSchema.pre('validate', function (next) {
	if(this.password !== this.confirmPassword) {
		this.invalidate('confirmPassword', 'Las passwords no coinciden');
	}
	next();
});


//ENCRIPTACION DE PASSWORD
UserSchema.pre('save', function (next) {
	if(this.isModified('password')){
		try {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(this.password, salt);
			this.password = hash;  //Asigna la contrasenia encryptada al campo password
			next();
		}
		catch(error) {
			next(error);
		}
	}
	else {
		next();
	}
});

const User = model('User', UserSchema);

export default User;