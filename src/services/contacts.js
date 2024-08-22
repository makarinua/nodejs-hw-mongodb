import { contactsCollection } from "../db/models/contacts.js";

export const getAllContacts = () => contactsCollection.find();
export const getContactById = (id) => contactsCollection.findById(id);
export const addContact = (data) => contactsCollection.create(data);
export const deleteContact = (id) => contactsCollection.findByIdAndDelete(id);

export const putchContact = async (id, data, options = {}) => {
    const result = await contactsCollection.findOneAndUpdate(
        {_id: id},
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