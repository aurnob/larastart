<script setup>
const props = defineProps({
    loading: Boolean,
    label: String,
    buttonClass: String,
});


</script>
<template>
    <button :disabled="loading" :class="buttonClass">
    <span v-if="loading ? false:true" >  {{label}}</span>
    <div v-if="loading ? true:false" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading... </span>
      </div>
    </div>
  </button>
</template>