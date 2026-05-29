const connection = require('../config/db');

const compareSnapshotsService = (oldId, newId) => {

    return new Promise((resolve, reject) => {

        const oldQuery = `
            SELECT follower_username
            FROM followers
            WHERE snapshot_id = ?
        `;

        const newQuery = `
            SELECT follower_username
            FROM followers
            WHERE snapshot_id = ?
        `;

        connection.query(oldQuery, [oldId], (error, oldResults) => {

            if (error) {
                reject(error);
                return;
            }

            connection.query(newQuery, [newId], (error, newResults) => {

                if (error) {
                    reject(error);
                    return;
                }

                const oldFollowers = oldResults.map(
                    user => user.follower_username
                );

                const newFollowers = newResults.map(
                    user => user.follower_username
                );

                const unfollows = oldFollowers.filter(
                    user => !newFollowers.includes(user)
                );

                const newFollowersAdded = newFollowers.filter(
                    user => !oldFollowers.includes(user)
                );

                resolve({
                    oldFollowers,
                    newFollowers,
                    unfollows,
                    newFollowersAdded
                });

            });

        });

    });

};

module.exports = compareSnapshotsService;