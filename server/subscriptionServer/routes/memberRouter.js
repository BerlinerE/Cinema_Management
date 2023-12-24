const express = require('express');
const router = express.Router();
const { getAllMembers, createMember, getMemberById, deleteMember, updateMemberById } = require('../BLL/memberBLL');

// GET all members
router.get('/', async (req, res) => {
    try {
        const members = await getAllMembers();
        res.json(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST - Create a new member
router.post('/', async (req, res) => {
    try {
        const newMember = await createMember(req.body);
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Error creating a member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE - Delete a member by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteMember(id);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting a member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET - Get a member by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const member = await getMemberById(id);
        if (!member) {
            res.status(404).json({ error: 'Member not found' });
        } else {
            res.json(member);
        }
    } catch (error) {
        console.error('Error fetching a member by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a member by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id,req.body,"update member data")
    try {
        const updatedMember = await updateMemberById(id, req.body);
        res.json(updatedMember);
    } catch (error) {
        console.error('Error updating a member:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
