const Theater = require('../models/Theater');

// add new theater(s)
exports.addNewTheater = async (req, res) => {
    const newTheaters = Array.isArray(req.body) ? req.body : [req.body]

    try {
        const savedTheaters = await Theater.insertMany(newTheaters);

        res.status(200).json({
            success: true,
            message: 'New Theater Added Successfully!',
            data: savedTheaters,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot Add A Theater. Error: ' + error.message
        });
    }
}

// update theater(s)
exports.updateTheaters = async (req, res) => {
    const { ids, updateFields } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No theater IDs provided or invalid format!'
        });
    }

    try {
        const result = await Theater.updateMany(
            {_id:{$in:ids}}, 
            {$set:updateFields},
            {new: true}
        )
        /**
         * result:
         * "data": {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        }
         */
        res.status(200).json({
            success: true,
            message: 'Movies Updated Successfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update!'
        });
    }
}

// delete single theater
exports.deleteSingleTheater = async (req, res) => {
    const id = req.params.id

    try {
        await Theater.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'A Theater Is Deleted Successfully!',
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete this theater!'
        });
    }
}

// delete theaters
exports.deleteTheaters = async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No theater IDs provided or invalid format!'
        });
    }

    try {
        await Theater.deleteMany({ _id: { $in: ids } });
        res.status(200).json({
            success: true,
            message: 'Theaters Deleted Successfully!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete! Error: '+ error.message,
        });
    }
}

// get single theater
exports.getSingleTheater = async (req, res) => {
    const id = req.params.id;
    try {
        const theater = await Theater.findById(id);
        res.status(200).json({
            success: true,
            message: 'Theater found!',
            data: theater,
        });
    } catch (error) {

        res.status(404).json({
            success: false,
            message: 'Theater not found!'
        });
    }
}

// get all theaters
exports.getAllTheaters = async (req, res) => {
    try {
        const theaters = await Theater.find({})
        // .limit(5);
        res.status(200).json({
            success: true,
            how_many_huh: theaters.length,
            message: 'All theaters are here!',
            data: theaters,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Could not find any theater!'
        });
    }
}