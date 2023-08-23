const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const STEP = sequelize.define("step", {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    step: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        max: 100,
        min: 0,
      },
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
  });
};
