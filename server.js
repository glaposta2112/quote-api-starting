const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuoteObject = getRandomElement(quotes);
    const returnObject = {
        quote: randomQuoteObject
    };
    res.send(returnObject);
});

app.get('/api/quotes', (req, res, next) => {
    const returnObject = {
        quotes: quotes
    };
    res.send(returnObject);
});

app.post('/api/quotes', (req, res, next) => {
    const reqBodyQuote = req.query.quote;
    const reqBodyPerson = req.query.person;
    const newId = quotes[quotes.length-1].id + 1;
 
    const newObject = {
        id: newId,
        quote: reqBodyQuote,
        person: reqBodyPerson
    }

    if(!reqBodyQuote || !reqBodyPerson) {
        res.status(400).send();
    }
    else {
        quotes.push(newObject);
        res.send({quote: newObject});
    }
});

app.put('/api/quotes/:id/quote', (req, res, next) => {
    const paramId = req.params.id;
    const quote = req.query.quote;
    const person = req.query.person;

    newObject = {
        id: paramId,
        quote: quote,
        person: person
    };

    quotes[paramId] = newObject;
    res.send(quotes[paramId]);
});

app.delete('/api/quotes/:id', (req, res, next) => {
    const id = req.params.id;
 
    const index = quotes.indexOf(quotes.find(neededQuote => neededQuote.id === id));
    console.log(index);

    if(index !== -1){
        quotes.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send();
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

