const express = require('express');
const router = express.Router();
const students = require('../data/students');

// GET all students
router.get('/', (req, res) => {
    res.status(200).json(students);
});

// GET student by ID
router.get('/:id', (req, res) => {
    const student = students.find((s) => s.id === req.params.id);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
});

// POST create new student
router.post('/', (req, res) => {
    const { id, name, course, year } = req.body;

    if (!id || !name || !course || !year) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = students.find((s) => s.id === id);
    if (exists) {
        return res.status(409).json({ message: 'Student ID already exists' });
    }

    const newStudent = { id, name, course, year: Number(year) };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT update student
router.put('/:id', (req, res) => {
    const index = students.findIndex((s) => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const { name, course, year } = req.body;
    students[index] = { ...students[index], name, course, year: Number(year) };
    res.status(200).json(students[index]);
});

// DELETE student
router.delete('/:id', (req, res) => {
    const index = students.findIndex((s) => s.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const deleted = students.splice(index, 1);
    res.status(200).json({ message: 'Student deleted', student: deleted[0] });
});

module.exports = router;