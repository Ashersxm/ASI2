let waitingQueue = [];

exports.addUserToQueue = (userId) => {
    waitingQueue.push(userId);
    console.log(`User ${userId} added to the queue.`);

    if (waitingQueue.length >= 2) {
        const player1 = waitingQueue.shift();
        const player2 = waitingQueue.shift();

        console.log(`Match found: ${player1} vs ${player2}`);
        return `Match found: ${player1} vs ${player2}`;
    }

    return `User ${userId} added to the queue. Waiting for an opponent.`;
};
