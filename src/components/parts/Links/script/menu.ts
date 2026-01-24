import { deleteLink } from "@/api/link";
import type { Link, MenuItem } from "@/api/types";
import MIcon from "@/components/utils/MIcon.vue";
import { h, ref } from "vue";
import { activeGroupId } from "./core";
import { openEditLink } from "./edit";

/* 右键菜单 */
let targetLink: Link | undefined = void 0; // 右键菜单目标链接
const linkEditMenu: MenuItem[] = [{
    title: "修改",
    icon: h(MIcon, { name: "edit" }),
    click: () => {
        openEditLink();
    }
},
{
    title: "删除",
    icon: h(MIcon, { name: "delete" }),
    click: () => {
        deleteLink(activeGroupId.value, targetLink?.id || '');
    }
}]
const showLinkMenu = ref(false); // 是否显示右键菜单
// 菜单位置 l left t top
const linkMenuPos_l = ref(0);
const linkMenuPos_t = ref(0);

function openMenu(e: MouseEvent, link: Link) {
    e.preventDefault();
    showLinkMenu.value = true;
    targetLink = link;
    let x = e.pageX, y = e.pageY;
    if (x + 100 > window.innerWidth) {
        x -= 100;
    }
    let h = linkEditMenu.length * 30;
    if (y + h > window.innerHeight) {
        y -= h;
    }
    linkMenuPos_l.value = x;
    linkMenuPos_t.value = y;
}

function getTargetLink(){
    return targetLink;
}

export {
    linkEditMenu,
    showLinkMenu,
    linkMenuPos_l,
    linkMenuPos_t,
    openMenu,
    getTargetLink
}