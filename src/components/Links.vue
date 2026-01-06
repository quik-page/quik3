<template>
    <div class="links">
        <div class="group-con">
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
        <div class="link-con">

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MIcon from './MIcon.vue';
import { getGroupList, type LinkGroup } from '../api/link';
const activeGroup = ref('def');
// const groups=ref(getGroupList());
const groups = ref<LinkGroup[]>([{
    name: "分组1",
    id: "id1",
}, {
    name: "分组2",
    id: "id2",
}, {
    name: "分组3",
    id: "id3",
}, {
    name: "分组4",
    id: "id4",
}]);

</script>

<style lang="scss">
.links {
    max-width: 100%;
    width: 800px;
    height: calc(100% - (40vh + 150px));
    margin: 5px auto;

    .group-con {
        width: 100%;
        height: 40px;
        .gs{
            float:left;
            width:calc(100% - 60px);
            height: 40px;
        }
        .group-item {
            min-width: 40px;
            height: 30px;
            padding: 0 5px;
            margin: 5px;
            float: left;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            border-radius: 4px;

            &:hover {
                background-color: #f4f4f4;
            }

            &[actived=true] {
                background-color: #eee;
            }

            .m-icon {
                width: 20px;
                height: 20px;
                margin: 5px 10px;
            }
            .add{
                float: right;
            }
        }
    }
}
</style>