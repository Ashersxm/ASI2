const matchmakingService = require('../services/matchmakingService');

exports.addToQueue = (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const result = matchmakingService.addUserToQueue(userId);
        res.json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
