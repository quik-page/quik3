<template>
    <div :class="{
        loading: true,
        show
    }">
        <load></load>
    </div>
</template>

<script lang="ts" setup>
import load from "./load.vue";
const { show = false } = defineProps<{ show?: boolean }>();
</script>

<style lang="scss" scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: all .3s;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 99;
}

.loading.show {
    pointer-events: all;
    opacity: 1;
}
</style>