<template>
    <div class="links" ref="rootF">

        <!-- 分组 see(./script/core.ts) TODO -->
        <div class="group-con" v-show="enableGroup">
            <div class="gs">
                <div class="group-item def" :actived="activeGroup == 'def'">
                    <MIcon name="star" />
                </div>
                <div class="group-item" :actived="activeGroup == g.id" :key="g.id" v-for="g in groups">
                    {{ g.name }}
                </div>
            </div>

            <div class="group-item add">
                <MIcon name="add" />
            </div>
        </div>

        <!-- 链接池 see(./script/core.ts, ./script/draw.ts) -->
        <div class="link-con">
            <LinkItem v-for="link in links" :key="link.id" :link="link" @contextmenu="openMenu($event, link)">
            </LinkItem>
            <div class="link-add">
                <div class="b" @click="openAddLink()">
                    <MIcon name="add"></MIcon>
                </div>
            </div>
        </div>

    </div>

    <!-- 菜单 see(./script/menu.ts) -->
    <Menu :items='linkEditMenu' v-model:show="showLinkMenu" :style="{ 
        top: linkMenuPos_t + 'px', 
        left: linkMenuPos_l + 'px' 
    }"></Menu>

    <Teleport to=".dialogs">
        <!-- 编辑框 see(./script/edit.ts) -->
        <LinkEdit v-model:show="showLinkedit" :type="(edittype as 'add' | 'edit')" v-model:icon="leS.icon"
            v-model:url="leS.url" v-model:title="leS.title" v-model:position="leS.position" :Max="leS.Max"
            @cb="linkEditCB" />
    </Teleport>
</template>

<script lang="ts" setup>
import LinkItem from './Link.vue';
import Menu from '@c/utils/Menu.vue';
import LinkEdit from '@/components/dialogs/linkEdit.vue';
import MIcon from '@/components/utils/MIcon.vue';
import { onMounted, ref } from 'vue';
import { ready } from '@/api/link';

// 核心状态
import { activeGroup, enableGroup, groups, links } from './script/core'; 
// 编辑状态
import { edittype, leS, linkEditCB, openAddLink, showLinkedit } from './script/edit';
// 菜单状态
import { linkEditMenu, linkMenuPos_l, linkMenuPos_t, openMenu, showLinkMenu } from './script/menu';
// 渲染状态
import { draw } from './script/draw';


/**=初始化菜单位置至于链接池部分，以减少第一次打开菜单时位移过大问题=：{**/
const rootF = ref<HTMLElement | undefined>(); // 组件根元素
onMounted(() => {
    let lF = rootF.value?.getBoundingClientRect();
    linkMenuPos_l.value = lF?.left || 0;
    linkMenuPos_t.value = lF?.top || 0;
    ready(draw); // 绘制链接池
})
/*}==**/
</script>

<style lang="scss">
@import url(./link-style.scss);
</style>