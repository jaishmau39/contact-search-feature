<template>
    <div class="dropdown-container">
        <div class="input-wrapper">
        <input
            v-model="searchText"
            type="text"
            :placeholder="placeholder"
            @input="onInput"
        />
        <span class="dropdown-arrow" @click="toggleDropdown" :class="{'active': showDropdown}">&#9660;</span>
        </div>
      <ul v-if="showDropdown && filteredOptions.length" class="dropdown">
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          @click="selectOption(option)"
        >
        {{ option.abbreviation }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    modelValue: {
      type: String,
      default: ''
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const searchText = ref(props.modelValue);
  const showDropdown = ref(false);
  
  const filteredOptions = computed(() =>
    props.options.filter(option =>
      option.name.toLowerCase().includes(searchText.value.toLowerCase())
    )
  );
  

  const selectOption = option => {
  searchText.value = option.abbreviation;
  emit('update:modelValue', option.abbreviation); // Emit the abbreviation for searching
  showDropdown.value = false;
  };

  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
  };
  
  const hideDropdown = () => {
    setTimeout(() => {
      showDropdown.value = false;
    }, 150);
  };
  
  const onInput = () => {
    showDropdown.value = true;
  };
  
  // Keep the parent updated with changes to searchText
  watch(searchText, newValue => emit('update:modelValue', newValue));
  </script>
  
  <style scoped>
  .dropdown-container {
    position: relative;
  }
    .input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    }

    input {
    padding-right: 30px; /* Make space for the arrow */
    padding-left: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    width: 100%;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    }

    .dropdown-arrow {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: #888;
    pointer-events: auto;
    cursor: pointer;
    transition: color 0.3s ease; 
    }
    .dropdown-arrow:hover {
    color: #555; 
    }

    .dropdown-arrow:active {
    color: #333; 
    }

  
  .dropdown {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid #ddd;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    background: white;
    z-index: 10;
    width: 100%;
  }
  .dropdown li {
    padding: 10px;
    cursor: pointer;
  }
  .dropdown li:hover {
    background: #f0f0f0;
  }
  </style>
  