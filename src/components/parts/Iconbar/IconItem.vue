<template>
    <div class="icon-item" :class="{show:icon.show,important:icon.important}">
        <RawHtm :htm="icon.content" v-if="typeof icon.content==='string'"/>
        <component :is="icon.content" v-else/>
    </div>
</template>

<script lang="ts" setup>
import RawHtm from '@c/utils/rawHtm.vue';
import type { IconItem } from '@/api/types';
import { ref } from 'vue';
const props=defineProps<{icon:IconItem}>();
const icon = ref<IconItem>(props.icon);
</script>