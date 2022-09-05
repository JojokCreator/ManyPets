import express from 'express';

import {
  getQuotes,
  createQuote,
  getQuoteByQuery,
  getQuotesToday,
} from '../controllers/quotes.js';

const router = express.Router();

router.get('/', getQuotes);
router.post('/', createQuote);
router.get('/:query', getQuoteByQuery);
router.get('/todays/quotes', getQuotesToday);

export default router;
