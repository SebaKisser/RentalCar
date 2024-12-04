import { useState } from "react";
import axios from 'axios';
import { Box, TextField, Typography, Button} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Navbar from '../Headers/Navbar';

const initialState = {
	nombre: '',
	apellido: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const Register = () => {

	const [form, setForm] = useState(initialState);

	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const handleRegister = async (e) => {

		e.preventDefault();

		try {
			const response = await axios.post('./api/users', form);
			const data = response.data;
			setErrors({});
			setForm(initialState);
			navigate('/login');
		}
		catch(error){
			if (error.response && error.response.data) {
				setErrors(error.response.data.errors);
			}
		}
	};

	const handleChange =  (e) => {
		setForm({ ...form, [e.target.name]: e.target.value});
	}


	return (
		
		<div>
			<Navbar></Navbar>
			<Box sx={{ width: '300px', margin: 'auto', paddingTop: '50px' }}>

				<Typography variant='h4' component='h1' sx={{marginBottom: '20px'}}>
					Registro
				</Typography>

				<form onSubmit={handleRegister} style={styles.formDisplay}>

					<TextField
						label='Nombre'
						name='nombre'
						value={form.nombre}
						onChange={handleChange}
						error={errors.nombre}
						helperText={errors.nombre ? errors.nombre.message : ''}
					></TextField>

					<TextField
						label='Apellido'
						name='apellido'
						value={form.apellido}
						onChange={handleChange}
						error={errors.apellido}
						helperText={errors.apellido ? errors.apellido.message : ''}
					></TextField>

					<TextField
						label='Email'
						name='email'
						value={form.email}
						onChange={handleChange}
						error={errors.email}
						helperText={errors.email ? errors.email.message : ''}
					></TextField>

					<TextField
						label='Password'
						name='password'
						type='password'
						value={form.password}
						onChange={handleChange}
						error={errors.password}
						helperText={errors.password ? errors.password.message : ''}
					></TextField>

					<TextField
						label='Confirm Password'
						name='confirmPassword'
						type='password'
						value={form.confirmPassword}
						onChange={handleChange}
						error={errors.confirmPassword}
						helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
					></TextField>

					<Button type='submit' variant='contained' color='primary'>
						Registrarse
					</Button>

				</form>
			</Box>
		</div>
	);
}

const styles = {
	formDisplay: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: '20px'
	}
}

export default Register;