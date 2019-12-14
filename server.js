// node -r esm server.js

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let Recipes = [
    {
        id: 1,
        ingredients: [{
            name: "Banan",
            amount: "4"
        },
        {
            name: "Cukier",
            amount: "3/4 szklanki"
        },
        {
            name: "Jajko",
            amount: "1"
        }
        ],
        title: "Ciasto bananowe bez pieczenia",
        url: "http://najsmaczniejsze.pl/wp-content/uploads/2011/05/ciasto-bananowe.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a porttitor lacus. Ut tincidunt blandit justo eget vulputate. Maecenas felis risus, pellentesque et augue commodo, laoreet tempor orci. Nullam quis justo ut quam consequat sollicitudin nec vitae lectus. Morbi magna lectus, dignissim ut varius ac, consequat et eros. Donec porttitor vel nibh et ultricies. Mauris ac massa nec tortor blandit bibendum ut sit amet eros. Morbi pulvinar erat at neque posuere, et pretium elit tristique."
    },
    {
        id: 2,
        ingredients: [{
            name: "Makaron",
            amount: "300g"
        },
        {
            name: "Sos spaghetti",
            amount: "1 opakowanie"
        },
        {
            name: "Pomidory",
            amount: "2"
        }
        ],
        title: "Spaghetti z makaronem",
        url: "https://s3.przepisy.pl/przepisy3ii/img/variants/1440x1080/proste-spaghetti-bolognese.jpg",
        description: "Pellentesque faucibus magna eget felis vestibulum, sed mattis lectus ultrices. Praesent ac pellentesque sapien, varius pulvinar erat. Maecenas et nibh ut turpis auctor fringilla in a est. Etiam vehicula, purus ut varius pulvinar, ipsum mauris tincidunt eros, eu interdum augue lacus sit amet ante. Vestibulum euismod nunc ut velit feugiat imperdiet. Maecenas mattis ex nec augue venenatis luctus. Quisque leo dolor, molestie non luctus sit amet, congue eu turpis. Vivamus a accumsan augue, posuere ultricies libero. Proin consequat nisi sed aliquam posuere. Sed a tristique arcu."
    },
    {
        id: 3,
        ingredients: [{
            name: "Mąka pszenna",
            amount: "150g"
        },
        {
            name: "Mleko",
            amount: "350ml"
        },
        {
            name: "Jajko",
            amount: "2"
        }
        ],
        title: "Naleśniki z serem",
        url: "https://www.kwestiasmaku.com/sites/kwestiasmaku.com/files/nalesniki_cienkie_01.jpg",
        description: "Pellentesque faucibus magna eget felis vestibulum, sed mattis lectus ultrices. Praesent ac pellentesque sapien, varius pulvinar erat. Maecenas et nibh ut turpis auctor fringilla in a est. Etiam vehicula, purus ut varius pulvinar, ipsum mauris tincidunt eros, eu interdum augue lacus sit amet ante. Vestibulum euismod nunc ut velit feugiat imperdiet. Maecenas mattis ex nec augue venenatis luctus. Quisque leo dolor, molestie non luctus sit amet, congue eu turpis. Vivamus a accumsan augue, posuere ultricies libero. Proin consequat nisi sed aliquam posuere. Sed a tristique arcu."
    },
    {
        id: 4,
        ingredients: [{
            name: "Jajko",
            amount: "3"
        },
        {
            name: "Pomidor",
            amount: "3/4 sztuki"
        },
        {
            name: "Cebula",
            amount: "1/4 sztuki"
        }
        ],
        title: "Jajecznica",
        url: "https://www.zajadam.pl/wp-content/uploads/2015/11/jajecznica-3-2-891x500.jpg",
        description: "Pellentesque faucibus magna eget felis vestibulum, sed mattis lectus ultrices. Praesent ac pellentesque sapien, varius pulvinar erat. Maecenas et nibh ut turpis auctor fringilla in a est. Etiam vehicula, purus ut varius pulvinar, ipsum mauris tincidunt eros, eu interdum augue lacus sit amet ante. Vestibulum euismod nunc ut velit feugiat imperdiet. Maecenas mattis ex nec augue venenatis luctus. Quisque leo dolor, molestie non luctus sit amet, congue eu turpis. Vivamus a accumsan augue, posuere ultricies libero. Proin consequat nisi sed aliquam posuere. Sed a tristique arcu."
    },
    {
        id: 5,
        ingredients: [{
            name: "Ryż",
            amount: "1 opakowanie"
        },
        {
            name: "Pierś z kurczaka",
            amount: "250g"
        },
        {
            name: "Cebula",
            amount: "1 sztuka"
        }
        ],
        title: "Ryż z kurczakiem",
        url: "https://s3.przepisy.pl/przepisy3ii/img/variants/767x0/smazony-ryz-z-kurczakiem-i-morelami.jpg",
        description: "Pellentesque faucibus magna eget felis vestibulum, sed mattis lectus ultrices. Praesent ac pellentesque sapien, varius pulvinar erat. Maecenas et nibh ut turpis auctor fringilla in a est. Etiam vehicula, purus ut varius pulvinar, ipsum mauris tincidunt eros, eu interdum augue lacus sit amet ante. Vestibulum euismod nunc ut velit feugiat imperdiet. Maecenas mattis ex nec augue venenatis luctus. Quisque leo dolor, molestie non luctus sit amet, congue eu turpis. Vivamus a accumsan augue, posuere ultricies libero. Proin consequat nisi sed aliquam posuere. Sed a tristique arcu."
    }
];

app.get('/Recipes', function (req, res) {
    res.send(Recipes);
})

app.get('/Recipes/:title', function (req, res) {
    let titleParam = req.params.title;
    let newArray = [];
    Recipes.map((el) => {
        if (el.title.toUpperCase().toString().includes(titleParam.toUpperCase())) {
            newArray.push(el);
        }

    })
    if (newArray)
        return res.send(newArray);

    res.status(304).send({ err: 304 });
})


app.post('/Recipes', (req, res) => {
    const Recipe = req.body;
    Recipe['ingredients'] = [];
    let dupl = false;
    Recipes.forEach(el => {
        if (el.title === Recipe.title) {
            res.sendStatus(304);
            dupl = true;
        }
    })
    if (!dupl) {
        Recipes.push(Recipe);
        res.send(Recipe);
    }
})

app.put('/Recipes', (req, res) => {
    const Recipe = req.body;
    let present = false;
    Recipes.map((el, index, tab) => {
        if (el.id === Recipe.id) {
            tab[index].title = Recipe.title;
            tab[index].url = Recipe.url;
            tab[index].description = Recipe.description;
            tab[index].ingredients = Recipe.ingredients;
            res.send(tab[index]);
            present = true;
        }
    });
    if (!present) res.sendStatus(304);
});

app.delete('/Recipes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let idx;
    let deleted = false;
    Recipes.map(el => {
        if (el.id === id) {
            idx = Recipes.indexOf(el);
            Recipes.splice(idx, 1);
            res.send(el);
            deleted = true;
        }
    });
    if (!deleted) res.sendStatus(304);
})

app.listen(8080, () =>
    console.log('Server listening on port 8080!')
);