const mockCoworkings = require('./mock-coworkings'); // Importation du module "mock-coworkings"
const express = require('express'); // Importation du module Express
const morgan = require('morgan')
const app = express(); // Création de l'instance de l'application Express
const port = 3000; // Port sur lequel l'application écoutera les requêtes

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('coworking', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(`Impossible de se connecter à la base de données : ${error}`));


const User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
});

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

sequelize
    .sync({ force: true })
    .then(() => {
        mockCoworkings.forEach((coworking) => {
            Coworking.create({
                name: coworking.name,
                price: coworking.price,
                address: coworking.address,
                picture: coworking.picture,
                superficy: coworking.superficy,
                capacity: coworking.capacity,
                created: coworking.created
            });
        });
    });





app.use(morgan('dev'))
app.use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')
app.use('/api/coworkings', coworkingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// STRING : pour les chaînes de caractères.
// INTEGER : pour les nombres entiers.
// FLOAT : pour les nombres à virgule flottante.
// DOUBLE : pour les nombres en double précision.
// BOOLEAN : pour les valeurs booléennes.
// DATE : pour les dates et heures.
// Le type de données JSON en JavaScript fait référence à JavaScript Object Notation, qui est un format de données textuelles largement utilisé pour représenter des objets et des structures de données. En JavaScript, un objet JSON est une collection de paires clé-valeur, où les clés sont des chaînes de caractères et les valeurs peuvent être de différents types de données, y compris d'autres objets JSON.