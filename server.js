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
    const newObject = {
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

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

