(() => {
  const {ink,cream,mint,gold,coral,rect,poly,path,oval,text,mono,pixel,star,checker,food,burger}=RushKitchen.art;
  const {scenery,workstations,bolt}=RushKitchen.kitchen;
  function clock(seconds){const remain=Math.ceil(Math.max(0,seconds));return `${Math.floor(remain/60)}:${String(remain%60).padStart(2,'0')}`;}
  function hud(ctx,state,screen,muted,hover){
    rect(ctx,0,0,1280,64,ink);rect(ctx,0,61,1280,3,'#d49578');
    burger(ctx,[1,2,4,3,6],43,53,.81);pixel(ctx,'RUSH KITCHEN',90,10,3.4,cream);mono(ctx,'STARLINE DINER   /   ARCADE SERIES 01',92,41,12,'#e4aa87');
    const elapsed=screen==='title'?0:state.elapsed, score=screen==='title'?0:state.score, streak=screen==='title'?0:state.streak;
    const stats=[[542,'SHIFT CLOCK',clock(90-elapsed),elapsed>75?coral:cream],[763,'TILL / COINS',String(score).padStart(3,'0'),gold],[973,'COMBO',`X${RushKitchen.multiplier(streak).toFixed(1)}`,mint]];
    for(const [left,label,value,color] of stats){rect(ctx,left-21,11,2,40,'#5d4d59');mono(ctx,label,left,9,12,'#d7bdad');pixel(ctx,value,left,27,3.45,color);}
    rect(ctx,1212,10,55,43,hover==='mute'?'#685663':'#423748');poly(ctx,[1222,27,1227,27,1234,21,1234,40,1227,34,1222,34],cream);
    if(muted){path(ctx,[1238,26,1246,35],coral,2);path(ctx,[1246,26,1238,35],coral,2);}else{path(ctx,[1238,26,1241,29,1241,32,1238,35],mint,2);path(ctx,[1242,22,1247,27,1247,34,1242,39],mint,2);}
    mono(ctx,'M',1256,25,11,'#d1b7a7','center');
  }
  const guestNames=['JO','VAL','MAX','RAY','KIT','LIV','SAM','BEA'];
  function portrait(ctx,left,top,id){
    const index=(id-101)%8,skin=['#ddb084','#a16b55','#eac497','#bd8567'][index%4],hair=['#5a3d47','#b56847','#443741','#78484a'][index%4];
    const tile=2;ctx.save();ctx.translate(left,top);ctx.scale(tile,tile);
    const colors={o:ink,h:hair,s:skin,w:cream,t:['#669e8c','#c46c5f','#877797','#6e8caa'][index%4],r:'#a75d56'};
    const rows=['    oooooo    ','   ohhhhhoo   ','  ohhhhhhhoo  ','  ohssssssho  ','  osssssssso  ','  oosossosos  ','  osssssssoo  ','   ossrrsso   ','   osssssoo   ','    osssoo    ','  oottssstoo  ',' ottttwttttto ','otttttttttttto'];
    rows.forEach((row,y)=>[...row].forEach((char,x)=>{if(colors[char])rect(ctx,x,y,1,1,colors[char]);}));
    if(index%3===0){rect(ctx,2,2,11,2,'#c16959');rect(ctx,6,3,8,1,ink);}if(index%3===1){rect(ctx,2,5,9,1,ink);rect(ctx,4,5,2,1,'#b6cec4');rect(ctx,8,5,2,1,'#b6cec4');}
    ctx.restore();
  }
  function ticket(ctx,order,index,ready){
    const left=24+index*276,top=102,wide=260,high=139;
    const paper=['#fff1cc','#f5ddc7','#e3e8cd'][index%3],accent=['#b55b47','#527c70','#7a617c'][index%3];
    const shape=(dx,dy,color)=>{const edges=[left+dx,top+dy,left+wide+dx,top+dy,left+wide+dx,top+high+dy];for(let notch=0;notch<wide;notch+=10)edges.push(left+wide-5-notch+dx,top+high-4+dy,left+wide-10-notch+dx,top+high+dy);poly(ctx,edges,color);};
    shape(4,6,'#a7887e');shape(0,2,ink);shape(0,0,paper);rect(ctx,left+2,top+1,wide-4,3,accent);
    rect(ctx,left+114,top-14,31,18,'#4c404d');rect(ctx,left+117,top-13,25,7,'#9da2a0');rect(ctx,left+120,top-12,18,2,'#efe4ce');rect(ctx,left+119,top-3,21,6,'#645963');
    mono(ctx,`Nº ${order.id}   /   ${guestNames[(order.id-101)%8]}`,left+13,top+12,13,accent);portrait(ctx,left+217,top+10,order.id);
    text(ctx,order.recipe.name,left+12,top+32,26,ink,900);for(let col=0;col<wide-23;col+=8)rect(ctx,left+12+col,top+62,4,1,'#c6a995');
    order.recipe.layers.forEach((id,layer)=>{const center=left+31+layer*38;food(ctx,id,center,top+92,.46);mono(ctx,String(id),center,top+94,11,'#735c58','center');});
    const ratio=Math.max(0,order.remaining/order.patience);
    rect(ctx,left+13,top+113,163,10,'#cebaa4');rect(ctx,left+15,top+115,159*ratio,6,ratio<.28?'#ce6353':'#538977');
    mono(ctx,`${Math.max(0,Math.ceil(order.remaining))}s`,left+wide-13,top+109,15,ratio<.28?'#b44742':ink,'right');
    if(ready){rect(ctx,left+179,top+42,68,16,'#d0dfbe');mono(ctx,'READY',left+213,top+43,12,'#386d59','center');}
  }
  function board(ctx,state){
    rect(ctx,20,69,139,17,ink);mono(ctx,'ORDER RAIL / '+state.tickets.length,28,71,12,cream);
    if(state.tickets.length<2){
      ctx.save();ctx.translate(447,172);ctx.rotate(-.036);rect(ctx,-112,-38,224,80,'#ba9986');rect(ctx,-115,-42,224,79,'#f9dfb4');rect(ctx,-110,-37,214,69,'#8b6059');rect(ctx,-107,-34,208,63,'#f9dfb4');
      mono(ctx,'HOUSE RULE  /  01',-93,-27,11,'#875e58');text(ctx,'Made to order.',-94,-10,27,'#8d5950',800);rect(ctx,-14,-47,33,10,'#d9b58d');ctx.restore();
    }
    const ready=RushKitchen.match(state,state.pass);state.tickets.forEach((order,index)=>ticket(ctx,order,index,ready?.id===order.id));
  }
  function rail(ctx,state,hover){
    rect(ctx,0,547,1280,138,'#494251');rect(ctx,0,550,1280,16,'#38313f');mono(ctx,'INGREDIENT RAIL',29,549,14,cream);
    mono(ctx,'MISE EN PLACE   /   06 BINS',1247,550,11,'#d3bdac','right');
    const colors=['#eeb36b','#c9886d','#f1c754','#9fc779','#ed8b72','#edb375'];
    RushKitchen.ingredients.forEach((label,index)=>{
      const left=26+206*index,top=568,id=index+1,active=hover===String(id)||(state.lastAction===String(id)&&state.elapsed-state.lastPress<.13);
      rect(ctx,left,top,196,108,ink);rect(ctx,left+2,top+2,192,104,active?mint:'#a3a3a4');rect(ctx,left+5,top+4,186,98,'#d7d1bf');
      rect(ctx,left+8,top+7,180,62,'#514c58');rect(ctx,left+11,top+10,174,56,'#746c72');
      poly(ctx,[left+11,top+10,left+185,top+10,left+171,top+25,left+24,top+25],'#625c67');
      poly(ctx,[left+24,top+25,left+171,top+25,left+185,top+65,left+11,top+65],'#84797b');
      oval(ctx,left+104,top+54,52,8,'#625760');
      if(id!==2||state.stock.length>0)food(ctx,id,left+116,top+50,1.06);food(ctx,id,left+91,top+62,1.16);
      rect(ctx,left+10,top+8,25,24,ink);mono(ctx,String(id),left+22,top+11,17,cream,'center');
      if(id===2){const stock=state.stock.length;rect(ctx,left+143,top+9,39,18,ink);mono(ctx,`x${stock}`,left+162,top+11,13,stock?mint:cream,'center');}
      rect(ctx,left+8,top+72,180,25,active?'#d9edd2':'#fae5c3');rect(ctx,left+8,top+72,6,25,colors[index]);text(ctx,label.toUpperCase(),left+99,top+74,19,ink,800,'center');
    });
  }
  function strip(ctx,state,screen,hover){
    rect(ctx,0,686,1280,34,ink);rect(ctx,0,686,1280,2,'#96818a');
    let note='G to grill. Stack the ticket from left to right.';
    if(state.grill!==null)note=RushKitchen.doneness(state.grill)==='Burnt'?'Burnt patty! Click trash to clear the grill.':'Watch the meter. Lift in the mint zone for a bonus.';
    if(state.pass.length)note='Pickup is loaded. Ring the bell to serve.';
    if(state.noteAge>0)note=state.note;
    if(screen==='title')note='The grill is hot. The night shift is yours.';
    if(screen==='end')note='The grill is off. Thanks for working the line.';
    const hints={trash:'Trash: burnt patty first, then build plate, then pickup.',mute:'Toggle the diner sounds.',serve:'Ring the bell for the burger on pickup.',grill:'Drop a patty or lift it when cooked.'};
    if(hints[hover]&&state.noteAge<=0)note=hints[hover];
    rect(ctx,24,698,8,8,state.noteType==='error'&&state.noteAge>0?coral:mint);mono(ctx,'LINE RADIO',42,695,15,mint);mono(ctx,note,164,695,15,cream);
    mono(ctx,'STARLINE  /  NIGHT SERVICE',1252,697,12,'#d5ac97','right');
  }
  function marquee(ctx){
    rect(ctx,0,64,1280,620,'rgba(40,30,45,.24)');
    const edges=(left,top,wide,high,cut,color)=>poly(ctx,[left+cut,top,left+wide-cut,top,left+wide,top+cut,left+wide,top+high-cut,left+wide-cut,top+high,left+cut,top+high,left,top+high-cut,left,top+cut],color);
    edges(156,104,971,419,19,'#58434d');edges(149,96,974,420,21,ink);edges(154,101,964,410,17,'#d49a85');edges(158,105,956,402,15,'#fae3b6');edges(163,110,946,392,13,'#a56360');edges(167,114,938,384,10,'#302837');
    for(let offset=0;offset<14;offset++){const left=183+offset*68;rect(ctx,left,104,8,3,cream);rect(ctx,left,505,8,3,cream);}
    for(const left of [160,1106])for(const top of [143,468])bolt(ctx,left,top);
    for(let offset=0;offset<7;offset++){const left=183+offset*26;poly(ctx,[left,124,left+15,124,left+6,131,left-9,131],'#78505b');}
    checker(ctx,966,124,117,14,7,'#4c3948','#b98072');
  }
  function button(ctx,key,label,hover){
    const [left,top,wide,high]=RushKitchen.controls[key];rect(ctx,left+4,top+5,wide,high,ink);rect(ctx,left,top,wide,high,'#ac755e');rect(ctx,left,top,wide,high-5,hover===key?'#ffe3a1':gold);rect(ctx,left+4,top+3,wide-8,3,'#ffe7ab');
    poly(ctx,[left+20,top+15,left+36,top+25,left+20,top+35],ink);pixel(ctx,label,left+53,top+15,2.8,ink);
  }
  function title(ctx,time,hover){
    marquee(ctx);const bob=Math.sin(time*1.8)*3;
    mono(ctx,'S T A R L I N E   D I N E R   P R E S E N T S',231,151,13,mint);
    for(const [word,top,scale,front] of [['RUSH',181,10.7,gold],['KITCHEN',272,9.4,cream]]){
      pixel(ctx,word,234,top+7,scale,'#7d4350',{italic:true});pixel(ctx,word,232,top+4,scale,'#e57559',{italic:true});pixel(ctx,word,229,top,scale,front,{italic:true});
    }
    mono(ctx,'THE 90-SECOND BURGER RUSH',238,350,17,'#e4b9a4');button(ctx,'start','START SHIFT',hover);
    for(let index=0;index<9;index++){
      const top=217+index*14,left=672+(index%4)*19;poly(ctx,[left,top,840,top-17,831,top-12,left+24,top+2],index%3===0?'#a76b63':'#634555');
    }
    ctx.save();ctx.translate(882,307+bob);ctx.rotate(-.095);
    ctx.save();ctx.scale(1,.30);ctx.rotate(-.27);ctx.strokeStyle='#bc8976';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,98,172,112,0,Math.PI*.03,Math.PI*1.33);ctx.stroke();ctx.restore();
    burger(ctx,[1,2,3,4,5,6],0,119,3.05,2.7);ctx.restore();
    for(const [cx,cy,size,color] of [[736,181,13,mint],[1005,184,18,gold],[1037,221,7,cream],[719,392,10,gold],[1025,369,13,mint],[780,416,5,cream]])star(ctx,cx,cy,size,color);
    mono(ctx,'HOUSE SPECIAL  /  Nº 01',875,438,12,'#dbad96','center');
    rect(ctx,185,463,900,2,'#70525b');mono(ctx,'01  GRILL + LIFT [G]',207,475,14,mint);mono(ctx,'02  STACK IN ORDER [1-6]',488,475,14,cream);mono(ctx,'03  RING BELL [SPACE]',815,475,14,gold);
  }
  function result(ctx,state,best,hover){
    marquee(ctx);const count=RushKitchen.targets.filter(target=>state.score>=target).length;
    mono(ctx,'S T A R L I N E   /   C L O S I N G   T I M E',213,150,13,mint);
    pixel(ctx,'SHIFT',214,184,8,'#aa5a51',{italic:true});pixel(ctx,'SHIFT',211,178,8,gold,{italic:true});
    pixel(ctx,'COMPLETE',211,260,7.5,'#ae5e53',{italic:true});pixel(ctx,'COMPLETE',208,254,7.5,cream,{italic:true});
    for(let index=0;index<3;index++){
      const points=[];for(let ray=0;ray<10;ray++){const angle=-Math.PI/2+ray*Math.PI/5,radius=ray%2===0?24:11;points.push(243+index*61+Math.cos(angle)*radius,353+Math.sin(angle)*radius);}poly(ctx,points,index<count?gold:'#6d5562');
    }
    mono(ctx,['ROOKIE COOK','LINE COOK','GRILL ACE','DINER LEGEND'][count],414,345,16,mint);button(ctx,'restart','NEXT SHIFT',hover);
    const left=682,top=132,wide=359,height=347;
    rect(ctx,left+6,top+6,wide,height,'#211d29');rect(ctx,left,top,wide,height,cream);for(let notch=0;notch<wide;notch+=12)poly(ctx,[left+notch,top+height,left+notch+6,top+height-6,left+notch+12,top+height], '#302837');
    mono(ctx,'STARLINE DINER   /   REGISTER 01',left+wide/2,top+16,13,'#89625a','center');pixel(ctx,'SHIFT TOTAL',left+42,top+43,3.9,ink);
    const rule=level=>{for(let col=0;col<wide-36;col+=9)rect(ctx,left+18+col,top+level,5,2,'#bc9c85');};rule(85);
    for(const [index,[label,value]] of [['Burgers served',state.served],['Perfect sears served',state.perfects],['Tips collected',state.tips],['Best streak',`${state.peak}x`],['Tickets expired',state.missed]].entries()){
      mono(ctx,label,left+24,top+99+index*24,16,'#624b4c');mono(ctx,String(value),left+wide-26,top+99+index*24,16,ink,'right');
    }
    rule(229);mono(ctx,'TOTAL COINS',left+23,top+250,16,ink);const digits=String(state.score);pixel(ctx,digits,left+wide-20-digits.length*29,top+240,4.8,'#38745f');rule(286);
    mono(ctx,`PERSONAL BEST   ${best}`,left+wide/2,top+299,14,'#80574c','center');
    for(let index=0;index<52;index++)rect(ctx,left+74+index*4,top+321,1+(index*7%3),9+(index%4===0?3:0),'#7e6861');
    mono(ctx,'STAR TARGETS    75  /  200  /  400 COINS',217,475,13,'#d9b7a3');
  }
  function createRenderer(canvas){
    const ctx=canvas.getContext('2d',{alpha:false}),back=scenery();
    return function draw(state,screen,options={}){
      const {time=0,hover=null,muted=false,best=0}=options;
      ctx.imageSmoothingEnabled=false;ctx.drawImage(back,0,0);board(ctx,state);workstations(ctx,state,time,screen==='play'?hover:null);rail(ctx,state,screen==='play'?hover:null);
      if(screen==='title')title(ctx,time,hover);else if(screen==='end')result(ctx,state,best,hover);
      hud(ctx,state,screen,muted,hover);strip(ctx,state,screen,hover);
    };
  }
  Object.assign(RushKitchen,{createRenderer,clock});
})();
