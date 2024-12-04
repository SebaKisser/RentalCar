import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Headers/Navbar';

const Login = () => {

	const [loginForm, setLoginForm] = useState( {email: '', password: ''});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange =(e) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {

			const response = await axios.post('/api/session/', loginForm, { withCredentials: true });
			const data = response.data;
			const status = response.status;

			setErrors({});
			navigate('/vehicles');  //Redirigimos a pagina con todos los albums
		}
		catch(error){
			if(error.response && error.response.data && error.response.data.errors){
				setErrors(error.response.data.errors || {});
			}
			console.log('Error:', error);
		}
	};


	return (

		<div>
			<Navbar></Navbar>
			<Box sx={{ width: '300px', margin: 'auto', paddingTop: '50px' }}>

				<Typography variant='h4' component='h1' sx={{marginBottom: '20px'}}>
					Login
				</Typography>

				<form onSubmit={handleLogin} style={styles.formDisplay}>

					<TextField
						label='Email'
						type='email'
						name='email'
						placeholder='example@gmail.com'
						value={loginForm.email || ''}
						onChange={handleChange}
						error={errors.email ? true : false} 
						helperText={errors.email ? errors.email : ''}
					></TextField>

					<TextField
						label='Password'
						name='password'
						type='password'
						value={loginForm.password || ''}
						onChange={handleChange}
						error={errors.password ? true : false}
						helperText={errors.password ? errors.password : ''}
					></TextField>

					<Button type='submit' variant='contained' color='primary'>
						Login
					</Button>

				</form>
			</Box>
		</div>
	);
};

const styles = {
	formDisplay: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: '20px'
	}
}

export default Login;