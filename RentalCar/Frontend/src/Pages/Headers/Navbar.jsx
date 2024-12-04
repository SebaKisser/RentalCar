import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {

	return (
		<AppBar position='static'>

			<Toolbar>

				<Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
					Rental Cars
				</Typography>

				<Box sx={{ display: 'flex', gap: 2}}>

					<Button color='inherit' component={Link} to='/'>
						Registro
					</Button>

					<Button color='inherit' component={Link} to='/login'>
						Login
					</Button>

				</Box>

			</Toolbar>

		</AppBar>
	);
};

export default Navbar;