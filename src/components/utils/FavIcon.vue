<template>
    <img :src="src" :style="{ opacity: op ? 1 : 0 }" class="favIcon" alt="">
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { getFavicon } from '../../api/util';

const src = ref('');
const op = ref(false);
const props = defineProps<{ url: string }>();

watchEffect((onCleanup) => {
    let st = true;
    onCleanup(() => {
        st = false;
    });
    if (props.url) {
        getFavicon(props.url, (faviconUrl) => {
            if (!st) return;
            if (faviconUrl) {
                src.value = faviconUrl as string;
                op.value = true;
            } else {
                src.value = '';
                op.value = false;
            }
        });
    } else {
        src.value = '';
        op.value = false;
    }
})


</script>
