<template>
    <div class="wrapper">
      <table class="contact-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>DOB</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in paginatedContacts" :key="contact.id">
            <td><input type="checkbox" v-model="contact.selected" @change="handleSelection(contact)"/></td>
            <td>{{ contact.firstName }} {{ contact.lastName }}</td>
            <td>{{ contact.dateOfBirth }}</td>
            <td>{{ contact.street.toUpperCase() }}</td>
            <td>{{ contact.city }}</td>
            <td>{{ contact.state }}</td>
            <td>{{ contact.zip }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.phone }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="contacts.length === 0">No contacts found.</p>

    <!-- Pagination -->
    <div class="pagination-container">
        <button 
            @click="previousPage" 
            :disabled="currentPage === 1"
            class="pagination-arrow"
        >
            &lt;
        </button>

        <span class="pagination-current">{{ currentPage }}</span>

        <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages" 
            class="pagination-arrow"
        >
            &gt;
        </button>
    </div>
    <!-- Pagination -->

    </div>
  </template>
  
  <script setup>
  import {ref, computed} from 'vue';
    const props =defineProps({
        contacts: {
        type: Array,
        required: true,
        },
    });
    const emit = defineEmits(['contact-selected'])

    // Pagination
    const currentPage = ref(1);
    const itemsPerPage = 2; // Number of contacts per page

    const paginatedContacts = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return props.contacts.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
    return Math.ceil(props.contacts.length / itemsPerPage);
    });

    const previousPage = () => {
    if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
    };
    const handleSelection = (contact) => {
        // Ensure only one contact is selected
        props.contacts.forEach((c) => (c.selected = c === contact));
        emit('contact-selected', contact); 
    };
    const setPage = (page) => {
    currentPage.value = page;
    };
    
  </script>
  
  <style scoped>

    .contact-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    }

    .contact-table th,
    .contact-table td {
    border-top: 1px solid #ddd;  
    border-bottom: 1px solid #ddd; 
    padding: 8px;
    text-align: left;
    }

    .contact-table th {
    background-color: transparent;
    border-left: none;  
    border-right: none; 
    }

    .contact-table td {
    border-left: none;  
    border-right: none; 
    }

    .contact-table tr:first-child th {
    border-top: none;  
    }

    .contact-table tr:last-child td {
    border-bottom: none;  
    }

    input[type="checkbox"] {
    cursor: pointer;
    }

    /* Pagination Styles */
    .wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 50px;
    }
    .pagination-container {
    position: absolute;
    bottom: 10px; 
    right: 20px; 
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    }

    /* Arrow styles */
    .pagination-arrow {
    border: none;
    background: none;
    font-size: 1rem;
    cursor: pointer;
    color: #333;
    }

    .pagination-arrow:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    }

    /* Current page indicator */
    .pagination-current {
        background-color: #007bff; 
        color: white;              
        font-size: 1rem;           
        padding: 10px;             
        border-radius: 0;          
        width: 40px;               
        height: 40px;              
        text-align: center;        
        display: flex;
        justify-content: center;   
        align-items: center;       
    }

  </style>
  