<script setup>
// Define props using `defineProps`
const props = defineProps({
    inputName: String,
    type: String,
    modelValue: String,
    inputClass: String,
});

// Define emit using `defineEmits`
const emit = defineEmits(['update:modelValue']);

// Define your function to handle the update
function updateValue(event) {
  const val = event.target.value;
  emit('update:modelValue', val);
//   console.log(val);
}
</script>

<template>
     <input
        :id="inputName"
        :name="inputName"
        :value="modelValue"
        :type="typeof type==='undefined'?'text':type"
        @input="updateValue"
        :class="inputClass" 
    />
</template>