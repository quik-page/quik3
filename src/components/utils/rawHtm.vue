<template>
    <div v-html="htm"></div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
const htm = ref('');
const props = defineProps<{ htm: string }>();

watchEffect(() => {
    htm.value = props.htm;
})
</script>