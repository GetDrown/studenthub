const express = require('express');
const router = express.Router();
const students = require('../data/students');
const db       = require('../config/db');
const protect  = require('../middleware/authMiddleware');
require('dotenv').config();

// GET all students
router.get('/', async (req, res) => {
    // res.status(200).json(students);
    try {
    const [rows] = await db.execute(
      'SELECT * FROM students_record ORDER BY created_at DESC'
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch students.' });
  }
});

// GET student by ID
router.get('/:id', async (req, res) => {
    try {
    const [rows] = await db.execute(
      'SELECT * FROM students_record WHERE student_id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch student.' });
  }
    // const student = students.find((s) => s.id === req.params.id);
    // if (!student) {
    //     return res.status(404).json({ message: 'Student not found' });
    // }
    // res.status(200).json(student);
});

// POST create new student
router.post('/', async (req, res) => {
    const { student_id, student_name, program, year } = req.body;

    if (!student_id || !student_name || !program || !year) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const [existing] = await db.execute(
            'SELECT student_id FROM students_record where student_id = ?',
            [student_id]
        );
        if (existing.length > 0) {
            return res.status(409).json({message: 'Student ID already exists'});
        }

        const [result] = await db.execute(
            'insert into students_record(student_id, student_name, program, year) values (?,?,?,?)',
            [student_id, student_name, program, Number(year)]
        );

        const [newStudent] = await db.execute(
            'Select * FROM students_record where student_id = ?',
            [result.insertId]
        );
        res.status(201).json(newStudent[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to create student.'});
    }
   
});

// PUT update student
router.put('/:id', async (req, res) => {
    const { student_id, student_name, program, year} = req.body;

    if(!student_id || !student_name || !program || !year) {
        return res.status(400).json({message: 'All fields are required'});
    }
    try {
        const [result ] = await db.execute(
            'UPDATE students_record SET student_name = ?, program = ?, year = ? WHERE student_id = ?',
            [student_name, program, Number(year), req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Sutdent not Found'});
        }
        const [updated] = await db.execute(
            'SELECT * FROM students_record WHERE student_id= ? ',
            [req.params.id]
        );
        res.status(200).json(updated[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to Update Student'});
    }

});

// DELETE student
router.delete('/:id', async(req, res) => {

try {
    const [result] = await db.execute(
        'DELETE FROM students_record WHERE student_id = ?',
        [req.params.id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({message: 'Student not found'});
    }
    res.status(200).json({message:'Student Deleted Succesfully'});

} catch (err) {
    console.error(err);
    res.status(500).json({message:'Failed to delete'});
}

    
});

module.exports = router;