<template>
    <div :class="{ menu: true, show }">
        <template v-for="item in items">
            <div class="menu-hr" v-if="typeof item==='undefined'"></div>
            <div v-else :class="{ 'menu-item': true, disabled: item.disabled }" @click="item.click">
                <div class="menu-icon">
                    <RawHtm v-if="typeof item.icon === 'string'" :htm="item.icon"></RawHtm>
                    <div v-else-if="typeof item.icon === 'undefined'"></div>
                    <component v-else :is="item.icon"></component>
                </div>
                <div class="menu-title">{{ item.title }}</div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import bus from '../api/bus';
import RawHtm from './rawHtm.vue';
import type { MenuItem } from '../api/types';

const show = defineModel("show", {
    default: false
});
const props = defineProps<{
    items: (MenuItem | undefined)[]
}>();

function unshow(){
    show.value = false;
}

onMounted(() => {
    bus.on("doc-click", unshow)
})

onUnmounted(()=>{
    bus.off("doc-click",unshow)
})
</script>

<style lang="scss">
.menu{
    position: absolute;
    z-index: 9999;
    user-select: none;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: #aaa 0 1px 5px;
    display: none;
    &.show{
        display: block;
    }
    .menu-item{
        min-width: 100px;
        width: calc(100% - 10px);
        height: 24px;
        margin: 3px;
        border-radius: 4px;
        &:hover{
            background-color: #f5f5f5;
        }
        .menu-icon{
            width: 24px;
            height: 24px;
            float: left;
        }
        .menu-title{
            width: calc(100% - 24px);
            height: 24px;
            float: left;
            text-align: left;
            font-size: 12px;
            line-height: 24px;
        }
    }
}
</style>