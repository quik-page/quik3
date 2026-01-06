import { getValue, removeValue, setValue } from "../storage";

const defSym = Symbol("default");

interface Link {
    name: string;
    url: string;
    icon?: string;
    id?: string;
}

interface LinkGroup {
    id: string;
    name: string;
}

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
}

function getGroupList():LinkGroup[]{
    return getValue("links-groups") || [];
}

function setGroupList(groups:LinkGroup[]){
    return setValue("links-groups", groups);
}

async function removeGroupStore(groupId:string){
    await removeValue(`links-${groupId}`,true);
}

export {
    type Link,
    type LinkGroup,
    defSym,
    getLinks,
    setLinks,
    getGroupList,
    setGroupList,
    removeGroupStore
}