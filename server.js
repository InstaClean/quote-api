const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('listening in...')
})

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = { quote: getRandomElement(quotes)}
  
    res.send(randomQuote)
  })

app.get('/api/quotes', (req, res, next) => {
    
    const person = req.query.person

    if (person) {
        const quoteList = quotes.filter( quote => quote.person === person)
        res.send({quotes: quoteList})
    } else {
        res.send({quotes: quotes})
    }
})

app.post('/api/quotes', (req, res, next) => {
    const quote = req.query.quote
    const person = req.query.person
    if (quote && person) {
        quotes.push({
            quote:  quote,
            person: person     
        })

        res.status(201).send({quote: {
            quote:  quote,
            person: person     
        }})
    } else {
        res.status(400).send()
    }
})

