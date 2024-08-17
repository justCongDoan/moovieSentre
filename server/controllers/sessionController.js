const Session = require('../models/Session');

// get single session
exports.getSingleSession = async (req, res) => {
    const id = req.params.id;
    try {
        const session = await Session.findById(id);
        res.status(200).json({
            success: true,
            message: 'Session found!',
            data: session,
        });
    } catch (error) {

        res.status(404).json({
            success: false,
            message: 'Session not found!'
        });
    }
}

// get all sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find({}).limit(5);
        res.status(200).json({
            success: true,
            how_many_huh: sessions.length,
            message: 'All sessions are here!',
            data: sessions,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Could not find any session!'
        });
    }
}