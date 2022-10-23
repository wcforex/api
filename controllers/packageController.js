const Package = require('../models/Package')

const getPackages = async (req, res) => {
    const packages = await Package.find();
    res.status(200).json({ packages })
}

const getPackage = async (req, res) => {
    const id = req.params.id;
    const package = await Package.findById(id)
    res.status(200).json({ package })
}

const createPackage = async (req, res) => {
    const { name, maxDeposite, minDeposite, duration, interestRatePerDay, interestRate, status } = req.body;
    try {

        const package = await Package.create({
            name,
            maxDeposite,
            minDeposite,
            duration,
            interestRatePerDay,
            interestRate,
            status
        });

        res.status(201).json({ package })
    } catch (error) {
        console.log(error)
    }
}

const updatePackage = async (req, res) => {
    try {
        const id = req.params.id;
        const package = await Package.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ package })
    } catch (error) {
        console.log(error)
    }
}

const deletePackage = async (req, res) => {
    try {
        const id = req.params.id;
        await Package.findByIdAndDelete(id)
        res.status(200).json({ message: 'Package deleted successfully' })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getPackages, getPackage, createPackage, updatePackage, deletePackage }