import createHttpError from 'http-errors';

import { getAllContacts, getContactById, addContact, deleteContact, putchContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parsedSortParapms } from '../utils/parseSortParams.js';
import { parseFilters } from '../utils/parseFilterParams.js';

export async function getAllContactsController(req, res) {
        const {page, perPage} = parsePaginationParams(req.query);
        const {sortBy, sortOrder} = parsedSortParapms(req.query);
        const filters = parseFilters(req.query);
        const contacts = await getAllContacts({page, perPage, sortBy, sortOrder, filters});
        res.status(200).json({
          status: 200,
          message: "Successfully found contacts!",
          data: contacts,
        });
}

export async function getContactByIdController(req, res) {
    const {contactId} = req.params;
    const contact = await getContactById(contactId);
    if(!contact) {
      throw createHttpError(404, 'Contact not found');
    } else {
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    }
  }

export async function addContactController(req, res) {
    const contact = await addContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
};

export async function deleteContactController(req, res) {
    const {contactId} = req.params;
    const deletedContact = await deleteContact(contactId);
    if(!deletedContact) {
        throw createHttpError(404, "Contact not found");
    }
    res.sendStatus(204);
};

export async function putchContactController(req, res) {
    const {contactId} = req.params;
    const updatedContact = await putchContact(contactId, req.body);
    if(!updatedContact) {
        throw createHttpError(404, "Contact not found");
    }
    res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedContact.contact,
    });
};