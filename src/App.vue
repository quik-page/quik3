<template>
    <div class="body" :style="{
        width: winWidth + 'px',
        height: winHeight + 'px'
    }">
        <Loading :show="!isShow" />
        <Main :show="isShow" />

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Loading from './components/Loading.vue';
import Main from './components/Main.vue';
import bus from './api/bus';
let winWidth = ref(window.innerWidth);
let winHeight = ref(window.innerHeight);
let isShow = ref(false);

onMounted(() => {
    if (window.isloaded) {
        isShow.value = true;
    }
    window.addEventListener("resize", () => {
        winWidth.value = window.innerWidth;
        winHeight.value = window.innerHeight;
    })
    window.addEventListener("load", () => {
        window.isloaded = true;
        isShow.value = true;
    })
    document.addEventListener("click", () => {
        bus.emit("doc-click");
    })
})


</script>
