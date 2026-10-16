/* Original MOMO forest spirits. All artwork is drawn locally, without image assets. */
(function(root){
const PETS=[
{name:'芽芽',en:'Sprout',color:'#b7d795',shade:'#88b66a',light:'#dfedba',radius:18,points:10,desc:'一颗刚睡醒的小种子',story:'才刚探出头，就想和全世界说早安。'},
{name:'啾啾',en:'Chirpy',color:'#f2d883',shade:'#d7b660',light:'#fff0bb',radius:25,points:25,desc:'把阳光装进小肚子',story:'叽叽喳喳的太阳收藏家，最喜欢暖洋洋的午后。'},
{name:'泡芙',en:'Puff',color:'#a9d5d6',shade:'#7eb4b7',light:'#d8eff0',radius:32,points:50,desc:'来自小溪的软乎乎',story:'慢悠悠地飘过来，带着一口袋清凉的泡泡。'},
{name:'桃桃',en:'Peach',color:'#edb3a6',shade:'#cd9189',light:'#ffe0cf',radius:40,points:90,desc:'耳朵里藏着春天',story:'耳朵比心事还长，一开心就会轻轻晃起来。'},
{name:'栗栗',en:'Chestnut',color:'#dcac78',shade:'#b98759',light:'#f8d6a7',radius:49,points:150,desc:'落叶堆里的小机灵',story:'悄悄藏起一颗栗子，留给下次见面的你。'},
{name:'菇菇',en:'Mushie',color:'#c9b9df',shade:'#a392bf',light:'#e8dbf2',radius:59,points:240,desc:'雨后冒出的小惊喜',story:'戴着一顶会做梦的蘑菇帽，下雨天也很快乐。'},
{name:'绵绵',en:'Cloudie',color:'#e8dec4',shade:'#c1b69a',light:'#fff6df',radius:70,points:360,desc:'像云朵一样的拥抱',story:'如果有不开心的事，就一头埋进它的绒毛里吧。'},
{name:'月月',en:'Luna',color:'#9fc4af',shade:'#74a48e',light:'#d9e8c9',radius:83,points:550,desc:'替你守着一个好梦',story:'夜深了，抱着月亮坐在树梢，等你慢慢睡着。'},
{name:'森灵王',en:'Forest Guardian',color:'#81b48b',shade:'#5a936e',light:'#c4dfa7',radius:97,points:1000,desc:'整座森林都在为你欢呼',story:'每一次小小的相遇，终于长成了森林最温柔的守护者。'}
];
function ellipse(c,x,y,rx,ry,fill,stroke,w=2){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}}
function path(c,coords,fill,stroke,w=2){c.beginPath();coords(c);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}}
function leaf(c,x,y,angle,size,fill){c.save();c.translate(x,y);c.rotate(angle);path(c,p=>{p.moveTo(0,0);p.bezierCurveTo(-size,-size*.5,-size*.7,-size*1.55,0,-size*1.7);p.bezierCurveTo(size*.8,-size*.9,size*.65,-size*.3,0,0);},fill,'#526749',1.8);path(c,p=>{p.moveTo(0,0);p.lineTo(0,-size*1.2);},null,'#6f8955',1);c.restore();}
function star(c,x,y,size,color){path(c,p=>{for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?size*.48:size;p.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}p.closePath();},color);}
function drawPet(c,level,x,y,r,angle=0,time=0,opts={}){
 const pet=PETS[level];c.save();c.translate(x,y);c.rotate(angle);c.scale(r/50,r/50);c.lineJoin='round';c.lineCap='round';const ink='#4d6150';
 if(opts.shadow){ellipse(c,0,49,39,6,'#354d3220');}
 if(opts.locked){ellipse(c,0,2,42,42,'#d9e0cf','#aab69c',2);leaf(c,0,-37,-.2,12,'#c4cfb7');c.fillStyle='#9cae8b';c.font='500 37px Outfit,sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText('?',0,5);c.restore();return;}
 // Ears, fins, and crowns give each stage its own silhouette.
 if(level===1){path(c,p=>{p.moveTo(-38,-2);p.quadraticCurveTo(-66,-8,-44,20);},pet.shade,ink);path(c,p=>{p.moveTo(38,-2);p.quadraticCurveTo(66,-8,44,20);},pet.shade,ink);}
 if(level===2){ellipse(c,-43,14,12,18,pet.shade,ink);ellipse(c,43,14,12,18,pet.shade,ink);}
 if(level===3){c.save();c.rotate(-.18);ellipse(c,-19,-53,12,31,pet.color,ink,2.2);ellipse(c,-19,-56,5,20,'#d98f94');c.restore();c.save();c.rotate(.18);ellipse(c,19,-53,12,31,pet.color,ink,2.2);ellipse(c,19,-56,5,20,'#d98f94');c.restore();}
 if(level===4){for(const s of[-1,1]){path(c,p=>{p.moveTo(s*8,-34);p.lineTo(s*35,-64);p.quadraticCurveTo(s*51,-52,s*47,-18);p.closePath();},pet.shade,ink,2.2);path(c,p=>{p.moveTo(s*22,-36);p.lineTo(s*35,-53);p.lineTo(s*39,-29);},'#f0c8b2');}}
 if(level===6){for(let i=0;i<8;i++){const a=-Math.PI+i*Math.PI/7;ellipse(c,Math.cos(a)*37,Math.sin(a)*37+2,17,17,pet.light,ink,1.8);}}
 if(level===7){ellipse(c,-33,-36,18,19,pet.shade,ink);ellipse(c,33,-36,18,19,pet.shade,ink);ellipse(c,-33,-36,10,11,pet.light);ellipse(c,33,-36,10,11,pet.light);}
 if(level===8){for(const s of[-1,1]){path(c,p=>{p.moveTo(s*28,-31);p.quadraticCurveTo(s*28,-59,s*42,-72);p.moveTo(s*31,-47);p.lineTo(s*17,-59);p.moveTo(s*36,-59);p.lineTo(s*52,-59);},null,'#6c7d4e',5);leaf(c,s*43,-69,s*.6,10,'#9fbc78');leaf(c,s*53,-58,s*1.2,9,'#bed49b');}}
 const grad=c.createLinearGradient(-20,-45,30,48);grad.addColorStop(0,pet.light);grad.addColorStop(.4,pet.color);grad.addColorStop(1,pet.shade);ellipse(c,0,2,48,47,grad,ink,2.3);
 if(level===0){path(c,p=>{p.moveTo(0,-42);p.quadraticCurveTo(-1,-52,3,-58);},null,ink,2.8);leaf(c,3,-51,.65,15,'#82ab61');leaf(c,1,-49,-.7,10,'#a4c780');}
 if(level===1){path(c,p=>{p.moveTo(-5,-43);p.quadraticCurveTo(-14,-62,-1,-58);p.quadraticCurveTo(10,-66,10,-47);},'#e9ba6b',ink,2);}
 if(level===2){path(c,p=>{p.moveTo(-18,-42);p.quadraticCurveTo(-9,-64,3,-48);p.quadraticCurveTo(20,-57,22,-40);},pet.color,ink,2);ellipse(c,-14,-25,6,3,'#e4f6f1');}
 if(level===5){path(c,p=>{p.moveTo(-52,-17);p.bezierCurveTo(-50,-73,50,-73,52,-17);p.quadraticCurveTo(0,2,-52,-17);},'#b19bc9',ink,2.3);ellipse(c,-24,-30,9,5,'#e6d7f0');ellipse(c,4,-44,8,6,'#eadcf2');ellipse(c,29,-28,6,4,'#eadcf2');}
 if(level===4){path(c,p=>{p.moveTo(-43,3);p.quadraticCurveTo(-26,-6,-10,15);p.quadraticCurveTo(0,26,10,15);p.quadraticCurveTo(26,-6,43,3);p.quadraticCurveTo(41,43,0,47);p.quadraticCurveTo(-41,43,-43,3);},'#f7e0bb');}
 if(level===6){ellipse(c,0,8,35,32,'#fbefd5');ellipse(c,-31,22,10,6,pet.color);ellipse(c,31,22,10,6,pet.color);}
 if(level===7){c.save();c.translate(0,-21);c.rotate(-.35);ellipse(c,0,0,9,11,'#e8ddb1');ellipse(c,5,-3,8,10,pet.color);c.restore();}
 if(level===8){ellipse(c,0,16,30,25,'#d0e1b6');star(c,0,-24,9,'#f3dda2');leaf(c,-41,25,-1.1,12,'#b3d097');leaf(c,41,25,1.1,12,'#b3d097');}
 // Tiny highlights, rosy cheeks and responsive eyes.
 if(level!==5)ellipse(c,-24,-26,10,5,'#ffffff3d');
 const blink=!opts.still&&Math.sin(time*1.1+level*1.7)>.996;const eyeY=level===5?10:5;
 if(blink){path(c,p=>{p.moveTo(-20,eyeY);p.lineTo(-12,eyeY);p.moveTo(12,eyeY);p.lineTo(20,eyeY);},null,ink,2.5);}else{for(const s of[-1,1]){ellipse(c,s*16,eyeY,4.6,6.4,ink);ellipse(c,s*16-1.1,eyeY-2,1.3,1.7,'#ffffe9');}}
 ellipse(c,-29,eyeY+12,7,4,'#d4907b77');ellipse(c,29,eyeY+12,7,4,'#d4907b77');
 if(level===1){path(c,p=>{p.moveTo(-4,eyeY+10);p.lineTo(4,eyeY+10);p.lineTo(0,eyeY+15);p.closePath();},'#d69a56');}else{path(c,p=>{p.moveTo(-5,eyeY+14);p.quadraticCurveTo(0,eyeY+19,5,eyeY+14);},null,ink,1.8);}
 c.restore();
}
root.ForestPets={PETS,drawPet};if(typeof module!=='undefined')module.exports={PETS};
})(typeof window!=='undefined'?window:globalThis);
