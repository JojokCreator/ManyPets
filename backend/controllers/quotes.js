import mongoose from 'mongoose'
import quoteSchema from '../models/postQuote.js'

//Gets all quotes
export const getQuotes = async (req, res) => {
  try {
    const quotes = await quoteSchema.find()
    res.status(200).json(quotes)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//creates a new quote
export const createQuote = async (req, res) => {
  const quote = req.body
  const newQuote = new quoteSchema({
    ...quote,
    quotationCost: 100 //Carlos magic here
  })

  try {
    // address validatiom
    // breed validation
    await newQuote.save()
    res.status(201).json(newQuote)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//gets a quote by email address (adds multiple discount)
export const getQuoteByQuery = async (req, res) => {
  const query = req.params.query;
  try {
    const quotes = await quoteSchema.find({ 'email': query})
    // need to add multiple pet discount here!
    res.status(200).json(quotes)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

