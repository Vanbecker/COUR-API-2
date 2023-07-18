const Coworking = sequelize.define('Coworking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: DataTypes.STRING,
    price: DataTypes.JSON,
    address: DataTypes.JSON,
    picture: DataTypes.STRING,
    superficy: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    created: DataTypes.DATE


})