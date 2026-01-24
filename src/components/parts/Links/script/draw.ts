import { getLinks, linkEv } from "@/api/link";
import { activeGroup, activeGroupId, links } from "./core";
import { watch } from "vue";
import type { Link } from "@/api/types";

/* 渲染部分 */
function draw() {
    let m = activeGroup.value;
    getLinks(activeGroupId.value).then(l => {
        if (activeGroup.value == m) {
            links.value = l;
        }
    })
}
watch(activeGroup, draw);

linkEv.on("linkchange", (e: { groupId: string | symbol, links: Link[] }) => {
    if (activeGroupId.value === e.groupId) {
        links.value = e.links;
    }
})

export {
    draw
}