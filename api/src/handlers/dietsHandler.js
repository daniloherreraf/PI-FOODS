const { getDBByDiet } = require("../controllers/dietsController");

const getDietsHandler = async (req, res) => {
    
    try {
        const createDiets = await getDBByDiet();
        res.status(200).json(createDiets)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

module.exports = {
    getDietsHandler,
};
    