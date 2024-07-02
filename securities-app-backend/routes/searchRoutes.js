const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/search', async (req, res) => {
  const {
    fromDate,
    toDate,
    portfolioNumber,
    shareSymbol,
    securityCurrency
  } = req.body;

  if (!fromDate || !toDate) {
    return res.status(400).json({ message: 'From Date and To Date are required.' });
  }

  try {
    let query = {
      where: {
        TRADE_DATE: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate)
        }
      }
    };

    if (portfolioNumber) {
      query.where.SECURITY_ACCOUNT = portfolioNumber;
    }
    if (shareSymbol) {
      query.where.SECURITY_NUMBER = shareSymbol;
    }
    if (securityCurrency) {
      query.where.SECURITY_CURRENCY = securityCurrency;
    }

    const results = await db.SecurityTransaction.findAll(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while searching.', error });
  }
});

module.exports = router;
