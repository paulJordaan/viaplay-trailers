const express = require('express');
const TrailersRoutes = require('./trailers/routes');

const router = express.Router();

router.use('/trailers', TrailersRoutes);

module.exports = router;
