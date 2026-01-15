<template>
    <div class="link-item">
        <a :href="url" target="_blank">
            <div class="link-icon">
                <img :src="imgsrc">
            </div>
            <div class="name">{{ name }}</div>
        </a>

    </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { getFavicon } from '../api/util';

const imgsrc = ref('');
const name = ref('');
const url = ref('');
const props = defineProps<{ url: string, name: string, icon?: string }>();

watchEffect(() => {
    if (props.icon) {
        imgsrc.value = props.icon;
    } else {
        getFavicon(props.url, (faviconUrl) => {
            if (!faviconUrl) return;
            imgsrc.value = faviconUrl as string;
        })
    }

    name.value = props.name;
    url.value = props.url;
})

</script>

<style lang="scss">
.link-item {
    float: left;
    width: 71px;
    height: 100px;
    position: relative;

    .link-icon {
        border-radius: 50%;
        background-color: #eee;
        box-shadow: none;
        width: 55px;
        height: 55px;
        transition: 0.2s;
        margin: 5px 7px;

        img {
            width: 35px;
            height: 35px;
            padding: 10px;
            border-radius: 50%;
            transition: 0.2s;
        }
    }

    .name{
        font-size: 12px;
        text-align: center;
    }
    &:hover{
        .link-icon {
            box-shadow: 0 0 5px rgba(0,0,0,.1);
            background-color: #e7e7e7;
        }
    }

    &:active{
        .link-icon img{
            transform:scale(.8);
        }
    }
}
</style>