<script setup lang="ts">
import { h, ref } from 'vue';
import MIcon from './MIcon.vue';
import { checkVal, getUserNowEngine } from '../api/searchbox';
import FavIcon from './FavIcon.vue';
import { debounce } from '../api/util';

let inpval=ref('');
let engineIcon=ref(h(FavIcon,{url:getUserNowEngine()}));
let tobtnIcon=ref(h(MIcon,{name:"search"}));

function onKeyDown(e: KeyboardEvent){
    if(e.key=='Enter'){
        const vp=checkVal(inpval.value);
        vp.enter(inpval.value);
    }
}

function onInput(){
    const vp=checkVal(inpval.value);
    if(typeof vp.icon=='string'){
        // TODO
    }else{
        engineIcon.value=vp.icon();
    }
    if(typeof vp.tobtn=='string'){
        // TODO
    }else{
        tobtnIcon.value=vp.tobtn();
    }
}

</script>

<template>
    <div class="searchbox">
        <div class="box">
            <div class="engine">
                <component :is="engineIcon"/>
            </div>
            <div class="inputbox">
                <input type="search" v-model="inpval" @keydown="onKeyDown" @input="onInput" placeholder="搜索或输入网址"/>
            </div>
            <div class="tobtn">
                <component :is="tobtnIcon"/>
            </div>
        </div>
        <div class="morelist">
            
        </div>
    </div>
</template>

<style lang="scss">
.searchbox{
    max-width: 600px;
    height: 40px;
    width: calc(100% - 10px);
    border-radius: 40px;
    box-shadow: #aaa 0 1px 5px;
    background-color: #fff;
    position: absolute;
    top: calc(30vh + 10px);
    left: 50%;
    transform: translateX(-50%);
    .box{
        width: 100%;
        height: 40px;
        .engine{
            width: 40px;
            height: 40px;
            float: left;
            img{
                width: 20px;
                height: 20px;
                margin: 10px 10px;
            }
            .m-icon{
                width: 20px;
                height: 20px;
                margin: 10px;
            }
        }
        .inputbox{
            width: calc(100% - 80px);
            height: 40px;
            float: left;
            input{
                width: 100%;
                height: 40px;
                border: 0;
                outline: 0;
                font-size: 14px;
                font-family: Consolas;
            }
        }
        .tobtn{
            float: left;
            width: 40px;
            height: 40px;
            cursor: pointer;

            .m-icon{
                width: 20px;
                height: 20px;
                margin: 10px;
            }
        }
    }
}
</style>