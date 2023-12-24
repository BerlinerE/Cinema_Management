const Member = require('../models/Member');

const getAllMembers = async () => {
    try {
        const members = await Member.find({});
        return members;
    } catch (error) {
        throw error;
    }
};

const createMember = async (memberData) => {
    try {
        const newMember = new Member({
            Name: memberData.Name,
            Email: memberData.Email,
            City: memberData.City,
            createdAt: new Date(), 
            updatedAt: new Date(), 
        });
        await newMember.save();
        return newMember;
    } catch (error) {
        throw error;
    }
};

const deleteMember = async (memberId) => {
    try {
        await Member.findByIdAndRemove(memberId);
    } catch (error) {
        throw error;
    }
};

const getMemberById = async (id) => {
    try {
        const member = await Member.findById(id);
        return member;
    } catch (error) {
        throw error;
    }
};

const updateMemberById = async (id, updatedData) => {
    try {
        const existingMember = await Member.findById(id);
        if (!existingMember) {
            throw new Error('Member not found');
        }
        const updatedMember = await Member.findByIdAndUpdate(
            id,
            {
                ...updatedData,
                updatedAt: new Date(), 
                createdAt: existingMember.createdAt, 
            },
            { new: true }
        );
        return updatedMember;
    } catch (error) {
        throw error;
    }
};


module.exports = { getAllMembers, createMember, deleteMember, getMemberById, updateMemberById };
