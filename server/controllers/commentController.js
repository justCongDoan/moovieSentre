const Comment = require('../models/Comment');

// add new comment
exports.addNewSingleComment = async (req, res) => {
    const newComment = new Comment(req.body);

    try {
        const savedComment = await newComment.save();

        res.status(200).json({
            success: true,
            message: 'Created Successfully!',
            data: savedComment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error: ' + err.message
        });
    }
}

// add new comment(s)
exports.addNewComments = async (req, res) => {
    const newComments = Array.isArray(req.body) ? req.body : [req.body]

    try {
        const savedComments = await Comment.insertMany(newComments);

        res.status(200).json({
            success: true,
            message: 'New Comments Added Successfully!',
            data: savedComments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot Add Comments. Error: ' + error.message
        });
    }
}

// update comment
exports.updateSingleComment = async (req, res) => {
    const id = req.params.id;
    
    try {
        const updatedComment = await Comment.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: 'Updated Successfully!',
            data: updatedComment,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update!'
        });
    }
}

// update comment(s)
exports.updateComments = async (req, res) => {
    const { ids, updateFields } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No comment IDs provided or invalid format!'
        });
    }

    try {
        const result = await Comment.updateMany(
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
            message: 'Comments Updated Successfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update!'
        });
    }
}

// delete single comment
exports.deleteSingleComment = async (req, res) => {
    const id = req.params.id

    try {
        await Comment.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'A Comment Is Deleted Successfully!',
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete this comment!'
        });
    }
}

// delete comments
exports.deleteComments = async (req, res) => {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No comment IDs provided or invalid format!'
        });
    }

    try {
        await Comment.deleteMany({ _id: { $in: ids } });
        res.status(200).json({
            success: true,
            message: 'Comments Deleted Successfully!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete! Error: '+ error.message,
        });
    }
}

// get single comment
exports.getSingleComment = async (req, res) => {
    const id = req.params.id;
    try {
        const comment = await Comment.findById(id);
        res.status(200).json({
            success: true,
            message: 'Comment found!',
            data: comment,
        });
    } catch (error) {

        res.status(404).json({
            success: false,
            message: 'Comment not found!'
        });
    }
}

// get all comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({})
        .limit(100);
        res.status(200).json({
            // success: true,
            // how_many_huh: comments.length,
            // message: 'All comments are here!',
            // data: 
            comments
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Could not find any comment!'
        });
    }
}