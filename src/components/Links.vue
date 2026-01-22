<template>
    <div class="links">
        <div class="group-con" :style="{
            display:enableGroup? 'block' : 'none'
        }">
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
            <LinkItem v-for="link in links" :key="link.id" :link="link" @contextmenu="openMenu($event, link)"></LinkItem>
            <div class="link-add">
                <div class="b" @click="openAddLink()">
                    <MIcon name="add"></MIcon>
                </div>
            </div>
        </div>
    </div>
    <Menu :items='linkEditMenu' v-model:show="showLinkMenu" :style="{top: linkMenuPos_t+'px',left:linkMenuPos_l+'px'}"></Menu>
    <Teleport to=".dialogs">
        <Addlink v-model:show="showLinkedit" :type="(edittype as 'add'|'edit')" 
        v-model:icon="le_ICON"
        v-model:url="le_URL"
        v-model:title="le_TITLE"
        v-model:position="le_POSITION"
        :Max="leMax"
        @cb="linkEditCB"
        />
    </Teleport>
</template>

<script lang="ts" setup>
import { ref, Teleport, watch } from 'vue';
import { addLink, defSym, deleteLink, editLink, getGroupList, getLinks, linkEv, moveLink, ready } from '../api/link';
import LinkItem from './Link.vue';
import MIcon from './MIcon.vue';
import Addlink from './dialogs/linkEdit.vue';
import Menu from './Menu.vue';
import type { Link, LinkEditCBEvent, LinkGroup, MenuItem } from '../api/types';
const activeGroup = ref('def');
const groups=ref<LinkGroup[]>(getGroupList());
const links = ref<Link[]>([]);
const edittype=ref('add');
const showLinkedit=ref(false);
const enableGroup=ref(false);
const linkEditMenu:MenuItem[]=[{
    title:"修改",
    click:()=>{
        openEditLink();
    }
},
{
    title:"删除",
    click:()=>{  
        let ac:string|symbol=activeGroup.value;
        if(ac==="def"){
            ac=defSym;
        }    
        deleteLink(ac,targetLink?.id||'');
    }
}]
const showLinkMenu=ref(false);
const linkMenuPos_l=ref(0);
const linkMenuPos_t=ref(0);

function draw(newGroup:string){
    let q:string|symbol=newGroup;
    if(q=="def"){
        q=defSym;
    }
    getLinks(q).then(l => {
        if(activeGroup.value==newGroup){
            links.value=l;
        }
    })
}
watch(activeGroup,(newVal)=>{
    draw(newVal);
});

ready(()=>{
    draw(activeGroup.value);
})

linkEv.on("linkchange",(e:{groupId:string|symbol,links:Link[]})=>{
    if((e.groupId===defSym&&activeGroup.value==="def")||activeGroup.value===e.groupId){
        links.value=e.links;
    }
})


const le_TITLE=ref('');
const le_URL=ref('');
const le_POSITION=ref(0);
const le_ICON=ref('');
const leMax=ref(1000);
function openAddLink(){
    edittype.value='add';
    showLinkedit.value=true;
    le_TITLE.value='';
    le_URL.value='';
    le_POSITION.value=links.value.length;
    le_ICON.value='';
    leMax.value=links.value.length;
}

function openEditLink(){
    if(typeof targetLink==="undefined")return;
    edittype.value='edit';
    showLinkedit.value=true;
    le_TITLE.value=targetLink?.name||'';
    le_URL.value=targetLink?.url||'';
    for(let i=0;i<links.value.length;i++){
        if((links.value[i] as Link).id==targetLink.id){
            le_POSITION.value=i;
            break;
        }
    }
    le_ICON.value=targetLink?.icon||'';
    leMax.value=links.value.length-1;
}

async function linkEditCB(n:LinkEditCBEvent){
    if(edittype.value=='add'){
        await addLink(n.link, activeGroup.value, n.index).then(()=>draw(activeGroup.value));
    }else if(edittype.value=='edit'){        
        let ac:string|symbol=activeGroup.value;
        if(ac==="def"){
            ac=defSym;
        }
        await editLink(ac,targetLink?.id||'',n.link);
        await moveLink(ac,targetLink?.id||'',ac,n.index);
    }
}

let targetLink:Link|undefined=void 0;
function openMenu(e: MouseEvent, link: Link){
    e.preventDefault();
    showLinkMenu.value=true;
    targetLink=link;
    let x=e.pageX,y=e.pageY;
    if(x+100>window.innerWidth){
        x-=100;
    }
    let h=linkEditMenu.length*30;
    if(y+h>window.innerHeight){
        y-=h;
    }
    linkMenuPos_l.value=x;
    linkMenuPos_t.value=y;
}

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
            cursor:pointer;
            user-select:none;

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