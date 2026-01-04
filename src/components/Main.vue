<script setup lang="ts">
import Engines from './Engines.vue';
import Iconbar from './Iconbar.vue';
import Link from './Link.vue';
import Logo from './Logo.vue';
import Searchbox from './Searchbox.vue';

</script>

<template>
    <div class="main">
        <Iconbar/>
        <div class="center">
            <Logo/>
            <div class="searchpadding"></div>
            <Engines/>
            <Link/>
        </div>
        <Iconbar/>
        <Searchbox/>
    </div>
    
</template>

<style lang="scss" scoped>
    .main{
        width:100%;
        height: 100%;
        position:absolute;
        top:0;
        left:0;
        .center{
            width: 100%;
            height: calc(100% - 80px);
        }
        .searchboxpadding{
            height: 60px;
            width: 100%;
        }
    }
</style>