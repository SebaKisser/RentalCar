import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardContent, CardMedia, Typography, TextField } from '@mui/material';

const AlquilerForm = () => {

	const { id } = useParams();
	const [vehiculo, setVehiculo] = useState(null);
	const [dias, setDias] = useState(1);
	const navigate = useNavigate();

	const getVehicleById = async () => {
		try {
			const response = await axios.get(`/api/vehiculos/${id}`);
			const data = response.data;
			console.log(data);
			setVehiculo(data);
		}
		catch(error){
			console.log('Error al obtener el vehiculo', error);
		}
	};

	useEffect( () => {
		getVehicleById();
	}, []);

	const handleCreateAlquiler = async () => {

		try {

			if (vehiculo && vehiculo.disponible) {

				const numeroDias = parseInt(dias, 10);

				const alquilerData = {
					vehiculo: vehiculo._id,
					fechaPrestamo: new Date(),
					fechaDevolucion: new Date(new Date().getTime() + dias * 24 * 60 * 60 * 1000), //La mult convierte todo en milisegundos
				};

				const response = await axios.post('/api/alquileres', alquilerData)
				console.log(response.data);
				alert("Vehiculo alquilado con exito");

				navigate('/vehicles');

			}
			else {
				alert("Vehiculo no disponible");
			}
		}
		catch(error) {
			console.log('Error al confirmar alquiler', error);
		}
	};


	if (!vehiculo) {
		return <Typography>Cargando detalles del vehículo...</Typography>;
	}

	return (
		<Box sx={{ maxWidth: 500, margin: '0 auto', padding: 2 }}>

			<Typography variant="h4" align="center" sx={{ marginBottom: 2}}>
				Formulario de alquiler
			</Typography>

			<Card sx={{ display: 'flex' }}>

				<CardMedia
					component="img"
					sx= {{ width: 150 }}
					image={vehiculo.imagen}	
					alt={vehiculo.marca}
				></CardMedia>

				<Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
					<CardContent>

						<Typography variant="h5">{`${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.color}`}</Typography>

						<Typography variant="subtitle1">Año: {vehiculo.año}</Typography>

						<Typography variant="subtitle1">
							Alquiler/día: {vehiculo.costoDia.toLocaleString()} Gs.
						</Typography>

						<TextField
							label="Número de días"
							type="number"
							value={dias}
							onChange={(e) => setDias(e.target.value)}
							fullWidth
							margin="normal"
						/>

						<Button
							variant="contained"
							color="primary"
							sx={{ marginTop: 2 }}
							onClick={handleCreateAlquiler}
						>
							Confirmar Alquiler
						</Button>
					</CardContent>

				</Box>
			</Card>
		</Box>
	);
};

export default AlquilerForm;