const Employee = require('../models/Employee')

// add new theater(s)
exports.addNewEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);

    try {
        const savedEmployee = await newEmployee.save();

        res.status(200).json({
            success: true,
            message: 'Created Successfully!',
            data: savedEmployee,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error: ' + err.message
        });
    }
}

// update employee
exports.updateEmployee = async (req, res) => {
    const id = req.params.id;
    
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        });

        res.status(200).json({
            success: true,
            message: 'Updated Successfully!',
            data: updatedEmployee,
        });
    } catch (err) {
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