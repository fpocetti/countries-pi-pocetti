const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Country',
		{
			id: {
				type: DataTypes.STRING(3),
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			flag: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			continent: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			capital: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			subregion: DataTypes.STRING,
			area: DataTypes.DECIMAL,

			population: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
