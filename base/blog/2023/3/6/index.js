var _a,Direction,__extends=this&&this.__extends||function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();!function(t){t[t.Right=0]="Right",t[t.Down=1]="Down",t[t.Left=2]="Left",t[t.Up=3]="Up"}(Direction||(Direction={}));var Maze,Item,UNIT_VECTORS=((_a={})[Direction.Right]=[1,0],_a[Direction.Down]=[0,1],_a[Direction.Left]=[-1,-0],_a[Direction.Up]=[0,-1],_a);!function(t){var e,n,r;t.WIDTH=17,t.HALF_WIDTH=Math.floor(t.WIDTH/2+1),t.HEIGHT=23,function(t){t[t.Empty=0]="Empty",t[t.Wall=1]="Wall",t[t.Gold=2]="Gold",t[t.Item=3]="Item",t[t.SpawnWall=4]="SpawnWall"}(r=t.Tile||(t.Tile={})),t.TILE_CHAR=((e={})[r.Empty]=" ",e[r.Wall]="#",e[r.Gold]="-",e[r.Item]="$",e[r.SpawnWall]="=",e),t.TILE_COLOR=((n={})[r.Empty]="000",n[r.Wall]="a87",n[r.Gold]="fe3",n[r.Item]="a2f",n[r.SpawnWall]="aaa",n)}(Maze||(Maze={})),function(t){t[t.Elixir=0]="Elixir",t[t.Potion=1]="Potion",t[t.Bomb=2]="Bomb",t[t.Portal=3]="Portal",t[t.Arrow=4]="Arrow",t[t.Shield=5]="Shield"}(Item||(Item={}));var SPAWNER_Y_MIN=Math.floor(Maze.HEIGHT/2)-1,SPAWNER_Y_MAX=SPAWNER_Y_MIN+2,SPAWNER_X_MIN=Maze.HALF_WIDTH-3,SPAWNER_X_MAX=SPAWNER_X_MIN+4,Terminal=function(){function t(){var e=document.getElementById("screen");this.cells=[];for(var n=0;n<t.HEIGHT;n++){var r=[];this.cells.push(r);for(var a=0;a<t.WIDTH;a++){var i=document.createElement("span");r.push(i),e.appendChild(i)}e.appendChild(document.createElement("br"))}this.clear()}return t.prototype.clear=function(){for(var e=0;e<t.HEIGHT;e++)for(var n=0;n<t.WIDTH;n++)this.plot(n,e," ","000")},t.prototype.plot=function(e,n,r,a){if(!(e<0||e>=t.WIDTH||n<0||n>=t.HEIGHT)){var i=this.cells[n][e];i.textContent=r,i.style.color="#"+a}},t.prototype.print=function(t,e,n,r){for(var a=0;a<n.length;a++)this.plot(t++,e,n.charAt(a),r)},t.WIDTH=40,t.HEIGHT=27,t}(),DIRECTIONS_BY_KEY={ArrowRight:Direction.Right,ArrowDown:Direction.Down,ArrowLeft:Direction.Left,ArrowUp:Direction.Up},NUMBER_KEYS={1:!0,2:!0,3:!0},GAME_OVER_SIGNAL={},Game=function(){function t(t){this.lines=[],this.inventory=[null,null,null],this.terminal=t,this.gold=0,this.floor=0,this.health=3,this.loadNewMaze(),this.print()}return t.prototype.handleEvent=function(t){if(this.lines=[]," "===t.key)t.preventDefault();else{if(t.key in NUMBER_KEYS)return this.useItem(+t.key-1),t.preventDefault(),void this.print();var e=DIRECTIONS_BY_KEY[t.key];if(void 0===e)return;t.preventDefault();var n=UNIT_VECTORS[e],r=n[0],a=n[1];if(!this.player.move(r,a))return}if(this.pendingMonsters.length>0){var i=this.pendingMonsters.shift();this.monsters.push(i),this.addAction("".concat(i.name()," spawns."))}for(var o=0,l=this.monsters;o<l.length;o++){(i=l[o]).chase()}this.attackCooldown>0&&--this.attackCooldown,0===this.numCollectables&&this.loadNewMaze(),this.print()},t.prototype.addAction=function(t){this.lines.push(t)},t.prototype.loadNewMaze=function(){var t=generateMaze(),e=t[0],n=t[1],r=t[2];this.maze=e,this.tunnelPos=n,this.numCollectables=r,++this.floor,this.player=new Player(this),this.monsters=[],this.attackCooldown=0,this.pendingMonsters=[new Hellhound(this),new Serpent(this),new Wizard(this),new Ghost(this)],this.addAction("You enter floor ".concat(this.floor,"."))},t.prototype.print=function(){this.terminal.clear();for(var t=0;t<Maze.HEIGHT;t++)for(var e=0;e<Maze.WIDTH;e++){var n=this.maze[t][e];this.terminal.plot(e,t,Maze.TILE_CHAR[n],Maze.TILE_COLOR[n])}this.terminal.plot(this.player.x,this.player.y,"@","fff");for(var r=0,a=this.monsters;r<a.length;r++){var i=a[r];this.terminal.plot(i.x,i.y,i.character,i.color)}this.terminal.print(0,Maze.HEIGHT,"Gold: ".concat(this.gold),"fff"),this.terminal.print(0,Maze.HEIGHT+1,"Floor: ".concat(this.floor),"fff"),this.terminal.print(0,Maze.HEIGHT+2,"Health: ".concat(this.health),this.health<=1?"f55":"fff"),this.terminal.print(0,Maze.HEIGHT+3,"Attack cooldown: ".concat(this.attackCooldown),0!==this.attackCooldown?"f55":"fff");for(var o=0;o<this.inventory.length;o++){var l=this.inventory[o],s=null!==l?Item[l]:"No item";this.terminal.print(Maze.WIDTH+1,o,"".concat(o+1,": ").concat(s),"fff")}for(o=0;o<this.lines.length;o++)this.terminal.print(Maze.WIDTH+1,o+4,this.lines[o],"fff")},t.prototype.takeDamage=function(t){if(this.health>0&&(--this.health,this.addAction("".concat(t," attacks!")),0===this.health))throw this.addAction("You died."),this.addAction("Space to retry"),this.print(),GAME_OVER_SIGNAL},t.prototype.tryAttack=function(){return!(this.attackCooldown>0)&&(this.attackCooldown=t.COOLDOWN_VALUE,!0)},t.prototype.useItem=function(t){var e=this.inventory[t];if(null!==e)switch(e){case Item.Elixir:this.addAction("You drink an Elixir."),this.addAction("You feel refreshed."),this.attackCooldown=0,this.inventory[t]=null;break;case Item.Potion:this.addAction("You drink a Potion."),3===this.health?this.addAction("You feel nothing?"):(++this.health,this.addAction("You feel stronger.")),this.inventory[t]=null;break;case Item.Bomb:case Item.Portal:case Item.Arrow:case Item.Shield:this.addAction("Not yet implemented."),this.inventory[t]=null}},t.COOLDOWN_VALUE=5,t}(),Entity=function(){function t(t,e,n){this.game=t,this.x=e,this.y=n}return t.prototype.canPassThrough=function(t){switch(t){case Maze.Tile.Empty:case Maze.Tile.Gold:case Maze.Tile.Item:return!0;default:return!1}},t.prototype.move=function(t,e){var n=this.x+t,r=this.y+e;return-1===n?n=Maze.WIDTH-1:n===Maze.WIDTH&&(n=0),!!this.canPassThrough(this.game.maze[r][n])&&(this.x=n,this.y=r,!0)},t}(),Player=function(t){function e(n){return t.call(this,n,e.SPAWN_X,e.SPAWN_Y)||this}return __extends(e,t),e.prototype.move=function(e,n){for(var r=this.x+e,a=this.y+n,i=!1,o=0,l=this.game.monsters;o<l.length;o++){var s=l[o];if(r===s.x&&a===s.y&&(i=!0,this.game.tryAttack())){this.game.addAction("You banish ".concat(s.name(),"!")),s.respawn();break}}var h=i||t.prototype.move.call(this,e,n),f=this.game.maze[this.y][this.x];if(f===Maze.Tile.Gold)this.game.maze[this.y][this.x]=Maze.Tile.Empty,++this.game.gold,--this.game.numCollectables,this.game.addAction("You pick up some gold.");else if(f===Maze.Tile.Item)for(var c=0;c<this.game.inventory.length;c++)if(null===this.game.inventory[c]){this.game.maze[this.y][this.x]=Maze.Tile.Empty,--this.game.numCollectables;var u=Math.floor(6*Math.random());this.game.addAction("You pick up ".concat(Item[u],".")),this.game.inventory[c]=u;break}return h},e.SPAWN_X=Maze.HALF_WIDTH-1,e.SPAWN_Y=SPAWNER_Y_MAX+5,e}(Entity),Monster=function(t){function e(e,n,r){var a=t.call(this,e,0,0)||this;return a.color=n,a.character=r,a.direction=Direction.Up,a.respawn(),a}return __extends(e,t),e.prototype.isInSpawner=function(){return this.x>=SPAWNER_X_MIN&&this.x<=SPAWNER_X_MAX&&this.y>=SPAWNER_Y_MIN&&this.y<=SPAWNER_Y_MAX},e.prototype.canPassThrough=function(e){var n=t.prototype.canPassThrough.call(this,e);return this.isInSpawner()&&(n||(n=e===Maze.Tile.SpawnWall)),n},e.prototype.chase=function(){if(this.isInSpawner())this.direction=Direction.Up;else{for(var t=this.target(),e=t[0],n=t[1],r=1/0,a=this.direction,i=0;i<4;i++)if((i+2&3)!==this.direction){var o=UNIT_VECTORS[i],l=o[0],s=o[1],h=this.x+l,f=this.y+s;if(!(h>=0&&h<Maze.WIDTH&&f>=0&&f<Maze.HEIGHT)||this.canPassThrough(this.game.maze[f][h])){var c=h-e,u=f-n,p=c*c+u*u;p<r&&(r=p,a=i)}}this.direction=a}var m=UNIT_VECTORS[this.direction],M=m[0],y=m[1];this.move(M,y)},e.prototype.respawn=function(){this.x=Maze.HALF_WIDTH-1,this.y=SPAWNER_Y_MIN+1,this.tunnelPenalty=!0},e.prototype.move=function(e,n){if(this.tunnelPenalty)return this.tunnelPenalty=!1,!1;var r=!1,a=this.x+e,i=this.y+n;if(a===this.game.player.x&&i===this.game.player.y)this.game.takeDamage(this.name());else{for(var o=!1,l=!0,s=0,h=this.game.monsters;s<h.length;s++){var f=h[s];if(f===this)l=!1;else if(l&&f.x===a&&f.y===i){o=!0;break}}o||(r=t.prototype.move.call(this,e,n))}return this.y===this.game.tunnelPos&&(this.x<3||this.x>Maze.WIDTH-4)&&(this.tunnelPenalty=!0),r},e}(Entity),Hellhound=function(t){function e(e){return t.call(this,e,"f30","h")||this}return __extends(e,t),e.prototype.target=function(){return[this.game.player.x,this.game.player.y]},e.prototype.name=function(){return"Hellhound"},e}(Monster),Serpent=function(t){function e(e){var n=t.call(this,e,"0f0","s")||this;return n.lastPlayerPos=[e.player.x,e.player.y],n}return __extends(e,t),e.prototype.target=function(){var t=this.game.player.x,e=this.game.player.y,n=t-this.lastPlayerPos[0],r=e-this.lastPlayerPos[1];return this.lastPlayerPos[0]=t,this.lastPlayerPos[1]=e,[t+4*n,e+4*r]},e.prototype.name=function(){return"Serpent"},e}(Monster),Wizard=function(t){function e(e){return t.call(this,e,"08f","w")||this}return __extends(e,t),e.prototype.target=function(){for(var t=null,e=this.game.player.x,n=this.game.player.y,r=0,a=this.game.monsters;r<a.length;r++){var i=a[r];if(this!==i){var o=e-i.x,l=n-i.y;o*o+l*l>-(1/0)&&(t=i)}}return null===t?[e,n]:[Math.floor((e+t.x)/2),Math.floor((n+t.y)/2)]},e.prototype.name=function(){return"Wizard"},e}(Monster),Ghost=function(t){function e(e){return t.call(this,e,"bbb","g")||this}return __extends(e,t),e.prototype.target=function(){return[this.game.player.x+Math.floor(9*Math.random())-4,this.game.player.y+Math.floor(9*Math.random())-4]},e.prototype.name=function(){return"Ghost"},e}(Monster);function sortNum(t,e){return t-e}function filterUnique(t,e,n){return n.indexOf(t)===e}function isShapeAllowed(t,e,n){var r=[],a={},i=0;function o(t,e){return t+","+e}function l(t,e){return o(t,e)in a}function s(e,n){if(!(e<0||e>=Maze.WIDTH||n<0||n>=Maze.HEIGHT)){var i=e>=Maze.HALF_WIDTH?Maze.WIDTH-1-e:e;t[n][i]===Maze.Tile.Wall&&(l(e,n)||(r.push([e,n]),a[o(e,n)]=!0))}}for(s(e,n);i<r.length;){var h=r[i++],f=h[0],c=h[1];s(f-1,c),s(f+1,c),s(f,c-1),s(f,c+1)}for(var u=[],p=0;p<r.length;p++){var m=r[p],M=m[0],y=m[1],_=l(M-1,y),d=l(M+1,y),I=l(M,y-1),T=l(M,y+1);(_&&d&&!I&&!T||I&&T&&!_&&!d)&&u.push(p)}for(p=u.length-1;p>=0;p--){var g=u[p],v=r[g],A=v[0],E=v[1];r.splice(g,1),delete a[o(A,E)]}if(r.length>5)return!1;var H=r.map((function(t){var e=t[0];t[1];return e})).filter(filterUnique).sort(sortNum),W=r.map((function(t){t[0];return t[1]})).filter(filterUnique).sort(sortNum),z=H[H.length-1]-H[0],N=W[W.length-1]-W[0];if(z>4||N>4)return!1;if(r.length<4)return!0;if(5===r.length){if(3===H.length&&3===W.length){for(var P=W[1],S=0,D=H;S<D.length;S++){if(!l(D[S],P))return!1}for(var w=H[1],R=0,x=W;R<x.length;R++){if(!l(w,x[R]))return!1}return!0}return!1}if(3===H.length){for(var G=0,Y=H[1],L=0,k=r;L<k.length;L++){var C=k[L],O=C[0];C[1];Y===O&&++G}return 2===G}if(3===W.length){G=0;for(var b=W[1],X=0,U=r;X<U.length;X++){var F=U[X];F[0];b===F[1]&&++G}return 2===G}return!1}function generateMaze(){for(var t=[],e=0;e<Maze.HEIGHT;e++){for(var n=[],r=0;r<Maze.HALF_WIDTH;r++)n.push(Maze.Tile.Empty);t.push(n)}for(e=0;e<Maze.HEIGHT;e++)t[e][0]=Maze.Tile.Wall;for(r=0;r<Maze.HALF_WIDTH;r++)t[0][r]=Maze.Tile.Wall,t[Maze.HEIGHT-1][r]=Maze.Tile.Wall;var a=[];for(e=2;e<Maze.HEIGHT-2;e+=2)for(r=2;r<Maze.HALF_WIDTH;r+=2)t[e][r]=Maze.Tile.Wall,a.push([r,e]);for(e=SPAWNER_Y_MIN;e<SPAWNER_Y_MAX;e++)t[e][SPAWNER_X_MIN]=Maze.Tile.Wall;for(r=SPAWNER_X_MIN;r<Maze.HALF_WIDTH;r++)t[SPAWNER_Y_MIN][r]=Maze.Tile.Wall,t[SPAWNER_Y_MAX][r]=Maze.Tile.Wall;t[SPAWNER_Y_MIN][Maze.HALF_WIDTH-1]=Maze.Tile.SpawnWall;var i=5+2*Math.floor(Math.random()*Math.floor((Maze.HEIGHT-9)/2));for(r=0;r<2;r++)t[i-1][r]=Maze.Tile.Wall,t[i+1][r]=Maze.Tile.Wall;function o(t,e){return t>=SPAWNER_X_MIN-1&&e>=SPAWNER_Y_MIN-1&&e<=SPAWNER_Y_MAX+1||(t<4&&Math.abs(e-i)<3||e==Player.SPAWN_Y&&Math.abs(t-Player.SPAWN_X)<2)}t[i][0]=Maze.Tile.Empty;var l=[],s=[];for(e=2;e<Maze.HEIGHT-2;e++)for(r=2;r<Maze.HALF_WIDTH;r++)(1&e)==(1&r)||o(r,e)||l.push([r,e]);function h(e,n){return e>=Maze.HALF_WIDTH&&(e=Maze.WIDTH-1-e),t[n][e]===Maze.Tile.Empty}function f(){if(0!==l.length){var t=Math.floor(Math.random()*l.length),e=l.splice(t,1)[0];return[e[0],e[1]]}var n=Math.floor(Math.random()*s.length),r=s.splice(n,1)[0];return[r[0],r[1]]}function c(t,e){return 0!=(1&t)||0!=(1&e)||(!!h(t,e)||h(t-1,e)&&h(t+1,e)&&h(t,e-1)&&h(t,e+1))}function u(){for(var t=0;t<l.length;t++){var e=l[t],n=e[0],r=e[1];c(n-1,r)||c(n+1,r)||c(n,r-1)||c(n,r+1)||a.splice(t--,1)}}for(;0!==l.length||0!==s.length;){var p=f();r=p[0],e=p[1];t[e][r]=Maze.Tile.Wall,isShapeAllowed(t,r,e)?u():t[e][r]=Maze.Tile.Empty}var m=0,M=[];for(e=0;e<Maze.HEIGHT;e++)for(r=0;r<Maze.WIDTH;r++)t[e][r]===Maze.Tile.Empty&&(e===i&&r<3||e===Player.SPAWN_Y&&Math.abs(r-Player.SPAWN_X)<2||(e<SPAWNER_Y_MIN-2||e>SPAWNER_Y_MAX+2||r<SPAWNER_X_MIN-2)&&(t[e][r]=Maze.Tile.Gold,M.push([r,e]),r!==Maze.HALF_WIDTH-1&&M.push([Maze.WIDTH-r-1,e]),++m,r!==Maze.HALF_WIDTH-1&&++m));for(e=0;e<Maze.HEIGHT;e++)for(r=Maze.HALF_WIDTH-2;r>=0;r--)t[e].push(t[e][r]);var y=M.splice(Math.floor(M.length*Math.random()),1)[0],_=y[0],d=y[1],I=M.splice(Math.floor(M.length*Math.random()),1)[0],T=I[0],g=I[1];return t[d][_]=Maze.Tile.Item,t[g][T]=Maze.Tile.Item,[t,i,m]}var terminal=new Terminal,game=new Game(terminal);document.body.addEventListener("keydown",(function(t){try{null===game&&" "===t.key?(game=new Game(terminal),t.preventDefault()):null==game||game.handleEvent(t)}catch(t){if(t!==GAME_OVER_SIGNAL)throw t;game=null}}));
