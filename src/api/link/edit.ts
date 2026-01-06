import { getRandomCode } from "../util";
import { getGroupList, getLinks, removeGroupStore, setGroupList, setLinks, type Link, type LinkGroup } from "./core";

async function addLink(link:Link, groupId:string|symbol, index?:number){
    await addLinks([link], groupId, index);
}

async function addLinks(links:Link[], groupId:string|symbol, index?:number){
    let curLinks=await getLinks(groupId);
    if(typeof index=="undefined") index=curLinks.length;
    for(let i=0;i<links.length;i++){
        (links[i] as Link).id=getRandomCode();
    }
    curLinks.splice(index,0,...links);
    await setLinks(groupId, curLinks);
}

async function editLink(groupId:string|symbol, index:number, newLink:Link){
    let curLinks=await getLinks(groupId);
    curLinks[index]=newLink;
    await setLinks(groupId, curLinks);
}

async function moveLink(fromGroupId:string|symbol, fromIndex:number, toGroupId:string|symbol, toIndex:number){
    if(fromGroupId==toGroupId){
        let curLinks=await getLinks(fromGroupId);
        if(fromIndex>curLinks.length-1||toIndex>curLinks.length-1){
            return;
        }
        let link=curLinks.splice(fromIndex,1)[0] as Link;
        curLinks.splice(toIndex,0,link);
        await setLinks(fromGroupId, curLinks);
    }else{
        let fromLinks=await getLinks(fromGroupId);
        let toLinks=await getLinks(toGroupId);
        if(fromIndex>fromLinks.length-1||toIndex>toLinks.length-1){
            return;
        }
        let link=fromLinks.splice(fromIndex,1)[0] as Link;
        toLinks.splice(toIndex,0,link);
        await setLinks(fromGroupId, fromLinks);
        await setLinks(toGroupId, toLinks);
    }
}

async function deleteLink(groupId:string|symbol, index:number){
    let curLinks=await getLinks(groupId);
    curLinks.splice(index,1);
    await setLinks(groupId, curLinks);
}

function addGroup(name:string,index?:number){
    let curGroups=getGroupList();
    if(typeof index=="undefined") index=curGroups.length;
    let newGroup={id:getRandomCode(),name,links:[]};
    curGroups.splice(index,0,newGroup);
    setGroupList(curGroups);
}

function editGroup(id:string, newName:string){
    let curGroups=getGroupList();
    for(let i=0;i<curGroups.length;i++){
        if((curGroups[i] as LinkGroup).id==id){
            (curGroups[i] as LinkGroup).name=newName;
            setGroupList(curGroups);
            return;
        }
    }
}

async function deleteGroup(id:string){
    let curGroups=getGroupList();
    let tgid='';
    for(let i=0;i<curGroups.length;i++){
        if((curGroups[i] as LinkGroup).id==id){
            tgid=id;
            curGroups.splice(i,1);
            setGroupList(curGroups);
            break;
        }
    }
    if(!tgid)return;
    await removeGroupStore(tgid);
}

function moveGroup(fromIndex:number, toIndex:number){
    let curGroups=getGroupList();
    if(fromIndex>curGroups.length-1||toIndex>curGroups.length-1)return;
    let group=curGroups.splice(fromIndex,1)[0] as LinkGroup;
    curGroups.splice(toIndex,0,group);
    setGroupList(curGroups);
}

export {
    addLink,
    addLinks,
    editLink,
    moveLink,
    deleteLink,
    addGroup,
    editGroup,
    deleteGroup,
    moveGroup
}