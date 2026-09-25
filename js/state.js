const KEY="deliook-state-v2";
const initial={day:1,time:"เย็น",weather:"ฝน",money:180,inventory:["ตั๋วรถไฟเก่า"],relationships:{month:0,mick:0,cat:0,station:0},memories:[],journal:[],flags:{cassette:false,letter:false,photo:false,lastEvent:""},settings:{sound:true,textSpeed:"normal"}};
const clone=o=>JSON.parse(JSON.stringify(o));
export function load(){try{const raw=JSON.parse(localStorage.getItem(KEY)||"{}");return {...clone(initial),...raw,relationships:{...initial.relationships,...(raw.relationships||{})},flags:{...initial.flags,...(raw.flags||{})},settings:{...initial.settings,...(raw.settings||{})},inventory:Array.isArray(raw.inventory)?raw.inventory:[...initial.inventory],memories:Array.isArray(raw.memories)?raw.memories:[],journal:Array.isArray(raw.journal)?raw.journal:[]}}catch{return clone(initial)}}
export function save(s){localStorage.setItem(KEY,JSON.stringify(s));return s}
export function patch(p){const s=load();return save({...s,...p,relationships:{...s.relationships,...(p.relationships||{})},flags:{...s.flags,...(p.flags||{})},settings:{...s.settings,...(p.settings||{})}})}
export function addItem(item){const s=load();if(!s.inventory.includes(item))s.inventory.push(item);return save(s)}
export function remember(x){const s=load();if(!s.memories.includes(x))s.memories.push(x);return save(s)}
export function relate(who,n=1){const s=load();s.relationships[who]=(s.relationships[who]||0)+n;return save(s)}
export function journal(text){const s=load();if(text.trim())s.journal.push({day:s.day,text:text.trim(),time:new Date().toLocaleString("th-TH")});return save(s)}
export function nextDay(){const s=load();s.day++;s.time="เช้า";s.weather=["แดดอ่อน","ครึ้ม","ฝน"][s.day%3];s.flags.lastEvent="";return save(s)}
export function reset(){localStorage.removeItem(KEY);location.href="index.html"}
