<template>
    <div class="m-icon">
        <svg>
            <use :xlink:href="finalSymbolId" :fill="color" />
        </svg>
    </div>

</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    name: { type: String, required: true },
    color: { type: String, default: 'currentColor' }
})

const iconModules = import.meta.glob('/icons/*.svg');
const validIconNames = Object.keys(iconModules).map(path => {
    return path.split('/').pop()?.replace('.svg', '') || '';
})

const finalSymbolId = computed(() => {
    const isExist = validIconNames.includes(props.name)
    const iconName = isExist ? props.name : 'unknown'
    return `#icon-${iconName}`
})
</script>

<style lang="scss">
.m-icon {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;

    svg {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>