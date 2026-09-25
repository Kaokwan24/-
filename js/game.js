import{load,save,addItem,remember,relate,journal,nextDay,reset}from "./state.js";
export const $=s=>document.querySelector(s);
export function state(){return load()}
export function hud(){const s=load();const h=$("[data-hud]");if(h)h.innerHTML='<span class="chip">วันที่ '+s.day+'</span><span class="chip">'+s.time+'</span><span class="chip">อากาศ '+s.weather+'</span><span class="chip">เงิน '+s.money+' ฿</span><span class="chip">ของ '+s.inventory.length+'</span>'}
export function toast(t){let e=$(".toast");if(!e){e=document.createElement("div");e.className="toast";document.body.append(e)}e.textContent=t;e.classList.remove("hidden");clearTimeout(window.__toast);window.__toast=setTimeout(()=>e.classList.add("hidden"),3200)}
export function go(url){location.href=url}
export function action(fn){try{fn();hud()}catch(e){console.error(e);toast("บางอย่างในเมืองนี้เงียบเกินไป ลองใหม่อีกครั้ง")} }
export function saveJournal(){const t=$("#journal")?.value||"";if(t.trim()){journal(t);toast("เก็บข้อความนี้ไว้ในสมุดแล้ว");$("#journal").value=""}}
export function advance(t="เย็น"){const s=load();save({...s,time:t});hud()}
window.Game={load,state,hud,toast,go,action,addItem,remember,relate,saveJournal,advance,nextDay,reset};