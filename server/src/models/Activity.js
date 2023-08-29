const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Activity',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			difficulty: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
			duration: DataTypes.TIME,
			season: {
				type: DataTypes.ENUM,
				values: ['Spring', 'Summer', 'Autumn', 'Winter'],
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
