import localforage from "localforage";
import {getRandomCode} from "./util";

const storage=JSON.parse(localStorage.getItem('quik3')||"{}");

function getValue(key:string,useidb=false){
    let keys=key.split("-");
    let t=storage;
    for(let k of keys){
        if(typeof t!="object"||t["^type"]=="idb"){
            return null;
        }
        t=t[k];
    }
    if(useidb){
        if(typeof t!="object"||t["^type"]!="idb"){
            throw new Error(key+" is not a idb type.")
        }
        return localforage.getItem(t.hash);
    }else{
        return t;
    }
}

function setValue(key:string,value:any,useidb=false){
    let keys=key.split("-");
    let t=storage;
    for(let i=0;i<=keys.length;i++){
        let k=keys[i] as string;
        if(typeof t[k]=="undefined"){
            t[k]={};
        }else if(typeof t[k]!="object"||t[k]["^type"]=="idb"){
            throw new Error("Cannot break a value of not object to set at "+key);
        }
        t=t[k];
    }
    let ki=keys[keys.length-1] as string;
    if(useidb){
        let hash=getRandomCode();
        t[ki]=hash;
        return localforage.setItem(hash,value);
    }
    save();
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

export {
    getValue,
    setValue
}