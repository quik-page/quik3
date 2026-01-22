import localforage from "localforage";
import {getRandomCode} from "./util";

const storage=JSON.parse(localStorage.getItem('quik3')||"{}");

function getValue(key:string,useidb=false){
    let keys=key.split("-");
    let t=storage;
    for(let k of keys){
        t=t[k];
        if(typeof t!="object"){
            return null;
        }
    }
    if(useidb){
        if(t["-t"]!=="idb"){
            throw new Error(key+" is not a idb type.");
        }
        return localforage.getItem(t['-v']);
    }else{
        return t['-v'];
    }
}

function setValue(key:string,value:any,useidb=false){
    let keys=key.split("-");
    let t=storage;
    for(let i=0;i<keys.length;i++){
        let k=keys[i] as string;
        if(typeof t[k]=="undefined"){
            t[k]={};
        }else if(typeof t[k]!="object"){
            // I can assign it's impossible to reach here.
            console.assert(false,"setValue reach not a object")
            throw new Error("Cannot break a value of not object to set at "+key);
        }
        t=t[k];
    }
    if(useidb){
        if(t["-t"]!=="idb"){
            t["-t"]="idb";
            t["-v"]=getRandomCode();
            save();   
        }
        return localforage.setItem(t["-v"],value);
    }else{
        t["-v"]=value;
        save();
    }
}

function removeValue(key:string,useidb=false){
    let keys=key.split("-");
    let t=storage;
    for(let i=0;i<keys.length-1;i++){
        let k=keys[i] as string;
        if(typeof t[k]!="object"){
            return;
        }
        t=t[k];
    }
    let ki=keys[keys.length-1] as string;
    if(typeof t[ki]!="object")return;
    if(useidb){
        if(t["-t"]=="idb"){
            let hash=t[ki]["-v"];
            delete t[ki]["-t"];
            delete t[ki]["-v"];
            if(Object.keys(t[ki]).length==0){
                delete t[ki];
            }
            save();
            return localforage.removeItem(hash);
        }else{
            delete t[ki]["-v"];
            if(Object.keys(t[ki]).length==0){
                delete t[ki];
            }
            save();
            return Promise.resolve();
        }
    }else{
        delete t[ki]["-v"];
        if(Object.keys(t[ki]).length==0){
            delete t[ki];
        }
        save();
    }
}

let rdsave:any=undefined;
function save(){
    if(typeof rdsave=="undefined"){
        rdsave=setTimeout(()=>{
            localStorage.setItem("quik3",JSON.stringify(storage));
            rdsave=undefined;
        },100);
    }
}

window.getValue=getValue;
window.setValue=setValue;
window.removeValue=removeValue;

export {
    getValue,
    setValue,
    removeValue
}