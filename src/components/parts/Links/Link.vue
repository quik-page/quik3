<template>
    <div class="link-item">
        <a :href="url" target="_blank">
            <div class="link-icon">
                <img :src="imgsrc" :style="{opacity: imgsrc? 1 : 0}">
            </div>
            <div class="name">{{ name }}</div>
        </a>

    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { getFavicon } from '@a/util';
import type { Link } from '@t';

const imgsrc = ref('');
const name = ref('');
const url = ref('');
const props = defineProps<{ link:Link }>();

watchEffect(() => {
    if (props.link.icon) {
        imgsrc.value = props.link.icon;
    } else {
        getFavicon(props.link.url, (faviconUrl) => {
            if (!faviconUrl) return;
            imgsrc.value = faviconUrl as string;
        })
    }

    name.value = props.link.name;
    url.value = props.link.url;
})

</script>

<style lang="scss">
// see ./link-style.scss
</style>