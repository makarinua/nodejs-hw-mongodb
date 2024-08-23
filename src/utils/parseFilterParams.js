const parseType = (type) => {
    const isString = typeof type === 'string';
    if(!isString) return;
    const isValidType = ['work', 'home', 'personal'].includes(type);
    if(isValidType) return type;
};

const parseName = (name) => {
    const isString = typeof name === 'string';
    if(!isString) return;
    return name;
};

export const parseFilters = (query) => {
    const {contactType, name} = query;
    const parsedContactType = parseType(contactType);
    const parsedName = parseName(name);

    return {
        contactType: parsedContactType,
        name: parsedName,
    };
};