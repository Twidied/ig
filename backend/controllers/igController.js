const scrapeInstagramFollowers = async (req, res) => {

    try {

        const followers = await scrapeFollowers();

        const insertSnapshotQuery = `
            INSERT INTO snapshots (ig_username)
            VALUES (?)
        `;

        connection.query(
            insertSnapshotQuery,
            [process.env.IG_USERNAME],
            (error, snapshotResult) => {

                if (error) {

                    return res.status(500).json({
                        error: error.message
                    });

                }

                const snapshotId = snapshotResult.insertId;

                followers.forEach((username) => {

                    const insertFollowerQuery = `
                        INSERT INTO followers
                        (
                            snapshot_id,
                            follower_username
                        )
                        VALUES (?, ?)
                    `;

                    connection.query(
                        insertFollowerQuery,
                        [snapshotId, username]
                    );

                });

                res.json({
                    message: 'Snapshot guardado',
                    snapshotId,
                    totalFollowers: followers.length
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};