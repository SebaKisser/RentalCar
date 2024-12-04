import { useState } from "react";
import axios from 'axios';
import { Box, TextField, Select, Button, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import UserNavbar from "../Headers/UserNavbar";

const initialState = {
	tipo: '',
	marca: '',
	modelo: '',
	color: '',
	año: 0,
	asientos: 0,
	chapa: '',
	costoDia: 0,
	imagen: '',
	disponible: true
}

const AddVehicle = () => {

	const [form, setForm] = useState(initialState);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleAdd = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/api/vehiculos', form);
			const data = response.data;
			console.log(data);
			setErrors({});
			setForm(initialState);
			navigate('/vehicles');
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

			<UserNavbar></UserNavbar>

			<Box
				component='form'
				onSubmit={handleAdd}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin:'20px auto' }}
			>

				<Typography variant='h4' component='h1' sx={{marginBottom: '20px'}}>
					Agregar Vehiculo
				</Typography>

				<FormControl fullWidth>

					<InputLabel id='tipo'>Tipo</InputLabel>

					<Select 
						labelId="tipo"
						name="tipo"
						value={form.tipo}
						onChange={handleChange}
					>
						<MenuItem value="auto">Auto</MenuItem>
						<MenuItem value="camioneta">Camioneta</MenuItem>
						<MenuItem value="moto">Moto</MenuItem>
					</Select>

				</FormControl>

				<TextField
					label="Marca"
					name="marca"
					value={form.marca}
					onChange={handleChange}
				/>

				<TextField
					label="Modelo"
					name="modelo"
					value={form.modelo}
					onChange={handleChange}
				></TextField>

				<FormControl fullWidth>

					<InputLabel id='color'>Color</InputLabel>

					<Select 
						labelId="color"
						name="color"
						value={form.color}
						onChange={handleChange}
					>
						<MenuItem value="Gris">Gris</MenuItem>
						<MenuItem value="Blanco">Blanco</MenuItem>
						<MenuItem value="Plateado">Plateado</MenuItem>
						<MenuItem value="Negro">Negro</MenuItem>
						<MenuItem value="Rojo">Rojo</MenuItem>
						<MenuItem value="Azul">Azul</MenuItem>
					</Select>

				</FormControl>

				<TextField
					label='Año'
					name='año'
					type='number'
					value={form.año}
					onChange={handleChange}
				></TextField>

				<TextField
					label='Asientos'
					name='asientos'
					type='number'
					value={form.asientos}
					onChange={handleChange}
				></TextField>

				<TextField
					label='Chapa'
					name='chapa'
					value={form.chapa}
					onChange={handleChange}
				></TextField>

				<TextField
					label='Costo por dia'
					name='costoDia'
					type='number'
					value={form.costoDia}
					onChange={handleChange}
				></TextField>

				<TextField
					label='URL de la imagen'
					name='imagen'
					value={form.imagen}
					onChange={handleChange}
				></TextField>

				<FormControl fullWidth>
					<InputLabel id='disponible'>Disponible</InputLabel>
					<Select
						labelId='disponible'
						name='disponible'
						value={form.disponible}
						onChange={handleChange}
						>
							<MenuItem value='true'>Sí</MenuItem>
							<MenuItem value='false'>No</MenuItem>
					</Select>
				</FormControl>

				<Button type="submit" variant="contained" color="primary">
					Enviar
				</Button>

			</Box>

		</div>
	);
};

export default AddVehicle;