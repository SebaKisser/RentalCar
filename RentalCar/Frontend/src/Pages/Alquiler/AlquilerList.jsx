import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Grid2 } from '@mui/material';
import UserNavbar from '../Headers/UserNavbar';

const AlquilerList = () => {

	const [alquileres, setAlquileres] = useState([]);
	const [error, setError] = useState(null);

	const getAlquileres = async () => {
		try {
			const response = await axios.get('/api/alquileres');
			setAlquileres(response.data);

		}
		catch(error) {
			console.log('Error al obtener los alquileres', error);
			setError('No se pudo cargar la lista de alquileres');
		}
	}

	useEffect( () => {
		getAlquileres();
	}, []);

	return (

		<div>

			<UserNavbar></UserNavbar>

			<Box p={3}>

				<Typography variant="h4" mb={2} textAlign="center">
					Vehiculos Alquilados
				</Typography>

				{error ? (
					<Typography color="error">{error}</Typography>
				) : (
					<Grid2 container spacing={3}>

						{
							alquileres.map( (alquiler) => (
								<Grid2 xs={12} md={6} lg={4} key={alquiler._id}>
									<Card>

										<CardContent>

											<Typography variant="h6">
												{alquiler.vehiculo.marca} - {alquiler.vehiculo.modelo}
											</Typography>

											<Typography>
												Color: {alquiler.vehiculo.color} | Año: {alquiler.vehiculo.año}
											</Typography>

											<Typography>
												Costo por día: {alquiler.vehiculo.costoDia.toLocaleString()} Gs.
											</Typography>

											<Typography>
												Fecha Prestamo: { new Date(alquiler.fechaPrestamo).toLocaleDateString()}
											</Typography>

											<Typography>
												Fecha Devolucion: { new Date(alquiler.fechaDevolucion).toLocaleDateString()}
											</Typography>

										</CardContent>

									</Card>

								</Grid2>
							))
						}
					</Grid2>
				)

				}
			</Box>

		</div>
	);
};

export default AlquilerList;