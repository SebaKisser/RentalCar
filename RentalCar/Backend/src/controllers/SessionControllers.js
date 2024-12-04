import User from "../models/UserModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const login = async (req, res) => {

	try {

		const { email, password } = req.body;

		const user = await User.findOne({email});

		if(!user){
			return res.status(400).json(
				{ errors: { email: 'Usuario no encontrado'} });
		}

		const passwordMatch = bcrypt.compareSync(password, user.password);

		if(!passwordMatch) {
			return res.status(401).json({ 
				errors: { password: 'Contraseña incorrecta'} });
		}

		//Se genera el token
		const token = jwt.sign({ _id: user._id, email: user.email },
			process.env.JWT_SECRET, { expiresIn: '15m'}
		);

		//Se establece el token en una cookie
		res.status(200)
			.cookie('userToken', token, { httpOnly: true })
			.json({token});	
	}
	catch(error) {
		res.status(500).json({
			errors: { general: 'Ocurrio un error en el servidor'} });
	}
}


const logout = async (req, res) => {
	res.status(200).clearCookie('userToken').json({ message: 'Hasta luego!'});
}


const session = async (req, res) => {
	res.status(200).json(req.user);
}


const getUserSession = (req, res) => {
	try {
		const { _id, email } = req.user;  //Datos del usuario obtenidos en el middleware
		res.status(200).json({ _id, email});
	}
	catch(error){
		res.status(500).json({ message: 'Error al obtener los datos del usuario'});
	}
}

export default { login, getUserSession, logout, session };