<template>
    <div :class='{
        dialog: true,
        show
    }'>
        <div class="dialog-con">
            <slot></slot>
        </div>
        <div class="dialog-bg" @click="bgclick"></div>
    </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';

const FULLSCREEN = 0;
FULLSCREEN;// to ignore warn
const DIALOG = 1;
const props = defineProps({
    clickBgClose: {
        type: Boolean,
        default: true,
    },
    mobileShowtype: {
        type: Number,
        default: DIALOG,
    }
});
const show = defineModel("show", {
    default: false,
    type: Boolean,
})
const emits = defineEmits(['show', 'hide']);
function bgclick() {
    if (props.clickBgClose) {
        show.value = false;
    }
}
watch(show, (newVal) => {
    newVal ? emits('show') : emits('hide');
})
</script>

<style lang="scss">
@import url(@/styles/dialogui.scss);

.dialog {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    display: block;
    opacity: 0;
    transition: all .3s ease;

    .dialog-con {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(.5);
        background-color: #fff;
        z-index: 2;
        padding: 20px;
        border-radius: 15px;
        transition: all .3s ease;
    }

    .dialog-bg {
        background-color: rgba(0, 0, 0, .5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &.show {
        pointer-events: all;
        opacity: 1;

        .dialog-con {
            transform: translate(-50%, -50%) scale(1);
        }
    }
}
</style>