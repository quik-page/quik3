<script setup lang="ts">
import { h, nextTick, ref, watch } from 'vue';
import MIcon from '@c/utils/MIcon.vue';
import { checkVal, geneSug, getUserNowEngine, type Sug } from '@a/searchbox';
import FavIcon from '@c/utils/FavIcon.vue';
import { debounce } from '@a/util';
import RawHtm from '@c/utils/rawHtm.vue';

let inpval = ref('');
let engineIcon = ref(h(FavIcon, { url: getUserNowEngine() }));
let tobtnIcon = ref(h(MIcon, { name: "search" }));
let sugs = ref<Sug[]>([]);
let activeSugIndex = ref(-1);
let activeSugId = ref('');
let listRef = ref<HTMLDivElement>();

watch(activeSugIndex, async (newItem) => {
    if (newItem < 0) return;
    await nextTick();
    const activeItem = listRef.value?.children[newItem];
    if (typeof activeItem == 'undefined') return;
    activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
})

function enter() {
    const vp = checkVal(inpval.value);
    vp.enter(inpval.value);
}

function onKeyDown(e: KeyboardEvent) {
    if (e.key == 'Enter') {
        enter();
    } else if (e.key == 'ArrowDown') {
        e.preventDefault();
        if (activeSugIndex.value < sugs.value.length - 1) {
            activeSugIndex.value++;
            let sy = sugs.value[activeSugIndex.value];
            activeSugId.value = sy ? sy.id || '' : '';
        }
    } else if (e.key == 'ArrowUp') {
        e.preventDefault();
        if (activeSugIndex.value >= 0) {
            activeSugIndex.value--;
            let sy = sugs.value[activeSugIndex.value];
            activeSugId.value = sy ? sy.id || '' : '';
        }
    } else if (e.key == "ArrowRight") {
        if (activeSugIndex.value >= 0) {
            const sug = sugs.value[activeSugIndex.value] as Sug;
            inpval.value = sug.text;
            onInput();
        }
    }
}

let lastgene: ReturnType<typeof geneSug> | undefined;
let geSug = debounce(function (val: string) {
    lastgene?.abort();
    sugs.value = [];
    lastgene = geneSug(val, (nsugs) => {
        sugs.value = nsugs;
        activeSugIndex.value = -1;
        for (let i = 0; i < nsugs.length; i++) {
            if ((nsugs[i] as Sug).id == activeSugId.value) {
                activeSugIndex.value = i;
                break;
            }
        }
    })
}, 100);

function onInput() {
    const vp = checkVal(inpval.value);
    if (typeof vp.icon == 'string') {
        engineIcon.value = h(RawHtm, { htm: vp.icon });
    } else {
        engineIcon.value = vp.icon();
    }
    if (typeof vp.tobtn == 'string') {
        tobtnIcon.value = h(RawHtm, { htm: vp.tobtn });
    } else {
        tobtnIcon.value = vp.tobtn();
    }
    geSug(inpval.value);
}

let isfocus = ref(false);

function onFocus() {
    isfocus.value = true;
}

function onBlur() {
    isfocus.value = false;
}

</script>

<template>
    <div :class="{
        searchcover: true,
        show: isfocus
    }"></div>
    <div :class="{
        searchbox: true,
        focus: isfocus
    }">
        <div class="box">
            <div class="engine">
                <component :is="engineIcon" />
            </div>
            <div class="inputbox">
                <input type="search" v-model="inpval" @blur="onBlur" @focus="onFocus" @keydown="onKeyDown"
                    @input="onInput" placeholder="搜索或输入网址" />
            </div>
            <div class="tobtn" @click="enter">
                <component :is="tobtnIcon" />
            </div>
        </div>
        <div class="morelist" ref="listRef">
            <div :class="{
                item: true,
                active: activeSugId == sug.id
            }" v-for="(sug) in sugs" :key="sug.id" @click="sug.enter(sug.text)">
                <div class="icon" v-if="typeof sug.icon == 'string'" v-html="sug.icon"></div>
                <div class="icon" v-else>
                    <component :is="sug.icon()" />
                </div>
                <div class="text">{{ sug.text }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.searchbox {
    max-width: 600px;
    height: 40px;
    width: calc(100% - 10px);
    border-radius: 20px;
    box-shadow: #bbb 0 1px 5px;
    background-color: #fff;
    position: absolute;
    top: calc(30vh + 10px);
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;

    .box {
        width: 100%;
        height: 40px;

        .engine {
            width: 40px;
            height: 40px;
            float: left;

            img {
                width: 20px;
                height: 20px;
                margin: 10px 10px;
            }

            .m-icon {
                width: 20px;
                height: 20px;
                margin: 10px;
            }
        }

        .inputbox {
            width: calc(100% - 80px);
            height: 40px;
            float: left;

            input {
                width: 100%;
                height: 40px;
                border: 0;
                outline: 0;
                font-size: 14px;
                font-family: Consolas;
            }
        }

        .tobtn {
            float: left;
            width: 40px;
            height: 40px;
            cursor: pointer;

            .m-icon {
                width: 20px;
                height: 20px;
                margin: 10px;
            }
        }
    }
}

.searchbox.focus {
    height: auto;
}

.morelist {
    width: 100%;
    max-height: calc(60vh - 120px);
    overflow-y: auto;

    .item {
        width: calc(100% - 6px);
        height: 30px;
        border-radius: 5px;
        margin: 3px;

        &:hover,
        &.active {
            background-color: #f4f4f4;
        }

        .icon {
            width: 30px;
            height: 30px;
            float: left;

            .m-icon {
                width: 16px;
                height: 16px;
                margin: 7px;
            }
        }

        .text {
            float: left;
            width: calc(100% - 30px);
            line-height: 30px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}

.searchcover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
}

.searchcover.show {
    opacity: 1;
    pointer-events: auto;
}
</style>