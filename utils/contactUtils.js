// Fetch contacts from localStorage
export const fetchContacts = () => {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : []; 
};

// Save contacts to localStorage
export const saveContacts = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
};

// // Update a contact in the list and save to localStorage
// export const updateContactInStorage = (updatedContact) => {
//     const contacts = loadContactsFromStorage();
//     const contactIndex = contacts.findIndex(contact => contact.id === updatedContact.id);
    
//     if (contactIndex !== -1) {
//       contacts[contactIndex] = updatedContact; 
//       saveContactsToStorage(contacts); 
//     } else {
//       console.error('Contact not found');
//     }
// };

