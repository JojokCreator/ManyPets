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

  const newQuote = new quoteSchema({
    ...quote,
    quotationCost: 100, //Carlos magic here
  });

  try {
    let dogFetch = await fetch('https://api.thedogapi.com/v1/breeds/');
    let dogData = await dogFetch.json();

    let findBreed = dogData.filter(
      (item) => item.name.toLowerCase() === quote.breed.toLowerCase()
    );
    if (findBreed.length === 0) {
      return res
        .status(400)
        .json({ message: 'Please enter a valid dog breed' });
    }

    let postCodeFetch = await fetch(
      `https://api.postcodes.io/postcodes/${quote.address.postcode}`
    );
    let postcodeData = await postCodeFetch.json();
    console.log(postcodeData);
    if (postcodeData.status === 404) {
      return res.status(400).json({ message: 'Please enter a valid Postcode' });
    }
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
    res.status(200).json(quotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
