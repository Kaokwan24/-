import{load,save,addItem,remember,relate}from"./state.js";import{hud,toast,go}from"./game.js";
const s=load(); if(s.day!==1){s.day=1;s.time="เย็น";s.weather="ฝน";s.flags={...s.flags,day1Phase:"room",ticketSeen:false,cassetteSeen:false,paperSeen:false};save(s)}
const $=q=>document.querySelector(q); const phase=()=>load().flags.day1Phase||"room";
const text=$('#text'),who=$('#who'),actions=$('#actions'),title=$('#objectiveTitle'),desc=$('#objectiveText'),place=$('#place'),scene=$('#scene');
function render(){const p=phase();hud();actions.innerHTML="";
 if(p==="room"){place.textContent="วันอังคาร · 17:42 น. · ฝนตก";who.textContent="ความเงียบ";text.textContent="คุณตื่นขึ้นมาในห้อง 204 ทั้งที่จำไม่ได้ว่ามาถึงเมืองนี้ตั้งแต่เมื่อไร\nฝนกำลังเคาะกระจกเหมือนคนที่ไม่อยากเข้ามา แต่ก็ยังไม่ยอมกลับไป";title.textContent="ลองดูของบนโต๊ะ";desc.textContent="ของสามอย่างวางอยู่ตรงนั้น เหมือนใครบางคนรู้ว่าคุณจะตื่นวันนี้";
 [["ดูตั๋วรถไฟ","ticket"],["เปิดเทป","cassette"],["อ่านกระดาษ","paper"]].forEach(([t,id])=>{const b=document.createElement("button");b.textContent=t;b.onclick=()=>inspect(id);actions.append(b)});
 } else if(p==="street"){place.textContent="18:16 น. · ถนนหน้าห้อง · ฝนซา";who.textContent="เมือง";text.textContent="คุณเดินออกมา ฝนเบาลงจนได้ยินเสียงรถไฟจากปลายเมือง\nสถานีอยู่ไม่ไกล และตั๋วในมือมีเวลา 18:20 น.";title.textContent="ตามตั๋วไป";desc.textContent="เป้าหมายแรกของคืนนี้: ไปดูว่าสถานีรู้จักตั๋วใบนี้หรือเปล่า";
 const b=document.createElement("button");b.textContent="เดินไปสถานี";b.onclick=()=>{save({...load(),flags:{...load().flags,day1Phase:"station"},time:"เย็น"});render()};actions.append(b);
 } else if(p==="station"){scene.classList.add("station-scene");place.textContent="18:20 น. · สถานีปลายราง";who.textContent="ชายเฝ้าชานชาลา";text.textContent="ชายชราคนนั้นมองตั๋วในมือคุณนานกว่าที่คนปกติควรมอง\n“อ้าว… กลับมาแล้วเหรอ”\nเขาพูดเหมือนประโยคนี้เคยเกิดขึ้นมาก่อน";title.textContent="เลือกว่าจะถามอะไร";desc.textContent="คุณยังจำเขาไม่ได้ แต่เขาดูเหมือนจำคุณได้";
 [["ถามว่าเคยเจอกันไหม","ask"],["ถามเรื่องตั๋ว","ticketask"],["ไม่ถามอะไร","quiet"]].forEach(([t,id])=>{const b=document.createElement("button");b.textContent=t;b.onclick=()=>station(id);actions.append(b)});
 } else {place.textContent="19:03 น. · ทางกลับห้อง";who.textContent="บันทึกของวันนี้";text.textContent="คุณยังไม่ได้คำตอบ แต่ได้บางอย่างที่แปลกกว่า\nคนแปลกหน้าคนหนึ่งจำคุณได้ และคุณเองก็เริ่มสงสัยว่า… คนที่ลืม อาจไม่ใช่คุณคนเดียว";title.textContent="วันนี้พอแค่นี้";desc.textContent="กลับห้อง แล้วเข้านอนเพื่อดูว่าวันพรุ่งนี้เมืองจะเปลี่ยนไปอย่างไร";
 const b=document.createElement("button");b.textContent="กลับห้อง 204";b.onclick=()=>{location.href="room.html"};actions.append(b)}
}
function inspect(id){const st=load();if(id==="ticket"){addItem("ตั๋วรถไฟเก่า");remember("ตั๋วรถไฟระบุเวลา 18:20 และช่อง E17");st.flags.ticketSeen=true;save(st);toast("ตั๋วมีวันที่ที่คุณจำไม่ได้ว่าเคยใช้");}
if(id==="cassette"){addItem("เสียงจากเทป");remember("เทปพูดด้วยเสียงของคุณเอง: “ถ้าได้ยินอันนี้ แปลว่าเรายังไม่ได้ลืมทั้งหมด”");st.flags.cassetteSeen=true;save(st);toast("เสียงในเทปเป็นเสียงของคุณ");}
if(id==="paper"){remember("กระดาษบนโต๊ะ: ถ้ากลับไปที่เดิมอีกครั้ง จะจำอะไรได้ไหม?");st.flags.paperSeen=true;save(st);toast("ลายมือบนกระดาษเหมือนลายมือของคุณ");}
const n=load();if(n.flags.ticketSeen&&n.flags.cassetteSeen&&n.flags.paperSeen){n.flags.day1Phase="street";save(n)}render()}
function station(id){const st=load(); if(id==="ask"){relate("station",1);remember("ชายเฝ้าชานชาลาพูดว่า: “เธอเคยมาที่นี่มาก่อน”");toast("เขาตอบว่า “ฉันจำเธอได้ แต่เธออาจยังจำฉันไม่ได้”")}
if(id==="ticketask"){remember("ตั๋วใบนี้ถูกใช้ไปแล้วครั้งหนึ่ง ทั้งที่วันที่บนตั๋วคือวันนี้");toast("เขาแตะตราประทับเก่าบนตั๋วเบา ๆ")}
if(id==="quiet"){remember("ฉันเลือกไม่ถาม และเสียงรถไฟก็ผ่านไป");toast("รถไฟมาแล้วก็ไป โดยไม่รอคำตอบ")}
st.flags.day1Phase="done";save(st);render()}
render();