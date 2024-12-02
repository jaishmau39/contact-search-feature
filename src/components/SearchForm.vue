  <template>
    <div class="form-table-container">
    <form class="search-form" @submit.prevent="onSubmit">
      <h2>Search for a contact</h2>
      <div class="row form-container">
        <div class="col left-column">
          <div class="row form-row">
            <div class="col-sm-4 form-group">
              <label for="first-name">First Name</label>
              <input id="first-name" v-model="form.firstName" type="text" placeholder="Enter first name" />
            </div>
            <div class="col-sm-4 form-group">
              <label for="last-name">Last Name</label>
              <input id="last-name" v-model="form.lastName" type="text" placeholder="Enter last name" />
            </div>
            <div class="col-sm-4 form-group">
              <label for="dob">Date of Birth</label>
              <input id="dob" v-model="form.dateOfBirth" type="date" />
            </div>
          </div>
  
          <div class="row form-row">
            <div class="col-sm-4 form-group">
              <label for="email">Email Address</label>
              <input id="email" v-model="form.email" type="email" placeholder="Enter email address" />
            </div>
            <div class="col-sm-4 form-group">
              <label for="phone">Phone Number</label>
              <input id="phone" v-model="form.phone" type="tel" placeholder="Enter phone number" />
            </div>
          </div>
          <div class="row form-row">
            <div class="col-sm-4 form-group">
              <button type="submit">Search</button>
            </div>
          </div>
        </div>
  
        <div class="col right-column">
          <div class="row form-row">
            <div class="form-group">
              <label for="street-address">Street Address</label>
              <input id="street-address" v-model="form.street" type="text" placeholder="Enter street address" />
            </div>
          </div>
  
          <div class="row form-row">
            <div class="col-sm-6 form-group">
              <label for="city">City</label>
              <input id="city" v-model="form.city" type="text" placeholder="Enter city" />
            </div>
            <div class="col form-group">
              <label for="state">State</label>
              <!-- <input id="state" v-model="form.state" type="text" placeholder="Enter state" /> -->
              <Dropdown v-model="form.state" :options="provinces" placeholder="Type or select a province"/>
            </div>
            <div class="col form-group">
              <label for="zip">ZIP Code</label>
              <input id="zip" v-model="form.zip" type="text" placeholder="Enter ZIP code" />
            </div>
          </div>
        </div>
      </div>
  
      <!-- <button type="submit">Search</button> -->
      <ContactsTable :contacts="filteredContacts" @contact-selected="updateSelectedContact"/>
    </form>
    <div id="contact-info-section">
      <contactInfo :contact="selectedContact" />
    </div>
  </div>
  </template>
  
  <script setup>
  import { reactive, computed, onMounted,onBeforeUnmount, ref, watch } from 'vue';
  import Dropdown from './Dropdown.vue';
  import ContactsTable from './ContactsTable.vue';
  import ContactInfo from './ContactInfo.vue';
  import { fetchContacts, saveContacts } from '../../utils/contactUtils';

  const allContacts = ref([]);
  const filteredContacts = ref([]);
  const selectedContact = ref(null);
  
  const form = reactive({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const provinces = [
    { name: 'Alberta', abbreviation: 'AB' },
    { name: 'British Columbia', abbreviation: 'BC' },
    { name: 'Manitoba', abbreviation: 'MB' },
    { name: 'New Brunswick', abbreviation: 'NB' },
    { name: 'Newfoundland and Labrador', abbreviation: 'NL' },
    { name: 'Nova Scotia', abbreviation: 'NS' },
    { name: 'Ontario', abbreviation: 'ON' },
    { name: 'Prince Edward Island', abbreviation: 'PE' },
    { name: 'Quebec', abbreviation: 'QC' },
    { name: 'Saskatchewan', abbreviation: 'SK' },
    { name: 'Northwest Territories', abbreviation: 'NT' },
    { name: 'Nunavut', abbreviation: 'NU' },
    { name: 'Yukon', abbreviation: 'YT' }
  ];
    
  const onSubmit = () => {
    performSearch();
    console.log('Form submitted:', form);
  };


  // Search method to filter contacts
  const performSearch = () => {
    filteredContacts.value = allContacts.value.filter(contact => {
      return Object.keys(form).every(key => {
        const value = form[key]?.toLowerCase(); // User input
        return !value || contact[key]?.toLowerCase().includes(value); // Match against contact data
      });
    });
    console.log("Searched contacts: ", filteredContacts.value);
  };

  const updateSelectedContact = (contact) => {
    selectedContact.value = contact;
    // Scroll to contact-info section
    const contactInfoSection = document.getElementById('contact-info-section');
    if (contactInfoSection) {
      contactInfoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  
  onMounted(async () => {
  try {
    allContacts.value = await fetchContacts();
    console.log("Fetched contacts: ", allContacts.value)
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
  });

  // Initially show the first contact after search
  watch(filteredContacts, (newContacts) => {
    if (newContacts.length > 0) {
      selectedContact.value = newContacts[0];
    }
  });

  </script>
  
  <style>
  .search-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: var(--form-max-width, 1200px);
  margin: 0 auto;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold; 
}

.form-container {
  max-width: 100%; 
  gap: 4rem;
}

.left-column,
.right-column {
  flex: 1; 
}

.form-row {
  justify-content: flex-start; 
  margin-bottom: 1rem; 
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem; 
  flex: 1; 
}

label {
  font-size: 1rem;
}

input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%; 
  box-sizing: border-box; 
}

button {
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: transparent; 
  color: #007acc; 
  border: 2px solid black; 
  border-radius: 4px !important; 
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, color 0.3s; 
}

button:hover {
  background-color: #007acc; 
  color: white; 
}

#contact-info-section {
  margin-top: 2rem; 
}


</style>
  




  
  
  

  
  
  