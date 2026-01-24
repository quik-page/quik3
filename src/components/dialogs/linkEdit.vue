<template>
    <Dialog v-model:show="show">
        <form class="dialog-ui" @submit="submit">
            <div class="title" v-if="type === 'add'">添加链接</div>
            <div class="title" v-if="type === 'edit'">修改链接</div>
            <div class="input-g">
                <div class="label">URL:</div>
                <input type="text" required placeholder="链接地址" v-model="URL" />
            </div>
            <div class="input-g">
                <div class="label">标题:</div>
                <input type="text" required placeholder="链接名称" v-model="TITLE" />
            </div>
            <div class="input-g">
                <div class="label">位置:</div>
                <input type="number" min="0" :max="Max" placeholder="链接位置（默认最后）" v-model="POSITION" />
            </div>
            <div class="input-g hbtn">
                <div class="label">图标:</div>
                <input type="text" placeholder="链接图标（默认自动获取）" v-model="ICON" />
                <div class="btn" @click="uploadTb()">上传图标</div>
            </div>
            <div class="btn-g">
                <div class="btn cancel" @click="show = false">取消</div>
                <button class="btn ok" v-if="type === 'add'">添加</button>
                <button class="btn ok" v-if="type === 'edit'">确定</button>
            </div>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import type { LinkEditCBEvent } from '@/api/types';
import Dialog from '../utils/Dialog.vue';
import { getLocalFiles } from '../../api/util';
const show = defineModel("show", {
    default: false,
    type: Boolean,
})
const URL = defineModel("url", {
    default: "",
    type: String
})

const TITLE = defineModel("title", {
    default: "",
    type: String
})
const POSITION = defineModel("position", {
    default: 0,
    type: Number
})
const ICON = defineModel("icon", {
    default: "",
    type: String
})

const props = defineProps({
    type: {
        default: "add",
        type: String,
    },
    Max: {
        default: 1000,
        type: Number,
    }
});
const Max = ref(props.Max);
watchEffect(() => {
    Max.value = props.Max;
})
const emits = defineEmits(['cb']);

function submit(e: SubmitEvent) {
    e.preventDefault();
    show.value = false;
    let u = URL.value;
    if (!u.startsWith("http")) {
        u = "http://" + u;
    }
    emits('cb', {
        link: {
            url: u,
            name: TITLE.value,
            icon: ICON.value,
        },
        index: POSITION.value === null ? Max.value : POSITION.value,
    } as LinkEditCBEvent)
}

function uploadTb() {
    getLocalFiles().then(files => {
        const f = files[0] as File;
        // generate to base64 url
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = function () {
            ICON.value = reader.result as string;
        }
    })
}

</script>