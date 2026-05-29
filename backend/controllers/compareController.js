const compareSnapshotsService = require(
    '../services/compareService'
);

const compareSnapshots = async (req, res) => {

    try {

        const oldSnapshot = req.query.old;
        const newSnapshot = req.query.new;

        const result = await compareSnapshotsService(
            oldSnapshot,
            newSnapshot
        );

        res.json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};

module.exports = {
    compareSnapshots
};