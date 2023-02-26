import{g as f,_ as k,r as h,o as a,c as l,e as t,i as d,n as m,t as r,f as v,w as y,d as c,v as u,p as w,j as x}from"./index-70ea3a64.js";const p={props:{task:{},hasRemove:{type:Boolean,default:!1},hasDone:{type:Boolean,default:!1},hasUndo:{type:Boolean,default:!1},hasEdit:{type:Boolean,default:!1},hasPin:{type:Boolean,default:!1},showEdit:{type:Boolean,default:!0}},methods:{...f("TasksStore",["remove","done","undo","pin","unpin"])}},n=o=>(w("data-v-981428df"),o=o(),x(),o),g={class:"border rounded-md flex flex-wrap flex-row md:flex-col items-start px-4 py-2 hover:shadow-md"},B={class:"flex flex-row flex-grow items-center gap-4"},b=["name"],C={class:"flex flex-row gap-2 items-center justify-center text-ellipsis break-all"},S={class:"linkGroup"},D=n(()=>t("i",{class:"material-icons"},"delete_outline",-1)),E=[D],I=n(()=>t("i",{class:"material-icons"},"restore",-1)),N=[I],P=n(()=>t("i",{class:"material-icons"},"info_outline",-1)),j=n(()=>t("i",{class:"material-icons"},"favorite_outline",-1)),R=[j],U=n(()=>t("i",{class:"material-icons"},"favorite",-1)),V=[U];function q(o,s,e,z,A,G){const _=h("router-link");return a(),l("li",g,[t("div",B,[e.hasDone&&!e.task.done?(a(),l("input",{key:0,type:"radio",onClick:s[0]||(s[0]=i=>o.done(e.task)),name:e.task.id,value:"1",class:"w-5 h-5 border border-black"},null,8,b)):d("",!0),t("div",C,[t("p",{class:m(["flex-grow font-medium",{"line-through":e.task.done}])},[t("strong",null,r(e.task.text),1),t("p",null,r(e.task.notes),1)],2)])]),t("div",S,[e.hasRemove?(a(),l("button",{key:0,onClick:s[1]||(s[1]=i=>o.remove(e.task))},E)):d("",!0),e.hasUndo?(a(),l("button",{key:1,onClick:s[2]||(s[2]=i=>o.undo(e.task))},N)):d("",!0),e.hasEdit?(a(),v(_,{key:2,to:{path:"/edit",query:{task:JSON.stringify(this.task)}},class:"link"},{default:y(()=>[P]),_:1},8,["to"])):d("",!0),c(t("button",{onClick:s[3]||(s[3]=i=>o.pin(e.task))},R,512),[[u,e.hasPin&&!e.task.pin]]),c(t("button",{onClick:s[4]||(s[4]=i=>o.unpin(e.task))},V,512),[[u,e.hasPin&&e.task.pin]])])])}const O=k(p,[["render",q],["__scopeId","data-v-981428df"]]);export{O as t};
