const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "recipe",
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
            },
            summary: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            healthScore: {
                type: DataTypes.FLOAT,
                allowNull: true, 
            },
            types: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
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