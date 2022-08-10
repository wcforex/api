const Package = require('../models/Package')

const getPackages = async (req, res) => {
    const packages = await Package.find();
    res.status(200).json({ error:null, packages })
}

const getPackage = async (req, res) => {
    const id = req.params.id;
    const package = await Package.findById(id)
    res.status(200).json({package})
}

const createPackage = async (req, res) => {
    try {
        const {name, maxDeposite, minDeposite, duration, interestRatePerDay, interestRatePerWeek, interestRatePerMonth, interestRate, status} = req.body;
        const package = await Package.create({
            name, 
            maxDeposite, 
            minDeposite, 
            duration,
            interestRatePerDay, 
            interestRatePerWeek, 
            interestRatePerMonth, 
            interestRate, 
            status
        });
        if (package) {
            res.status(201).json({error: null, data: package})
        }
    } catch (error) {
        console.log(error)
    }
}

const updatePackage = async (req, res) => {
    try {
        const id = req.params.id;
        const package = await Package.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({ package })
    } catch (error) {
        console.log(error)
    } 
}

const deletePackage = async (req, res) => {
    try {
        const id = req.params.id;
        await Package.findByIdAndDelete(id)
        res.status(200).json({ error: null, msg: 'Package deleted successfully' })
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {getPackages, getPackage, createPackage, updatePackage,deletePackage }