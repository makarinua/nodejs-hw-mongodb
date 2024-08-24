import { contactsCollection } from "../db/models/contacts.js";
import { SORT_ORDER } from "../constants/sortConstants.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import createHttpError from "http-errors";

export const getAllContacts = async ({page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id', filters = {}}, id) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = contactsCollection.find({userId: id});

    if(filters.contactType) {
        contactsQuery.where('contactType').equals(filters.contactType);
    }

    if(filters.name) {
        contactsQuery.where('name').equals(filters.name);
    };

    const [contactsAmmount, contacts] = await Promise.all([
        contactsCollection.find().merge(contactsQuery).countDocuments(),
        contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec(),
    ]);

    if (contacts.length === 0) {
        throw createHttpError(404, 'No contacts found matching the criteria');
    }

    const paginationData = calculatePaginationData(contactsAmmount, page, perPage);

    return {
        data: contacts,
        ...paginationData
    };
};

export const getContactById = (id, userId) => contactsCollection.findOne({_id:id, userId,});
export const addContact = (data, id) => contactsCollection.create({...data, userId: id});
export const deleteContact = async (id, userId) => {
    const contact = await contactsCollection.findOne({_id: id, userId,});

    if(!contact) throw createHttpError(404, 'Contact not found');

    return await contactsCollection.deleteOne({_id: id});

};

export const putchContact = async (id, data, userId, options = {}) => {
    const result = await contactsCollection.findOneAndUpdate(
        {_id: id, userId,},
        data,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        }
    );
    if(!result || !result.value) return null;
    return {
        contact: result.value,
    };
};