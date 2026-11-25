(() => {
  const ink='#282032', cream='#fff0cf', mint='#8ee4c1', gold='#ffd069', coral='#fa775e';
  function rect(ctx,left,top,width,height,color) {ctx.fillStyle=color;ctx.fillRect(Math.round(left),Math.round(top),Math.round(width),Math.round(height));}
  function poly(ctx,points,color) {
    ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(points[0],points[1]);
    for(let index=2;index<points.length;index+=2) ctx.lineTo(points[index],points[index+1]);
    ctx.closePath();ctx.fill();
  }
  function path(ctx,points,color,weight=2) {
    ctx.strokeStyle=color;ctx.lineWidth=weight;ctx.lineJoin='miter';ctx.beginPath();ctx.moveTo(points[0],points[1]);
    for(let index=2;index<points.length;index+=2)ctx.lineTo(points[index],points[index+1]);ctx.stroke();
  }
  function oval(ctx,cx,cy,rx,ry,color) {ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
  function text(ctx,words,left,top,size,color=cream,weight=700,align='left',family='sans-serif') {
    ctx.fillStyle=color;ctx.font=`${weight} ${size}px ${family}`;ctx.textBaseline='top';ctx.textAlign=align;ctx.fillText(words,left,top);
  }
  function mono(ctx,words,left,top,size,color=cream,align='left') {text(ctx,words,left,top,size,color,700,align,'monospace');}
  const letters={A:'0e11111f111111',B:'1e11111e11111e',C:'0f10101010100f',D:'1e11111111111e',E:'1f10101e10101f',F:'1f10101e101010',G:'0f10101711110f',H:'1111111f111111',I:'1f04040404041f',J:'0702020212120c',K:'11121418141211',L:'1010101010101f',M:'111b1515111111',N:'11191915131311',O:'0e11111111110e',P:'1e11111e101010',Q:'0e11111115120d',R:'1e11111e141211',S:'0f10100e01011e',T:'1f040404040404',U:'1111111111110e',V:'111111110a0a04',W:'1111111515150a',X:'11110a040a1111',Y:'11110a04040404',Z:'1f01020408101f','0':'0e11131519110e','1':'040c040404040e','2':'0e11010204081f','3':'1e01010e01011e','4':'02060a121f0202','5':'1f10101e01011e','6':'0e10101e11110e','7':'1f010204080808','8':'0e11110e11110e','9':'0e11110f01010e',':':'00040400040400','-':'0000001f000000','.':'00000000000606','!':'04040404040004','/':'01020204080810','#':'000a1f0a1f0a00','+':'0004041f040400'};
  const glyphs=Object.fromEntries(Object.entries(letters).map(([char,bits])=>[char,bits.match(/../g).map(row=>parseInt(row,16))]));
  function pixel(ctx,words,left,top,scale,color=cream,options={}) {
    ctx.fillStyle=color;let offset=0;
    for(const char of String(words).toUpperCase()){
      if(char===' '){offset+=3*scale;continue;}
      const rows=glyphs[char]||glyphs['-'];
      for(let row=0;row<7;row++)for(let col=0;col<5;col++)if(rows[row]&(16>>col)){
        const skew=options.italic?(6-row)*0.21*scale:0;
        ctx.fillRect(Math.round(left+offset+col*scale+skew),Math.round(top+row*scale),Math.ceil(scale),Math.ceil(scale));
      }
      offset+=6*scale;
    }
    return offset;
  }
  function star(ctx,cx,cy,size,color) {poly(ctx,[cx,cy-size,cx+size*.26,cy-size*.24,cx+size,cy,cx+size*.26,cy+size*.22,cx,cy+size,cx-size*.24,cy+size*.22,cx-size,cy,cx-size*.24,cy-size*.24],color);}
  function checker(ctx,left,top,width,height,size,base,accent){rect(ctx,left,top,width,height,base);ctx.save();ctx.beginPath();ctx.rect(left,top,width,height);ctx.clip();for(let row=0;row<height/size;row++)for(let col=row%2;col<width/size;col+=2)rect(ctx,left+col*size,top+row*size,size,size,accent);ctx.restore();}
  function sprite(id) {
    const canvas=document.createElement('canvas');canvas.width=80;canvas.height=42;const ctx=canvas.getContext('2d');
    function shape(color,points){const pairs=[];for(let index=0;index<points.length;index+=2)pairs.push([points[index],points[index+1]]);
      for(let row=0;row<42;row++){const crosses=[];let prev=pairs.at(-1);for(const next of pairs){if((next[1]>row+.5)!==(prev[1]>row+.5))crosses.push((prev[0]-next[0])*(row+.5-next[1])/(prev[1]-next[1])+next[0]);prev=next;}crosses.sort((a,b)=>a-b);for(let index=0;index<crosses.length;index+=2)rect(ctx,Math.round(crosses[index]),row,Math.round(crosses[index+1])-Math.round(crosses[index]),1,color);}}
    function ellipse(cx,cy,rx,ry,color){for(let row=Math.ceil(cy-ry);row<cy+ry;row++){const span=Math.round(rx*Math.sqrt(Math.max(0,1-((row+0.5-cy)/ry)**2)));rect(ctx,cx-span,row,2*span,1,color);}}
    const dot=(left,top,wide,tall,color)=>rect(ctx,left,top,wide,tall,color);
    const crumbs=(points,color)=>points.forEach(([left,top,wide=2])=>dot(left,top,wide,1,color));
    if(id===1){
      ellipse(40,29,35,11,ink);ellipse(40,27,35,10,'#ac512e');ellipse(39,26,34,10,'#e29446');ellipse(38,24,33,9,'#f5bd6b');ellipse(40,22,34,10,ink);ellipse(40,22,32,8,'#e9a356');ellipse(38,21,29,6,'#ffdb89');
      crumbs([[14,21,3],[20,24],[25,18,3],[34,22,3],[38,17],[43,24],[53,18,3],[59,22],[64,23],[32,26]],'#c78143');crumbs([[16,31,5],[25,34,6],[37,35,4]],'#ffe19a');
    }else if(id===2||id===7||id===8){
      const raw=id===7,burnt=id===8;
      const meat=raw?'#d36a6e':burnt?'#49404a':'#a7573a',light=raw?'#f5a299':burnt?'#65545b':'#d8854a',dark=raw?'#914151':burnt?'#211e27':'#673736';
      shape(ink,[5,22,10,18,21,15,29,14,50,14,62,16,72,19,77,23,76,29,72,34,65,35,59,37,47,37,41,39,29,38,25,37,16,36,13,34,7,32,4,28]);
      ellipse(40,26,34,10,dark);ellipse(39,22,33,8,meat);ellipse(36,21,26,5,light);
      for(let index=0;index<5;index++)shape(dark,[14+index*10,20-index%2*3,19+index*10,18-index%2*3,27+index*9,24,22+index*9,26]);
      crumbs([[10,27,4],[19,30,3],[29,32,3],[35,29],[45,33,4],[52,29],[59,31,3],[65,27,5]],light);
    }else if(id===3){
      shape(ink,[2,23,33,11,57,14,78,21,70,26,61,29,53,37,44,32,33,32,28,36,19,30,9,29]);
      shape('#e99227',[4,23,34,13,57,16,75,21,62,27,53,34,44,29,33,29,28,33,19,28,11,27]);
      shape('#ffce44',[6,22,34,13,58,17,73,21,53,28,43,27,30,29,19,26]);shape('#ffe782',[8,22,33,14,44,16,27,18,20,22]);crumbs([[38,21,4],[53,20,3],[29,25]],'#eaa63c');
    }else if(id===4){
      const leaf=[2,22,8,18,11,18,15,13,23,14,30,11,35,13,44,10,50,13,57,12,65,15,68,18,74,18,79,22,75,26,71,27,69,31,60,30,56,34,51,32,44,36,37,33,33,36,26,32,22,33,16,29,11,30,9,27,4,27];
      shape(ink,leaf);shape('#397253',leaf.map((value,index)=>index%2===0?40+(value-40)*.94:23+(value-23)*.8));
      shape('#76b34e',[5,22,15,17,19,15,24,16,31,13,36,16,45,12,53,16,58,15,66,19,72,20,75,23,67,25,63,23,55,28,50,26,44,31,37,28,32,30,26,27,20,28,15,24,11,25]);
      shape('#c3db6a',[8,22,18,17,24,18,30,15,39,18,44,15,55,18,45,19,38,22,28,19,20,21,17,20]);crumbs([[26,22,5],[40,25,5],[56,23,4],[63,20,4]],'#a7d765');
    }else if(id===5){
      ellipse(40,26,34,12,ink);ellipse(40,25,32,11,'#ad343d');ellipse(39,22,32,10,'#fa6954');ellipse(39,21,27,7,'#d84342');
      shape('#ff8461',[19,20,29,16,36,16,38,20,34,23,39,27,33,27,31,23,24,25,23,23,30,21]);shape('#ff9366',[43,15,49,17,48,19,59,18,63,21,52,22,49,25,41,26,45,21]);
      crumbs([[23,19],[30,18],[26,23],[48,17],[54,20],[48,23],[32,25]],'#ffdc86');crumbs([[14,28,5],[23,31,6],[39,33,7]],'#fa6b58');
    }else{
      shape(ink,[5,29,6,22,9,17,15,11,22,7,31,4,47,3,57,6,65,10,71,16,75,23,76,29,72,33,64,36,49,38,33,39,21,37,11,34]);
      shape('#b45e32',[7,28,9,21,15,13,24,8,31,6,46,5,56,8,64,12,70,18,73,25,73,29,68,32,59,35,46,36,31,36,17,33]);
      shape('#e38d3f',[7,27,10,19,17,12,26,8,34,6,46,5,55,8,63,12,68,17,71,23,69,28,60,32,47,34,31,33,17,31,10,29]);
      shape('#f6ac50',[9,25,13,18,20,12,29,8,44,6,55,9,62,13,66,18,64,22,57,26,44,29,26,29,16,27]);
      shape('#ffc56b',[13,21,18,15,27,10,38,8,48,8,53,10,46,12,33,13,24,17,18,21]);
      for(const [left,top,slant] of [[15,22,1],[22,15,1],[29,20,-1],[33,11,1],[40,16,-1],[48,10,-1],[51,22,1],[56,16,-1],[64,23,-1],[19,27,-1],[38,25,1]]){
        dot(left,top+1,3,2,'#ca803f');dot(left,top,3,1,'#fff0ab');dot(left+slant,top+1,2,1,'#ffdf8d');
      }
    }
    return canvas;
  }
  const sprites=Array.from({length:8},(_,index)=>sprite(index+1));
  function food(ctx,id,cx,bottom,scale){ctx.imageSmoothingEnabled=false;ctx.drawImage(sprites[id-1],Math.round(cx-40*scale),Math.round(bottom-40*scale),Math.round(80*scale),Math.round(42*scale));}
  const rises=[0,9,9,4,6,6,21];
  function burger(ctx,layers,cx,bottom,scale,spread=0){let height=0;for(const layer of layers){const id=layer.id??layer;food(ctx,id,cx,bottom-height*scale,scale);height+=rises[id]+spread;}return height*scale;}
  Object.assign(RushKitchen,{art:{ink,cream,mint,gold,coral,rect,poly,path,oval,text,mono,pixel,star,checker,food,burger}});
})();
