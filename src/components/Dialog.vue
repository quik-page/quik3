<template>
    <div :class='{
        dialog:true,
        show:isshow,
    }'>
        <div class="dialog-con">
            <slot></slot>
        </div>
        <div class="dialog-bg" @click="bgclick"></div>
    </div>
</template>

<script lang="ts" setup>
import { ref,  watchEffect } from 'vue';

const FULLSCREEN=0;
const DIALOG=1;
interface dialogDetail{
    clickBgClose:boolean,
    mobileShowtype:0|1,
    show:boolean,
}
const props=defineProps<dialogDetail>();
const isshow=ref(false);
function bgclick(){
    if(props.clickBgClose){
        isshow.value=false;
    }
}
watchEffect(()=>{
    isshow.value=props.show;
})
</script>