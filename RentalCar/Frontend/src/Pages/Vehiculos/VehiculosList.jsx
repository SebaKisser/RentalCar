import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Grid2, Box, CircularProgress, TextField } from '@mui/material';
import UserNavbar from '../Headers/UserNavbar';
import { useNavigate } from 'react-router-dom';

const VehiculosList = () => {

	const [vehiculos, setVehiculos] = useState([]);
	//Estado para filtrar los vehiculos
	const [filteredVehiculos, setFilteredVehiculos] = useState([]);
	//Estado para filtrar las busquedas en el input
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const getVehiculos = async () => {

		try {
			const response = await axios.get('/api/vehiculos');
			const data =  response.data;
			
			setVehiculos(data);
			setLoading(false);
		}
		catch(error) {
			console.log('Error al obtener los datos', error);
			setLoading(false);
		}
	}

	//Obtiene los vehiculos de la API al montarse el componente
	useEffect( () => {
		getVehiculos();
	}, []);

	//Aqui cargamos los vehiculos filtrados
	useEffect( () => {

		if (search.trim() === '') {
			setFilteredVehiculos(vehiculos);
		}
		else {
			//Filtramos los vehiculos por tipo, modelo, marca
			const filtered = vehiculos.filter( (vehiculo) => 
				[vehiculo.tipo, vehiculo.marca, vehiculo.modelo]
				.join(' ')
				.toLowerCase()
				.includes(search.toLowerCase())
			);
			setFilteredVehiculos(filtered);
		}
	}, [search, vehiculos]);

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	if (loading) {
		return (
			<Box sx = {{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
				<CircularProgress></CircularProgress>
			</Box>
		);
	};


	return (

		<div>

			<UserNavbar></UserNavbar>

			{/* SearchInput */}
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}>

				<TextField
					label= 'Buscar vehiculos'
					variant= 'outlined'
					value= {search}
					onChange= {handleSearchChange}
					placeholder='Busca por tipo, marca o modelo...'
					sx={{ width: '50%' }}
				></TextField>

			</Box>

			<Box sx = {{ flexGrow: 1, padding: 3}}>

				<Grid2 container spacing={4}>

					{
						filteredVehiculos.length > 0 ? (

							filteredVehiculos.map( (vehiculo) => (

								<Grid2 xs={12} sm={6} md={4} key={vehiculo._id}>

									<Card sx = {{ maxWidth: 345 }}>

										<CardMedia	
											component='img'
											height='200'
											image={vehiculo.imagen}
											alt={`${vehiculo.marca}`}
										></CardMedia>

										<CardContent>

											<Typography variant='h6' component='div'>
												{vehiculo.marca} - {vehiculo.modelo} - {vehiculo.color}
											</Typography>

											<Typography variant='body2'>
												Año: {vehiculo.año}
											</Typography>

											<Typography variant='body2'>
												Alquiler/dia: {vehiculo.costoDia.toLocaleString()} Gs.
											</Typography>

											<Button
												variant='contained'
												color='primary'
												sx = {{ marginTop: 2 }}
												onClick={() => navigate(`/vehicles/${vehiculo._id}`)}
												fullWidth
											>
												Alquilar
											</Button>

											<Button
												variant='contained'
												color='secondary'
												sx = {{ marginTop: 2 }}
												onClick={() => navigate(`/vehicles/edit/${vehiculo._id}`)}
												fullWidth
											>
												Editar
											</Button>

										</CardContent>

									</Card>
								
								</Grid2>
							))
						) : (
							<Typography variant='h6' component='div'>
								No se encontraron vehiculos
							</Typography>
						)
					}

				</Grid2>

			</Box>

		</div>
	);
};

export default VehiculosList;