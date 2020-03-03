const express = require('express');

const router = express.Router();

const TrailerController = require('../controllers/trailers.controller');

router.get('/', TrailerController.getTrailers);

module.exports = router;
