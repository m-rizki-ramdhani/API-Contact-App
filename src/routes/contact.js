const express = require('express');
const router = express.Router();

const {
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
} = require('../controller/contact');

router.get('/', getContacts);
router.post('/', createContact);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router