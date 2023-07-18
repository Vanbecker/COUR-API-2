const mockCoworkings = require('./mock-coworkings'); // Importation du module "mock-coworkings"
const express = require('express'); // Importation du module Express
const morgan = require('morgan')
const app = express(); // Création de l'instance de l'application Express
const port = 3000; // Port sur lequel l'application écoutera les requêtes


app.use(morgan('dev'))
app.use(express.json())

const coworkingRouter = require('./routes/coworkingRoutes')
app.use('/api/coworkings', coworkingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

