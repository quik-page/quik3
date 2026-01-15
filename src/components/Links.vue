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
            <LinkItem v-for="link in links" :key="link.id" :url="link.url" :name="link.name" :icon="link.icon"></LinkItem>
            <div class="link-add">
                <div class="b">
                    <MIcon name="add"></MIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getGroupList, type Link, type LinkGroup } from '../api/link';
import LinkItem from './Link.vue';
import MIcon from './MIcon.vue';
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
const links = ref<Link[]>([{
    url:"https://github.com/",
    name:"Github",
    id:"1234"
},{
    url:"https://github.com/",
    name:"Github1",
    id:"1235"
},{
    url:"https://github.com/",
    name:"Github2",
    id:"1236"
},{
    url:"https://github.com/",
    name:"Github3",
    id:"1237"
},{
    url:"https://github.com/",
    name:"Github4",
    id:"1238"
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

.link-add{
    float: left;
    width: 71px;
    height: 100px;
    position: relative;
    .b{
        width: 50px;
        height: 50px;
        border-radius:50%;
        background-color: #eee;
        display:flex;
        justify-content: center;
        align-items:center;
        margin: 10px 5px;
        color:#555;
        cursor: pointer;
        transition: all .2s;
        &:hover{
            background-color: #e7e7e7;
        }
        &:active{
            transform: scale(0.85);
        }
        .m-icon{
            width: 25px;
            height: 25px;
        }
    }
}
</style>