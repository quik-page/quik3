<template>
    <div class="iconbar">
        <div class="l">
            <div class="icon-item" v-for="icon in Licons" :key="icon.id" @click="icon.click" @dblclick="icon.dblclick" @mouseover="icon.hover">
                <RawHtm :htm="icon.content" v-if="typeof icon.content==='string'"/>
                <component :is="icon.content" v-else/>
            </div>
        </div>
        <div class="r">
            <div class="icon-item" v-for="icon in Ricons" :key="icon.id" @click="icon.click" @dblclick="icon.dblclick" @mouseover="icon.hover">
                <RawHtm :htm="icon.content" v-if="typeof icon.content==='string'"/>
                <component :is="icon.content" v-else/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import RawHtm from '@c/utils/rawHtm.vue';
import type { IconItem } from '@/api/types';

const Licons=ref<IconItem[]>([]);
const Ricons=ref<IconItem[]>([]);
</script>

<style lang="scss">
.iconbar {
    width: 100%;
    height: 40px;
    .l{
        float: left;
    }
    .r{
        float: right;
        .icon-item{
            float: right;
        }
    }
    .icon-item{
        width: 30px;
        height: 30px;
        text-align: center;
        user-select: none;
        margin: 5px;
        border-radius: 30px;
        float:left;
        .m-icon{
            width: 20px;
            height: 20px;
            margin: 5px;
        }
        &:hover{
            background-color: #f4f4f4;
        }
    }
}
</style>