import { defSym, getGroupList } from "@/api/link";
import type { Link, LinkGroup } from "@/api/types";
import { computed, ref } from "vue";

/* 核心状态 */
const activeGroup = ref('def'); // 当前显示的分组
const activeGroupId = computed(() => {
    return activeGroup.value === "def" ? defSym : activeGroup.value;
})
const groups = ref<LinkGroup[]>(getGroupList()); // 所有分组
const links = ref<Link[]>([]); // 当前分组的链接
const enableGroup = ref(false); // 是否显示分组列表

export {
    activeGroup,
    activeGroupId,
    groups,
    links,
    enableGroup,
}