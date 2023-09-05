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
				unique: true,
			},
			difficulty: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 1,
					max: 5,
				},
			},
			duration: DataTypes.DECIMAL,
			seasons: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				//values: ['Spring', 'Summer', 'Autumn', 'Winter'],
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
