const { Diet } = require("../db");

const getDBByDiet = async() => {
    const diets = [
        "gluten free",
        "ketogenic",
        "paleolithic", 
        "vegetarian", 
        "lacto-vegetarian",
        "ovo-vegetarian",
        "vegan",
        "pescetarian",
        "primal",
        "whole 30", 
        "fodmap friendly",
        "dairyFree"  
    ];

diets.forEach((element) => {
    Diet.findOrCreate({
        where: { name: element }
    });
})

const allDiets = await Diet.findAll();
return allDiets;

};

module.exports = {
    getDBByDiet,
};


//