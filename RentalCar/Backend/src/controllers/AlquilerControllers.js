import Alquiler from "../models/AlquilerModels.js";
import Vehicle from "../models/VehicleModels.js";

const alquilar = async (req, res) => {

	const { vehiculo, fechaPrestamo, fechaDevolucion } = req.body;

	try {

		const data = new Alquiler({
			vehiculo,
			fechaPrestamo,
			fechaDevolucion
		});

		//Guardamos el vehiculo nuevo en la base de datos
		await data.save();

		//Actualizamos la disponibilidad
		await Vehicle.findByIdAndUpdate(vehiculo, { disponible: false });

		res.status(201).json(data);
	}
	catch(error) {
		console.log(error);
		return res.status(500).json( {message: 'Error al procesar el alquiler'});
	}
};

const getAlquileres = async (req, res) => {

	try {
		const alquileres = await Alquiler.find().populate('vehiculo', 'marca modelo color año chapa costoDia');

		if (alquileres.length === 0) {
			return res.status(404).json({ message: 'No hay vehiculos alquilados'});
		}

		res.status(200).json(alquileres);
	}
	catch(error) {
		console.log('Error al obtener los alquileres', error);
		res.status(500).json({ message: 'Error interno del servidor' });
	}
}

const deleteAlquilerById = async (req, res) => {
	try {
		const { id } = req.params;
		const element = await Alquiler.findByIdAndDelete(id);

		if (!element) {
            res.status(404).json("NOT FOUND");
            return;
        }

        res.status(200).json(element);
        return;

	} catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
};

export default { alquilar, getAlquileres, deleteAlquilerById };