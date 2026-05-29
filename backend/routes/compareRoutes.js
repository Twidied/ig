const express = require('express');

const router = express.Router();

const {
    compareSnapshots
} = require('../controllers/compareController');

router.get('/', compareSnapshots);

module.exports = router;