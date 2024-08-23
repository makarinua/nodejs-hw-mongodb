import { SORT_ORDER } from "../constants/sortConstants.js";

const parseSortOrder = (sortOrder) => {
    const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
    if(!isKnownOrder) return SORT_ORDER.ASC;
    return sortOrder;
};

const parseSortBy = (sortBy) => {
    const keyOfContacts = ['_id', 'name', 'phoneNumber', 'email', 'isFavourite', 'contactType'];
    if(!keyOfContacts.includes(sortBy)) return '_id';
    return sortBy;
};

export const parsedSortParapms = (query) => {
    const {sortBy, sortOrder} = query;
    const parsedSortOrder = parseSortOrder(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};