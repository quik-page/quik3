import { reactive, ref } from "vue";
import { getTargetLink } from "./menu";
import type { Link, LinkEditCBEvent } from "@/api/types";
import { activeGroupId, links } from "./core";
import { addLink, editLink, moveLink } from "@/api/link";
import { draw } from "./draw";

/* 对话框部分 */
const edittype = ref('add');
const showLinkedit = ref(false);
let defLeS = {
    title: '',
    url: '',
    icon: '',
    position: 0,
    Max: 1000
};
const leS = reactive({ ...defLeS });
function openAddLink() {
    edittype.value = 'add';
    showLinkedit.value = true;
    Object.assign(leS, defLeS);
    leS.position = links.value.length;
}

function openEditLink() {
    let targetLink=getTargetLink();
    if (typeof targetLink === "undefined") return;
    edittype.value = 'edit';
    showLinkedit.value = true;
    for (let i = 0; i < links.value.length; i++) {
        if ((links.value[i] as Link).id == targetLink.id) {
            leS.position = i;
            break;
        }
    }
    Object.assign(leS, {
        title: targetLink?.name || '',
        url: targetLink?.url || '',
        icon: targetLink?.icon || '',
        Max: links.value.length - 1
    })
}

async function linkEditCB(n: LinkEditCBEvent) {
    let targetLink = getTargetLink();
    let ac = activeGroupId.value;
    if (edittype.value == 'add') {
        await addLink(n.link, ac, n.index).then(() => draw());
    } else if (edittype.value == 'edit') {
        await editLink(ac, targetLink?.id || '', n.link);
        await moveLink(ac, targetLink?.id || '', ac, n.index);
    }
}

export {
    openAddLink,
    openEditLink,
    linkEditCB,
    showLinkedit,
    leS,
    edittype,
}