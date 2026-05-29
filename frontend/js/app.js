const button = document.getElementById('compareButton');

const oldContainer = document.getElementById('oldFollowers');

const newContainer = document.getElementById('newFollowers');

const oldSelect = document.getElementById(
    'oldSnapshotSelect'
);

const newSelect = document.getElementById(
    'newSnapshotSelect'
);

const loadSnapshots = async () => {

    const response = await fetch(
        'http://localhost:3000/api/instagram/snapshots'
    );

    const snapshots = await response.json();

    snapshots.forEach((snapshot) => {

        const option1 = document.createElement('option');

        option1.value = snapshot.id;

        option1.textContent = `Snapshot ${snapshot.id}`;

        oldSelect.appendChild(option1);

        const option2 = document.createElement('option');

        option2.value = snapshot.id;

        option2.textContent = `Snapshot ${snapshot.id}`;

        newSelect.appendChild(option2);

    });

};

loadSnapshots();

button.addEventListener('click', async () => {

    try {

        const oldSnapshot = oldSelect.value;

        const newSnapshot = newSelect.value;

        const response = await fetch(
            `http://localhost:3000/api/compare?old=${oldSnapshot}&new=${newSnapshot}`
        );

        const data = await response.json();

        oldContainer.innerHTML = '';
        newContainer.innerHTML = '';

        data.oldFollowers.forEach((user) => {

            const div = document.createElement('div');

            div.classList.add('follower');

            if (data.unfollows.includes(user)) {

                div.classList.add('unfollow');

                div.innerHTML = `${user} ❌`;

            } else {

                div.innerHTML = user;

            }

            oldContainer.appendChild(div);

        });

        data.newFollowers.forEach((user) => {

            const div = document.createElement('div');

            div.classList.add('follower');

            if (data.newFollowersAdded.includes(user)) {

                div.classList.add('new-follow');

                div.innerHTML = `${user} ✅`;

            } else {

                div.innerHTML = user;

            }

            newContainer.appendChild(div);

        });

    } catch (error) {

        console.log(error);

    }

});