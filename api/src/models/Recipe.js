const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Recipe",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isAlpha: true,
                } 
            },
            summary: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            healthScore: {
                type: DataTypes.FLOAT,
                allowNull: true,
                validate: {
                    min: 1,
                    max: 100
                  }  
            },
            score: {
                type: DataTypes.FLOAT
              },
            steps: {
                type: DataTypes.TEXT,
                allowNull: true, 
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdInDb: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {timestamps: false }
    );
        
};