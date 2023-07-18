const mockCoworkings = require('./mock-coworkings'); // Importation du module "mock-coworkings"
const express = require('express'); // Importation du module Express
const morgan = require('morgan')
const app = express(); // Création de l'instance de l'application Express
const port = 3000; // Port sur lequel l'application écoutera les requêtes

app.use(morgan('dev'))
app.use(express.json()); // Middleware pour gérer le corps des requêtes au format JSON

// Endpoint pour récupérer un coworking par son ID
app.get('/api/coworkings/:id', (req, res) => {
    let targetCoworking = mockCoworkings.find(el => el.id === parseInt(req.params.id));

    if (targetCoworking) {
        return res.json({ message: `L'élément ayant pour ID ${targetCoworking.id} a bien été récupéré.`, data: targetCoworking });
    } else {
        return res.json({ message: `L'élément ayant pour ID ${req.params.id} n'a pas pu être récupéré.` });
    }
});

// Endpoint pour récupérer la liste des coworkings
app.get('/api/coworkings', (req, res) => {
    const criterium = req.query.criterium ? req.query.criterium : 'superficy';
    const orderBy = req.query.orderBy || 'ASC';
    const arrToSort = [...mockCoworkings];
    const nosort = req.query.nosort;

    if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {
        arrToSort.sort((a, b) => {
            return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium];
        });
    }

    res.json({ message: 'La liste des coworkings a bien été récupérée.', data: arrToSort });
});

// Endpoint pour ajouter un nouveau coworking
app.post('/api/coworkings', (req, res) => {
    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1;
    const newCoworking = { id: newId, ...req.body };
    mockCoworkings.push(newCoworking);
    return res.json({ message: `Un nouveau coworking n°${newCoworking.name} a été créé.`, data: newCoworking });
});

// Endpoint pour mettre à jour un coworking par son ID
app.put('/api/coworkings/:id', (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id);
    });

    if (indexInArray === -1) {
        return res.json({ message: `Le coworking ${req.params.id} n'existe pas.` });
    } else {
        let updatedCoworking = { ...mockCoworkings[indexInArray], ...req.body };
        mockCoworkings[indexInArray] = updatedCoworking;

        return res.json({ message: `Le coworking ${updatedCoworking.name} a été modifié.`, data: updatedCoworking });
    }
});

// Endpoint pour supprimer un coworking par son ID
app.delete('/api/coworkings/:id', (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id);
    });

    if (indexInArray === -1) {
        return res.json({ message: `L'ID ${req.params.id} ne correspond à aucun élément.` });
    } else {
        const deletedCoworking = mockCoworkings.splice(indexInArray, 1);
        return res.json({ message: `L'élément ID ${req.params.id} a bien été supprimé.`, data: deletedCoworking[0] });
    }
});

// Démarrage de l'application sur le port spécifié
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


// INDEX : 
// Ce code est une application Express qui expose plusieurs endpoints pour gérer les opérations CRUD (Create, Read, Update, Delete) sur une liste de coworkings.

// Le premier endpoint GET /api/coworkings/:id permet de récupérer un coworking par son ID.
// Le deuxième endpoint GET /api/coworkings permet de récupérer la liste des coworkings avec des options de tri.
// Le troisième endpoint POST /api/coworkings permet d'ajouter un nouveau coworking à la liste.
// Le quatrième endpoint PUT /api/coworkings/:id permet de mettre à jour un coworking par son ID.
// Le dernier endpoint DELETE /api/coworkings/:id permet de supprimer un coworking par son ID.
// Chaque endpoint renvoie une réponse JSON contenant un message et les données correspondantes.