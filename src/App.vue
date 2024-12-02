<template>
  <div id="app" :style="{ '--form-max-width': formMaxWidth }">
    <header>
      <h1>Choose a Contact</h1>
    </header>
    <main>
      <SearchForm />
    </main>
  </div>
</template>

<script setup>
import SearchForm from './components/SearchForm.vue';
import { onMounted,onBeforeUnmount, ref } from 'vue';
import { sampleContacts } from '../data/contacts';

const formMaxWidth = ref('');

const calculateFormMaxWidth = () => {
  const screenWidth = window.innerWidth;
  formMaxWidth.value = `${screenWidth - 40}px`; // 20px on each side
  console.log("Update maxwith: ", formMaxWidth.value, " . Screen width: ", screenWidth);
};

onMounted(() => {
  calculateFormMaxWidth();
  window.addEventListener('resize', calculateFormMaxWidth); // Recalculate on resize
  if (!localStorage.getItem('contacts')) {
    localStorage.setItem('contacts', JSON.stringify(sampleContacts));
  }
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', calculateFormMaxWidth);
});
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  color: #333;
}

header {
  text-align: left;
  margin: 1rem 0;
  padding-left: 20px;
}

main {
  display: flex;
  justify-content: center;
}


</style>
