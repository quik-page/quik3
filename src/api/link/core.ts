import getEventHandle from "../getEventHandle";
import { getValue, removeValue, setValue } from "../storage";
import type { Link, LinkGroup } from "../types";

let ev=getEventHandle();
const defSym = Symbol("default");

async function getLinks(groupId:string|symbol):Promise<Link[]> {
    let links;
    if(typeof groupId=="symbol") {
        if(groupId === defSym)links = await getValue("links-def",true);
        else throw new Error("Invalid symbol");
    }else{
        links = await getValue(`links-${groupId as string}`,true);
        if(!links) throw new Error("Group not found");
    }
    return links;
}

async function setLinks(groupId:string|symbol, links:Link[]) {
    if(typeof groupId=="symbol") {
        if(groupId === defSym) {
            await setValue("links-def", links,true);
        }
    }else{
        await setValue(`links-${groupId as string}`, links,true);
    }
    ev.emit("linkchange",{
        groupId,
        links
    })
}

function getGroupList():LinkGroup[]{
    return getValue("links-groups") || [];
}

function setGroupList(groups:LinkGroup[]){
    ev.emit("groupchange",{groups});
    return setValue("links-groups", groups);
}

async function removeGroupStore(groupId:string){
    await removeValue(`links-${groupId}`,true);
}

export {
    defSym,
    getLinks,
    setLinks,
    getGroupList,
    setGroupList,
    removeGroupStore,
    ev
}