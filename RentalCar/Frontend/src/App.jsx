import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VehiculosList from './Pages/Vehiculos/VehiculosList';
import Register from './Pages/Session/Register';
import Login from './Pages/Session/Login';
import AddVehicle from './Pages/Vehiculos/AddVehicle';
import AlquilerForm from './Pages/Alquiler/AlquilerForm';
import AlquilerList from './Pages/Alquiler/AlquilerList';
import EditVehicle from './Pages/Vehiculos/EditVehicle';
import UserList from './Pages/User/UserList';

const App = () => {

	return (
		<BrowserRouter>
		
		<Routes>
			
			<Route path='/' element={<Register></Register>}></Route>
			<Route path='/login' element={<Login></Login>}></Route>
			<Route path='/vehicles' element={<VehiculosList></VehiculosList>}></Route>
			<Route path='/vehicles/add' element={<AddVehicle></AddVehicle>}></Route>
			<Route path='/vehicles/:id' element={<AlquilerForm></AlquilerForm>}></Route>
			<Route path='/vehicles/edit/:id' element={<EditVehicle></EditVehicle>}></Route>
			<Route path='/alquileres' element={<AlquilerList></AlquilerList>}></Route>
			<Route path='/users' element={<UserList></UserList>}></Route>

		</Routes>

		</BrowserRouter>
	)
}

export default App;