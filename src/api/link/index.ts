import { getValue } from "../storage";
import {
    getLinks,
    setLinks,
    defSym,
    getGroupList,
    setGroupList,
    ev as linkEv
} from "./core";
import {
    addLink,
    addLinks,
    editLink,
    moveLink,
    deleteLink,
    addGroup,
    editGroup,
    deleteGroup,
    moveGroup
} from "./edit";

let readys:Function[]=[];
let isready=false;
function ready(fn:Function){
    if(isready){
        fn();
        return;
    }
    readys.push(fn);
    isready=true;
}

if(!getValue("links-def")){
    setLinks(defSym,[{
        name:"百度翻译",
        url:"https://fanyi.baidu.com/",
        id:"a"
    },{
        name:"哔哩哔哩",
        url:"https://www.bilibili.com/",
        id:"b"
    },{
        name:"知乎",
        url:"https://www.zhihu.com/",
        id:"c"
    },{
        name:"网易云音乐",
        url:"https://music.163.com/",
        id:"d"
    },{
        name:"GitHub",
        url:"https://github.com/",
        id:"e"
    }]).then(()=>{
        isready=true;
        readys.forEach(fn=>fn());
    })
}else{
    isready=true;
    readys.forEach(fn=>fn());
}

export {
    getLinks,
    setLinks,
    defSym,
    getGroupList,
    setGroupList,
    addLink,
    addLinks,
    editLink,
    moveLink,
    deleteLink,
    addGroup,
    editGroup,
    deleteGroup,
    moveGroup,
    linkEv,
    ready
}