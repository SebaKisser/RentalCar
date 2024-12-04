import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import UserNavbar from "../Headers/UserNavbar";

const UserList = () => {

	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		try {
			const response = await axios.get('/api/users');
			setUsers(response.data);
		}
		catch(error) {
			console.log('Error al obtener users',  error);
		}
	};

	const deleteUser = async(id) => {	
		
		if (window.confirm('Eliminar usuario?')) {
			try {
				await axios.delete(`/api/users/${id}`);
				setUsers(users.filter( (user) => user._id !== id));
			}
			catch(error) {
				console.log('Error al eliminar el usuario', error);
			}
		}
	};

	useEffect( () => {
		getUsers();
	}, []);


	return (
		<div>

			<UserNavbar></UserNavbar>

			<Box sx={{ maxWidth: '80%', margin: '20px auto' }}>

				<Typography variant="h4" component="h1" gutterBottom>
					Lista de Usuarios de la Aplicacion
				</Typography>

				<TableContainer component={Paper}>

					<Table>

						<TableHead>

							<TableRow>

								<TableCell>ID</TableCell>
								<TableCell>Nombre</TableCell>
								<TableCell>Apellido</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Eliminar</TableCell>

							</TableRow>

						</TableHead>

						<TableBody>

							{
								users.map( (user) => (

									<TableRow key={user._id}>

										<TableCell>{user._id}</TableCell>
										<TableCell>{user.nombre}</TableCell>
										<TableCell>{user.apellido}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>
											<Button
												variant="contained"
												color="error"
												onClick={() => deleteUser(user._id)}
											>
												Eliminar
											</Button>
										</TableCell>

									</TableRow>
								))
							}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</div>
	);
};

export default UserList;