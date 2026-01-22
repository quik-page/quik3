import type { VNode } from "vue"

interface MenuItem {
    title: string,
    icon?: string | VNode,
    click: () => void,
    disabled?: boolean
}

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

type SearchEngines = { [key: string]: string };

interface ValParser{
    check(val:string):boolean,
    icon:string|(()=>VNode),
    tobtn:string|(()=>VNode),
    enter(val:string):void
}

interface SugCreator{
    check(val:string):boolean,
    create(val:string,get:()=>Sug[],cb:(sugs:Sug[])=>void):void,
    interrupt?():void
}

interface Sug{
    icon:string|(()=>VNode),
    text:string,
    enter:(val:string)=>void,
    id?:string
}

interface EventHandle {
    on:(event:string, listener:Function)=>void,
    off:(event:string, listener:Function)=>void,
    emit:(event:string, data?:any)=>void,
    clear:(event:string|null)=>void,
    _listeners:{[event:string]:Function[]}
}

interface LinkEditCBEvent{
    link:Link,
    index:number
} 

export type {
    MenuItem,
    VNode,
    Link,
    LinkGroup,
    SearchEngines,
    ValParser,
    SugCreator,
    Sug,
    EventHandle,
    LinkEditCBEvent
}

