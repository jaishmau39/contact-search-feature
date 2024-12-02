<template>
    <div class="contact-info">
      <h3>Contact Information</h3>
      <form>
        <label>Name:</label>
        <input type="text" :value="fullName" disabled />
        
        <label>Email:</label>
        <input type="email" :value="contact?.email || ''" disabled />
        
        <label>Phone:</label>
        <input type="text" :value="contact?.phone || ''" disabled />
        
        <label>Address:</label>
        <input type="text" :value="contact?.street || ''" disabled />
  
        <!-- Show More details when toggled -->
        <div v-show="showMore">
          <label>Date of Birth:</label>
          <input type="text" :value="contact?.dateOfBirth || ''" disabled />

          <label>City:</label>
          <input type="text" :value="contact?.city || ''" disabled />
          
          <label>State:</label>
          <input type="text" :value="contact?.state" disabled />
          
          <label>Zip:</label>
          <input type="text" :value="contact?.zip || ''" disabled />
        </div>
        <!-- Show More button -->
        <button type="button" @click="toggleShowMore">{{ showMore ? 'Show Less' : 'Show More' }}</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, computed } from 'vue';
  
//   const { contact } = defineProps();
  const props = defineProps({
  contact: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  });
  const fullName = computed(() => {
    return `${props.contact?.firstName || ''} ${props.contact?.lastName || ''}`.trim();
  });
  const showMore = ref(false);
  
  const toggleShowMore = () => {
    showMore.value = !showMore.value;
  };
  </script>
  