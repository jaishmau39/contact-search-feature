// Fetch contacts from localStorage
export const fetchContacts = () => {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : []; 
};

// Save contacts to localStorage
export const saveContacts = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
};
