const Outlet = require("../module/Outlet");


const addOutlet = async (req, res, next) => {
    try {
        const { name, description } = req.body;

    const response = await new Outlet({ name, description }).save();

    res.status(200).json({ message: "added outlet", response });    
    } catch (e) {
        res.status(500).json({ message: "something went wrong" });
    }
    
}

const fetchAllOutlet = async (req, res, next) => {
    try {
        const response = await Outlet.find({ isActive: true });

        res.status(200).json({ message: "outlet fetched", response });
    } catch (e) {
        res.status(500).json({message:"something went wrong"})
    }
}

module.exports = {
    addOutlet,
    fetchAllOutlet
}