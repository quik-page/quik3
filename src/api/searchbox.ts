import { h, type VNode } from "vue";
import { getValue, setValue } from "./storage"
import MIcon from "../components/MIcon.vue";
import { checkUrl } from "./util";
import FavIcon from "../components/FavIcon.vue";

type SearchEngines = { [key: string]: string };

const defEngines: SearchEngines = {
    google:"https://www.google.com/search?q=",
    bing:"https://www.bing.com/search?q=",
    baidu:"https://www.baidu.com/s?wd=",
    sogou:"https://www.sogou.com/web?query=",
    so:"https://www.so.com/s?q=",
    duckduckgo:"https://duckduckgo.com/?q=",
    yahoo:"https://search.yahoo.com/search?p=",
    bilibili:"https://search.bilibili.com/all?keyword=",
    youtube:"https://www.youtube.com/results?search_query=",
    github:"https://github.com/search?q=",
    kugou:"https://www.kugou.com/yy/html/search.html?keyword=",
    qqmusic:"https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=",
    ncm:"https://music.163.com/#/search/m/?s=",
    jd:"https://search.jd.com/Search?keyword=",
    taobao:"https://s.taobao.com/search?q=",
}

const userDefEngines: SearchEngines={
    bing:"",baidu:"",google:"",sogou:""
}

function getUserEngines(){
    return getValue("searchbox-engines")||userDefEngines;
}

function getUserNowEngine(){
    let k:string=getValue("searchbox-nowengine")||"bing";
    if(defEngines.hasOwnProperty(k)){
        let n=defEngines[k];
        return n+"%keyword%";
    }
    return getUserEngines()[k]
}

function search(query:string){
    const engine=getUserNowEngine();
    const url=engine.replace("%keyword%",encodeURIComponent(query));
    window.open(url,"_blank");
}

function setNowEngine(engine:string){
    let engines=getUserEngines();
    if(engines.hasOwnProperty(engine)){
        setValue("searchbox-nowengine",engine);
    }else{
        throw new Error("Engine not found");
    }
}

function setUserEngines(engines:{[key:string]:string}){
    if(Object.keys(engines).length===0){
        throw new Error("Engines cannot be empty");
    }
    setValue("searchbox-engines",engines);
    if(!engines.hasOwnProperty(getValue("searchbox-nowengine"))){
        setValue("searchbox-nowengine",Object.keys(engines)[0]);
    }
}

interface ValParser{
    check(val:string):boolean,
    icon:string|(()=>VNode),
    tobtn:string|(()=>VNode),
    enter(val:string):void
}

const valParsers:ValParser[]=[{
    check:checkUrl,
    icon:()=>h(MIcon,{name:"earth"}),
    tobtn:()=>h(MIcon,{name:"linkto"}),
    enter(val){
        if(!val.startsWith("http")){
            val="http://"+val;
        }
        window.open(val);
    }
},{
    check:()=>true,
    icon:()=>h(FavIcon,{url:getUserNowEngine()}),
    tobtn:()=>h(MIcon,{name:"search"}),
    enter(val){
        search(val);
    }
}];

interface SugCreator{
    check(val:string):boolean,
    create(val:string,get:()=>Sug[],cb:(sugs:Sug[])=>void):void,
    interrupt?():void
}

interface Sug{
    icon:string|(()=>VNode),
    text:string,
    enter:(val:string)=>void
}

const sugCreators:SugCreator[]=[{
    check:()=>true,
    create(val,get,cb){
        let s=get();
        s.unshift({
            icon:()=>h(MIcon,{name:"search"}),
            text:val,
            enter(val){
                search(val);
            }
        })
        cb(s);
    }
}]

function checkVal(val:string):ValParser{
    for(let p of valParsers){
        if(p.check(val)){
            return p;
        }
    }
    // 事实上这里可以断言不会执行到这里
    return valParsers[valParsers.length-1] as ValParser;
}

function geneSug(val:string,cb:(sugs:Sug[])=>void){
    let sugs:Sug[]=[];
    let cs:SugCreator[]=[];
    for(let c of sugCreators){
        if(c.check(val)){
            c.create(val,()=>sugs,cb);
            cs.push(c);
        }
    }
    return {
        abort(){
            cs.forEach(c=>c.interrupt?.());
        }
    }
}

function registerSugCreator(c:SugCreator){
    sugCreators.unshift(c);
}

function registerValParser(p:ValParser){
    valParsers.unshift(p);
}

export {search,getUserEngines,getUserNowEngine,defEngines,setNowEngine,setUserEngines,checkVal,geneSug,registerSugCreator,registerValParser};