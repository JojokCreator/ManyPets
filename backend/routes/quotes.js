import express from "express";

import { getQuotes, createQuote, getQuoteByQuery } from "../controllers/quotes.js"

const router = express.Router();

router.get("/", getQuotes);
router.post("/", createQuote);
router.get("/:query", getQuoteByQuery);

export default router;