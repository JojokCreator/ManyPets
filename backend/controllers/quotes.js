import mongoose from 'mongoose';
import quoteSchema from '../models/postQuote.js';
import fetch from 'node-fetch';
//Gets all quotes
export const getQuotes = async (req, res) => {
  try {
    const quotes = await quoteSchema.find();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//creates a new quote
export const createQuote = async (req, res) => {
  const quote = req.body;
  console.log('quote', quote);
  const newQuote = new quoteSchema({
    ...quote,
    createdAt: new Date().toISOString(),
  });

  try {
    let dogFetch = await fetch('https://api.thedogapi.com/v1/breeds/');
    let dogData = await dogFetch.json();

    let findBreed = dogData.filter(
      (item) => item.name.toLowerCase() === quote.breedType.toLowerCase()
    );
    if (findBreed.length === 0) {
      return res
        .status(400)
        .json({ message: 'Please enter a valid dog breed' });
    }

    let postCodeFetch = await fetch(
      `https://api.postcodes.io/postcodes/${quote.postcode}`
    );
    let postcodeData = await postCodeFetch.json();
    console.log(postcodeData);
    if (postcodeData.status === 404) {
      return res.status(400).json({ message: 'Please enter a valid Postcode' });
    }
    console.log(newQuote);
    newQuote.address = {
      city: postcodeData.result.parish,
      postcode: quote.postcode,
    };
    newQuote.quotationCost = getQuote({
      age: newQuote.age,
      city: newQuote.address.city,
      breed: newQuote.breed,
    });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//gets a quote by email address (adds multiple discount)
export const getQuoteByQuery = async (req, res) => {
  const query = req.params.query;
  try {
    const quotes = await quoteSchema.find({ email: query });
    // need to add multiple pet discount here!
    let multiQuotePrice = 0;
    if (quotes.length > 1) {
      multiQuotePrice = quotes.reduce((total, quote) => {
        let discount = (10 / 100) * quote.quotationCost;
        return total + (quote.quotationCost - discount);
      }, 0);
    }
    res.status(200).json(quotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create the quote
function getQuote(pet) {
  // constants
  const PRICE_MONTH = 10;
  const DISCOUNTED_BREEDS = ['Akita', 'Bull Terrier', 'Pug'];
  const POSTCODE_INCREASE = ['London', 'Leicester', 'Derby'];

  // separate the number of years and the leftover number of months
  let monthsOld = pet.age % 12;
  let yearsOld = pet.age > 11 ? (pet.age - monthsOld) / 12 : 0;

  // init the quote with base price
  let quote = PRICE_MONTH * pet.age;

  // increase per year 5% 1-5 and 10% 6-10
  if (pet.age > 11) {
    const discTen =
      yearsOld > 5 && yearsOld < 11 ? yearsOld - 5 : yearsOld > 10 ? 5 : 0;
    const discFive = yearsOld < 5 ? yearsOld : 5;

    quote += +((5 / 100) * (PRICE_MONTH * 12) * discFive).toFixed(2);
    quote += +((10 / 100) * (PRICE_MONTH * 12) * discTen).toFixed(2);
  }

  // check for area price increase
  if (POSTCODE_INCREASE.includes(pet.city)) {
    quote += +((15 / 100) * quote).toFixed(2);
  }

  // discount for pet breed
  if (DISCOUNTED_BREEDS.includes(pet.breed)) {
    quote -= +((10 / 100) * quote).toFixed(2);
  }

  return quote;
}
