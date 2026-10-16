(function(root){
const M=typeof module!=='undefined'?require('./vendor/matter.min.js'):root.Matter;
const PETS=typeof module!=='undefined'?require('./pets.js').PETS:root.ForestPets.PETS;
const WIDTH=460,HEIGHT=560,DANGER_Y=186;
class ForestGame{
 constructor(options={}){this.onEvent=options.onEvent||(()=>{});this.random=options.random||Math.random;this.engine=M.Engine.create({enableSleeping:true,gravity:{x:0,y:1.15}});this.pets=[];this.time=0;this.score=0;this.bestLevel=2;this.state='playing';this.danger=0;this.lastMerge=-10;this.combo=0;this.readyAt=0;this.current=0;this.next=0;this.aim=230;this.tools={swap:3,remove:2,shake:2};this.removing=false;this.pending=[];
 const wall={isStatic:true,friction:.45,restitution:.15};M.Composite.add(this.engine.world,[M.Bodies.rectangle(230,540,360,24,wall),M.Bodies.rectangle(49,421,17,235,{...wall,angle:-.145}),M.Bodies.rectangle(411,421,17,235,{...wall,angle:.145}),M.Bodies.rectangle(-14,240,28,600,wall),M.Bodies.rectangle(474,240,28,600,wall)]);
 M.Events.on(this.engine,'collisionStart',e=>{for(const pair of e.pairs){const a=pair.bodyA,b=pair.bodyB;if(a.petLevel!==undefined&&a.petLevel===b.petLevel&&a.petLevel<PETS.length-1)this.pending.push([a,b]);}});
 this.spawn(0,112,502);this.spawn(1,182,499);this.spawn(2,275,492);this.spawn(0,341,505);
 }
 roll(){const n=this.random();return n<.48?0:n<.8?1:n<.96?2:3;}
 spawn(level,x,y){const body=M.Bodies.circle(x,y,PETS[level].radius,{restitution:.22,friction:.45,frictionStatic:.7,frictionAir:.008,sleepThreshold:65,density:.0018});body.petLevel=level;body.born=this.time;body.visualBorn=this.time;M.Composite.add(this.engine.world,body);this.pets.push(body);return body;}
 setAim(x){this.aim=Math.max(42+PETS[this.current].radius,Math.min(WIDTH-42-PETS[this.current].radius,x));}
 drop(){if(this.state!=='playing'||this.removing||this.time<this.readyAt)return false;const level=this.current;this.setAim(this.aim);const b=this.spawn(level,this.aim,119);M.Body.setVelocity(b,{x:0,y:1.5});this.current=this.next;this.next=this.roll();this.readyAt=this.time+.58;this.onEvent({type:'drop',body:b});return true;}
 removeBody(b){M.Composite.remove(this.engine.world,b);this.pets=this.pets.filter(p=>p!==b);}
 step(dt=1000/60){if(this.state!=='playing')return;this.time+=dt/1000;M.Engine.update(this.engine,dt);const consumed=new Set();const pairs=this.pending;this.pending=[];for(const[a,b]of pairs){if(consumed.has(a.id)||consumed.has(b.id)||!this.pets.includes(a)||!this.pets.includes(b))continue;consumed.add(a.id);consumed.add(b.id);const level=a.petLevel+1,x=(a.position.x+b.position.x)/2,y=(a.position.y+b.position.y)/2,vx=(a.velocity.x+b.velocity.x)/2;this.removeBody(a);this.removeBody(b);const born=this.spawn(level,x,y);M.Body.setVelocity(born,{x:vx*.5,y:-1.3});this.combo=this.time-this.lastMerge<1.5?this.combo+1:1;this.lastMerge=this.time;const points=PETS[level].points+Math.max(0,this.combo-1)*10;this.score+=points;this.bestLevel=Math.max(this.bestLevel,level);this.onEvent({type:'merge',level,x,y,points,combo:this.combo});if(level===PETS.length-1){this.state='won';this.onEvent({type:'end',won:true});break;}}
 const overflowing=this.pets.some(b=>b.position.y-PETS[b.petLevel].radius<DANGER_Y&&this.time-b.born>2&&Math.abs(b.velocity.y)<2.2);this.danger=overflowing?this.danger+dt/1000:Math.max(0,this.danger-dt/350);if(this.danger>=3&&this.state==='playing'){this.state='ended';this.onEvent({type:'end',won:false});}
 }
 useTool(name){if(this.state!=='playing'||!this.tools[name])return false;if(name==='swap'){if(this.time<this.readyAt)return false;[this.current,this.next]=[this.next,this.current];this.setAim(this.aim);this.tools.swap--;this.onEvent({type:'swap'});}else if(name==='shake'){if(!this.pets.length)return false;this.tools.shake--;for(let i=0;i<this.pets.length;i++){const b=this.pets[i];M.Sleeping.set(b,false);M.Body.setVelocity(b,{x:(i%2?1:-1)*(3+this.random()*2),y:-3-this.random()*2});}this.onEvent({type:'shake'});}else if(name==='remove'){this.removing=!this.removing;this.onEvent({type:'remove-mode',active:this.removing});}return true;}
 pickRemove(x,y){if(!this.removing||this.state!=='playing')return false;const b=[...this.pets].reverse().find(b=>Math.hypot(x-b.position.x,y-b.position.y)<PETS[b.petLevel].radius+10);if(!b)return false;this.removeBody(b);this.tools.remove--;this.removing=false;this.onEvent({type:'removed',x:b.position.x,y:b.position.y,level:b.petLevel});return true;}
 pause(){if(this.state==='playing')this.state='paused';}
 resume(){if(this.state==='paused')this.state='playing';}
 destroy(){M.Events.off(this.engine);M.Composite.clear(this.engine.world,false);M.Engine.clear(this.engine);}
 snapshot(){return {state:this.state,score:this.score,current:this.current,next:this.next,petCount:this.pets.length,bestLevel:this.bestLevel,tools:{...this.tools},danger:this.danger};}
}
root.ForestCore={ForestGame,WIDTH,HEIGHT,DANGER_Y};if(typeof module!=='undefined')module.exports=root.ForestCore;
})(typeof window!=='undefined'?window:globalThis);
