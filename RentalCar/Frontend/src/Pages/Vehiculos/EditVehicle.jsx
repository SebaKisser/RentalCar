import { useState, useEffect } from "react";
import axios from 'axios';
import { Box, TextField, Select, Button, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../Headers/UserNavbar";

const initialState = {
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

const EditVehicle = () => {

	const { id } = useParams();
	const [form, setForm] = useState(initialState);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value});
	}

	const getVehicleById = async () => {
        try {
            const response = await axios.get(`/api/vehiculos/${id}`);
            setForm(response.data);
        } catch (error) {
            setErrors("Vehiculo no encontrado:", error);
        }
    };

	const handleEdit = async (e) => {
		e.preventDefault();

		try{
			const response = await axios.put(`/api/vehiculos/${id}`, form);
			alert("Vehiculo actualizado con exito");
			navigate('/vehicles');
		}
		catch(error){
			if (error.response && error.response.data) {
				setErrors(error.response.data.errors);
			}
		}
	};

	//Montamos el form con los datos
	useEffect( () => {
		getVehicleById();
	}, []);

	return (

		<div>

			<UserNavbar></UserNavbar>

			<Box
				component='form'
				onSubmit={handleEdit}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, margin:'20px auto' }}
			>

				<Typography variant='h4' component='h1' sx={{marginBottom: '20px'}}>
					Editar Vehiculo
				</Typography>

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
}

export default EditVehicle;