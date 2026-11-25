(() => {
  const {ink,cream,mint,gold,coral,rect,poly,path,oval,text,mono,pixel,star,checker,food,burger}=RushKitchen.art;
  function bolt(ctx,left,top){rect(ctx,left,top,6,6,'#545462');rect(ctx,left+1,top,4,2,'#dde1ce');rect(ctx,left+1,top+3,3,1,ink);}
  function cityWindow(ctx){
    rect(ctx,866,65,414,214,'#635265');rect(ctx,873,70,407,200,'#dfbb9f');rect(ctx,878,74,402,191,'#4a415d');
    const colors=['#514661','#65516c','#866377','#b67e82','#df9b82'];
    colors.forEach((color,index)=>rect(ctx,880,76+index*25,400,26,color));
    oval(ctx,1192,131,31,31,'#ffbc90');
    for(let index=0;index<19;index++){
      const left=880+index*24, top=146+(index*37%48);
      rect(ctx,left,top,26,250-top,'#63566a');rect(ctx,left+5,top-5,16,5,'#63566a');
      for(let row=0;row<4;row++)for(let col=0;col<3;col++)if((index+row+col)%3!==0)rect(ctx,left+4+col*7,top+7+row*10,3,4,'#cb9992');
    }
    for(let index=0;index<9;index++){const left=876+index*50, top=178+index*19%25;rect(ctx,left,top,48,260-top,'#494657');rect(ctx,left+8,top-8,9,8,'#494657');for(let col=0;col<4;col++)rect(ctx,left+4+col*11,top+9,5,5,'#cf9e82');}
    path(ctx,[894,198,963,91], '#b492a0',2);path(ctx,[900,206,972,95],'#a08395',2);rect(ctx,1249,76,8,182,'#676073');rect(ctx,1250,76,2,182,'#b695a1');
    rect(ctx,866,252,414,10,'#a38d89');rect(ctx,864,250,416,4,'#f6d9bb');
  }
  function neonSign(ctx){
    path(ctx,[986,72,986,101,1135,101,1135,72],'#322c3e',3);
    poly(ctx,[920,111,1182,102,1165,172,903,181],ink);poly(ctx,[926,116,1175,108,1159,166,910,174],'#38605f');
    path(ctx,[925,126,929,119,1166,111],'#8ed6b7',3);path(ctx,[1156,161,1154,165,921,172],mint,3);
    ctx.save();ctx.translate(947,126);ctx.rotate(-.032);pixel(ctx,'STARLINE',0,0,3.3,'#183e43',{italic:true});pixel(ctx,'STARLINE',0,-2,3.3,'#f9c88b',{italic:true});mono(ctx,'D I N E R',67,26,12,mint);ctx.restore();
    star(ctx,922,113,16,gold);star(ctx,1168,163,11,cream);
  }
  function shaker(ctx,left,base,scale,style){
    ctx.save();ctx.translate(left,base);ctx.scale(scale,scale);
    if(style==='napkin'){
      poly(ctx,[-23,0,-23,-37,-16,-43,15,-43,24,-35,24,0],ink);rect(ctx,-20,-35,40,32,'#84959b');rect(ctx,-17,-39,31,5,'#edddc7');rect(ctx,-15,-32,26,26,'#c5caca');rect(ctx,-11,-30,20,19,'#444354');poly(ctx,[-9,-30,-9,-40,-5,-45,2,-43,8,-46,8,-29],cream);rect(ctx,-23,-3,47,4,'#635d6b');
    }else{
      const main=style==='red'?'#d6504b':'#e7a83e',light=style==='red'?'#f78965':'#ffd36a';
      poly(ctx,[-12,0,-13,-4,-12,-31,-7,-38,-6,-43,-3,-44,-1,-56,2,-56,4,-44,7,-43,8,-38,13,-32,13,-4,11,0],ink);
      poly(ctx,[-9,-2,-10,-30,-6,-36,6,-36,10,-30,10,-4,8,-2],main);rect(ctx,-7,-30,4,25,light);rect(ctx,-6,-42,13,6,cream);rect(ctx,-1,-52,3,10,light);rect(ctx,-10,-19,20,10,'#f7d6a1');rect(ctx,-6,-16,12,4,main);
    }ctx.restore();
  }
  function utensil(ctx,left,top,kind){
    rect(ctx,left-3,top,6,44,'#574a55');rect(ctx,left-2,top+2,2,40,'#c7b6a8');rect(ctx,left-5,top+35,10,12,'#9c6d59');
    if(kind%2===0){poly(ctx,[left-6,top+46,left+6,top+46,left+14,top+57,left+14,top+79,left-14,top+79,left-14,top+57],'#6e6871');rect(ctx,left-10,top+57,20,17,'#b4acaa');for(let col=0;col<3;col++)rect(ctx,left-7+col*6,top+59,2,12,'#6c6370');}
    else{oval(ctx,left,top+62,13,20,'#71636e');oval(ctx,left-2,top+60,9,15,'#bfb2aa');}
  }
  function scenery(){
    const base=document.createElement('canvas');base.width=1280;base.height=720;const ctx=base.getContext('2d');
    rect(ctx,0,0,1280,720,ink);rect(ctx,0,63,1280,280,'#d5ad97');
    const tiles=['#f3d3b1','#f0cfad','#ebc9a9','#f2d0b0','#eac7aa'];
    for(let row=0;row<5;row++)for(let col=-1;col<18;col++){
      const left=col*96+(row%2)*48,top=66+row*47;rect(ctx,left+2,top+2,92,43,tiles[(row*3+col+10)%5]);rect(ctx,left+4,top+3,88,2,'#f9ddbd');rect(ctx,left+91,top+6,2,36,'#e3bca2');
    }
    cityWindow(ctx);neonSign(ctx);
    rect(ctx,0,252,865,6,'#ae7974');checker(ctx,0,258,1280,22,11,'#f9d9b5','#bc6768');rect(ctx,0,280,1280,4,'#6d5158');
    rect(ctx,17,94,824,14,'#aa8983');rect(ctx,15,87,828,11,ink);rect(ctx,16,88,826,4,'#d4c5b4');rect(ctx,18,92,821,3,'#857d87');
    for(let index=0;index<3;index++)utensil(ctx,720+index*39,106,index);
    shaker(ctx,1130,248,.85,'napkin');shaker(ctx,1191,249,1,'red');shaker(ctx,1223,249,.83,'gold');
    for(const [left,width] of [[0,394],[398,408],[810,470]]){
      rect(ctx,left,284,width,44,'#4a4553');rect(ctx,left,286,width,3,'#96848b');rect(ctx,left,325,width,3,'#292332');bolt(ctx,left+8,303);bolt(ctx,left+width-13,303);
    }
    rect(ctx,0,328,1280,152,'#d3c1ae');rect(ctx,0,330,1280,7,'#ac9a99');rect(ctx,0,337,1280,3,'#e9d9c1');
    poly(ctx,[0,341,1280,341,1280,473,0,473],'#ddcbb3');
    for(let index=0;index<15;index++){const left=(index*143)%1280,top=347+(index*19)%110;rect(ctx,left,top,17+index%5*9,2,'#c7b5a5');}
    poly(ctx,[414,338,794,338,803,466,392,466],'#a88067');poly(ctx,[416,337,791,337,800,459,396,459],'#dcb183');
    for(let index=0;index<6;index++)path(ctx,[410,349+index*18,789,349+index*18],'#cfa078',1);
    rect(ctx,0,470,1280,9,'#fff0cc');rect(ctx,0,479,1280,57,'#ad6b59');rect(ctx,0,481,1280,6,'#c68367');
    for(let left=0;left<1280;left+=130){rect(ctx,left+4,488,2,43,'#9d5c53');rect(ctx,left+7,488,2,43,'#c27b61');}
    rect(ctx,0,532,1280,7,'#6d4650');rect(ctx,0,539,1280,5,ink);rect(ctx,0,544,1280,3,'#d9c0a5');
    return base;
  }
  function dish(ctx,cx,cy,scale,paper){
    oval(ctx,cx+4,cy+5,110*scale,24*scale,'#b59e94');oval(ctx,cx,cy,109*scale,24*scale,'#544958');oval(ctx,cx,cy-3,107*scale,23*scale,'#bab7b0');oval(ctx,cx,cy-6,106*scale,22*scale,cream);oval(ctx,cx,cy-6,91*scale,16*scale,'#79a399');oval(ctx,cx,cy-7,87*scale,14*scale,'#e6d5bf');
    if(paper){ctx.save();ctx.translate(cx,cy-8);ctx.transform(scale,.085*scale,-.56*scale,.52*scale,0,0);checker(ctx,-75,-37,150,72,12,'#ffe2ba','#e99b88');ctx.restore();}
  }
  function grill(ctx,state,time,hover){
    poly(ctx,[39,359,351,359,383,432,383,455,369,468,25,468,16,457,16,432],ink);
    poly(ctx,[42,362,348,362,376,431,21,431],'#bdc4bc');poly(ctx,[46,365,344,365,368,426,27,426],'#535160');poly(ctx,[49,369,341,369,361,421,33,421],'#302c3a');
    for(let index=0;index<14;index++){
      const left=49+index*22;path(ctx,[left,370,left-12+index*1.6,420],'#705055',7);path(ctx,[left,370,left-12+index*1.6,420],'#3e3743',3);
    }
    for(let index=0;index<7;index++){const left=49+index*43;rect(ctx,left,413-index%3*5,16,2,'#b66a4f');}
    rect(ctx,23,432,352,21,'#96989a');rect(ctx,24,433,350,3,'#e0d9c8');rect(ctx,27,454,342,9,'#626372');
    for(const left of [48,75,319,346]){oval(ctx,left,446,8,8,ink);oval(ctx,left,445,5,5,'#6c6670');rect(ctx,left-1,439,2,5,'#ddd6bf');}
    for(let index=0;index<9;index++)rect(ctx,124+index*17,441,11,5,'#4f4c59');
    if(state.grill!==null){
      const quality=RushKitchen.doneness(state.grill);food(ctx,quality==='Raw'?7:quality==='Burnt'?8:2,198,419,1.72);
      for(let index=0;index<3;index++){
        const progress=(time*.6+index*.29)%1,left=169+index*25+Math.sin(progress*6+index)*4,top=371-progress*22;
        ctx.globalAlpha=.7*(1-progress);path(ctx,[left,top,left-3,top-5,left+2,top-11,left,top-16],quality==='Burnt'?'#584c59':'#fff8dc',3);ctx.globalAlpha=1;
      }
    }else{mono(ctx,'FLAT TOP  /  84',193,388,13,'#af8a7d','center');}
    const quality=state.grill===null?'Ready to grill':RushKitchen.doneness(state.grill);
    rect(ctx,22,487,358,40,ink);mono(ctx,state.grill===null?'IGNITE':quality.toUpperCase(),34,492,15,quality==='Perfect'?mint:quality==='Burnt'?coral:gold);
    mono(ctx,state.grill===null?'G  /  DROP A PATTY':`${state.grill.toFixed(1)}s  /  ${quality==='Burnt'?'TRASH':quality==='Raw'?'SEARING':'LIFT'}`,367,492,13,cream,'right');
    const left=35,wide=330,top=513;
    const zones=[[0,1.7,'#9a8389'],[1.7,2.6,'#d2a75d'],[2.6,4,mint],[4,5.2,'#d2a75d'],[5.2,6.1,'#cb6261']];
    for(const [start,end,color] of zones)rect(ctx,left+start/6.1*wide,top,(end-start)/6.1*wide-2,6,color);
    const mark=left+(state.grill??0)/6.1*wide;poly(ctx,[mark-4,top-4,mark+4,top-4,mark,top+1],cream);rect(ctx,mark-1,top,3,8,cream);
    if(hover==='grill')path(ctx,[18,453,18,466,377,466,377,452],mint,3);
  }
  function bell(ctx,cx,cy,active,time,ring){
    ctx.save();ctx.translate(cx,cy);if(ring<.4)ctx.rotate(Math.sin(ring*48)*(.4-ring)*.16);
    oval(ctx,3,4,46,10,'#ad9788');oval(ctx,0,0,45,10,ink);rect(ctx,-44,-7,88,7,ink);oval(ctx,0,-7,44,10,'#5a515b');oval(ctx,0,-10,40,8,'#c6aba0');
    poly(ctx,[-38,-12,-37,-21,-31,-32,-22,-40,-12,-45,10,-45,21,-41,30,-33,36,-23,38,-13,26,-10,2,-7,-25,-9],ink);
    poly(ctx,[-35,-14,-34,-21,-28,-30,-20,-37,-10,-42,8,-42,19,-38,27,-31,32,-23,34,-14,16,-11,-9,-10], '#cf884b');
    poly(ctx,[-34,-16,-31,-25,-23,-33,-14,-39,1,-41,11,-38,19,-30,22,-18,12,-13,-12,-12],gold);poly(ctx,[-28,-20,-24,-29,-17,-35,-10,-36,-14,-29,-17,-20],cream);
    rect(ctx,-3,-51,6,9,ink);oval(ctx,0,-51,10,4,ink);oval(ctx,-1,-53,9,3,'#f6d98e');
    if(active){star(ctx,36,-51,6+Math.sin(time*4)*2,cream);path(ctx,[-41,-38,-48,-44],gold,3);path(ctx,[-44,-31,-53,-33],gold,3);}
    ctx.restore();
  }
  function stationLabel(ctx,left,number,title,extra,color=mint){
    mono(ctx,number,left,299,15,color);rect(ctx,left+28,297,2,18,'#716573');pixel(ctx,title,left+41,298,2.4,cream);
    if(extra)mono(ctx,extra,left+317,300,12,color,'right');
  }
  function workstations(ctx,state,time,hover){
    stationLabel(ctx,29,'01','GRILL','[G]');stationLabel(ctx,425,'02','BUILD PLATE','');stationLabel(ctx,836,'03','PICKUP','');
    mono(ctx,'SERVICE BELL',1248,301,13,gold,'right');
    grill(ctx,state,time,hover);
    dish(ctx,596,436,1.15,true);dish(ctx,955,440,1.02,true);
    const bounce=state.elapsed-state.lastLayer;const hop=bounce<.18?Math.sin(bounce/.18*Math.PI)*3:0;
    const buildHeight=state.plate.reduce((height,layer)=>height+([0,9,9,4,6,6,21][layer.id]??0),20);
    const passHeight=state.pass.reduce((height,layer)=>height+([0,9,9,4,6,6,21][layer.id]??0),20);
    burger(ctx,state.plate,596,438-hop,Math.min(2.15,112/buildHeight));burger(ctx,state.pass,955,443,Math.min(2.12,120/passHeight));
    if(!state.plate.length)mono(ctx,'BUILD HERE',596,422,13,'#795950','center');
    if(!state.pass.length)mono(ctx,'PICKUP',955,428,12,'#795950','center');
    bell(ctx,1166,437,!!state.pass.length,time,state.elapsed-state.lastBell);
    const linked=RushKitchen.match(state,state.pass),plateColor=state.pass.length?(linked?mint:coral):'#dcc4af';
    rect(ctx,414,488,286,37,'#594549');rect(ctx,417,490,280,32,'#765752');mono(ctx,'LAYERS',430,500,14,'#f5d9b3');
    for(let index=0;index<Math.max(6,state.plate.length);index++){const left=500+index*24;rect(ctx,left,498,19,16,index<state.plate.length?'#efc295':'#5a4448');if(index<state.plate.length)mono(ctx,''+state.plate[index].id,left+10,499,13,ink,'center');}
    rect(ctx,714,487,81,38,ink);rect(ctx,717,489,75,32,hover==='trash'?'#b96760':'#865b60');
    rect(ctx,727,500,10,12,cream);rect(ctx,725,497,14,2,cream);rect(ctx,730,494,5,2,cream);mono(ctx,'[X]',744,500,14,cream);
    const label=state.pass.length?(linked?`READY  /  #${linked.id}`:'CHECK ORDER'):'AWAITING BURGER';
    rect(ctx,821,488,252,37,ink);rect(ctx,824,491,246,31,'#455951');rect(ctx,836,503,8,8,plateColor);mono(ctx,label,853,498,17,plateColor);
    rect(ctx,1081,487,174,39,ink);rect(ctx,1084,489,168,32,hover==='serve'?'#ffe196':gold);mono(ctx,'RING  [SPACE]',1168,498,17,ink,'center');
  }
  Object.assign(RushKitchen,{kitchen:{scenery,workstations,bolt}});
})();
