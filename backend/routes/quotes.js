import express from "express";

import { getQuotes } from "../controllers/quotes.js"

const router = express.Router();

router.get("/search", getQuotes);

export default router;