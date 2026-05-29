const express = require('express');

const router = express.Router();

const {
    getFollowers,
    getSnapshots,
    scrapeInstagramFollowers
} = require('../controllers/igController');

router.get('/followers', getFollowers);

router.get('/snapshots', getSnapshots);
router.get('/scrape', scrapeInstagramFollowers);

module.exports = router;