import Vehicle from "../models/VehicleModels.js";

const create = async (req, res) => {
    try {
        const data = req.body;
        const newElement = await Vehicle.create(data);
        res.status(201).json(newElement);
        return;
		
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
};

const findAll = async (req, res) => {
    try {
        const elements = await Vehicle.find();
        res.status(200).json(elements);
        return;

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
};

const findById = async (req, res) => {
    try {
        const {id} = req.params;
        const element = await Vehicle.findById(id);

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

const updateById = async (req, res) => {
    try {
        const data = req.body;
        const {id} = req.params;
        const element = await Vehicle.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

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

const deleteById = async (req, res) => {
    try {
        const {id} = req.params;
        const element = await Vehicle.findByIdAndDelete(id);

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


export default {create, findAll, findById, updateById, deleteById};