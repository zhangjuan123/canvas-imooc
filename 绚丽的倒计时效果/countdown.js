/*最多四天内的倒计时*/
/*const endTime = new Date(2017,2,5,18,12,10);*/
/*当前时间后一小时倒计时*/
/*var endTime = new Date();
endTime.setTime(endTime.getTime()+5*1000);*/

var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33b5e5","#09c","#a6c","#93c","#9c0","#690","#fb3","#f80","#f44","#c00"];

    var WINDOW_WIDTH = document.body.clientWidth;
	var WINDOW_HEIGHT = document.body.clientHeight;

window.onload = function(){
	
	
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108 )-1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        function(){
            render( context );
            update();
        }
        ,
        50
    );
}
function getCurrentShowTimeSeconds() {
	var currTime = new Date();
	/*倒计时效果*/
	/*var ret = endTime.getTime()-currTime.getTime();
	ret= Math.round( ret/1000 );
	if(ret== -1){
		alert("倒计时结束了！该休息啦！")
	}
	return ret>=0 ? ret : 0;
	*/
	/*时钟效果*/
	var ret =currTime.getHours()*3600 + currTime.getMinutes()*60 + currTime.getSeconds() ;
	return ret;
}
 
//时间改变
function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 );
    var nextSeconds = nextShowTimeSeconds % 60;
    
    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 );
    var curSeconds = curShowTimeSeconds % 60;
    if(nextSeconds != curSeconds){
    	if(parseInt(curHours/10) != parseInt(nextHours/10) ){
    		addBalls(MARGIN_LEFT, MARGIN_TOP,parseInt(curHours/10));
    	}
    	if(parseInt(curHours %10) != parseInt(nextHours%10) ){
    		addBalls(MARGIN_LEFT +15*(RADIUS+1), MARGIN_TOP,parseInt(curHours%10));
    	}
    	
    	if(parseInt(curMinutes /10) != parseInt(nextMinutes/10) ){
    		addBalls(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP,parseInt(curMinutes/10));
    	}
    	if(parseInt(curMinutes %10) != parseInt(nextMinutes%10) ){
    		addBalls(MARGIN_LEFT +69*(RADIUS+1), MARGIN_TOP,parseInt(curMinutes%10));
    	}
    	
    	if(parseInt(curSeconds /10) != parseInt(nextSeconds/10)){
    		addBalls(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP,parseInt(curSeconds/10));
    	}
    	if(parseInt(curSeconds %10) != parseInt(nextSeconds%10) ){
    		addBalls(MARGIN_LEFT +93*(RADIUS+1), MARGIN_TOP,parseInt(nextSeconds%10));
    	}
    	curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateBalls();
    
   
}

 
 function updateBalls(){
 	for(var i=0; i<balls.length; i++){
 		balls[i].x += balls[i].vx;
 		balls[i].y += balls[i].vy;
 		balls[i].vy += balls[i].g;
 		
 		if(balls[i].y > WINDOW_HEIGHT-RADIUS){
 			balls[i].y =WINDOW_HEIGHT-RADIUS;
 			balls[i].vy = -balls[i].vy*0.75;
 		}
 	}
 	var cnt = 0 ;
 	for(var i = 0; i < balls.length ; i++){
 		if( balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH )
 		balls[cnt++] = balls[i];
 		
 	}
 	while(balls.length > Math.min(300,cnt) ){
 			balls.pop();
 		}
 }
 
function addBalls(x,y,num){
	for( var i=0;i<digit[num].length;i++){
		for( var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx: Math.pow(-1,Math.ceil(Math.random()*1000) ) *4,
					vy:-10*Math.random(),
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

//绘制
function render( ctx ){

    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , ctx )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , ctx )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , ctx )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , ctx);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , ctx);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , ctx);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , ctx);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , ctx);
    
    
    
    for(var i=0 ;i<balls.length; i++){
    	ctx.fillStyle =balls[i].color;
    	
    	ctx.beginPath();
    	ctx.arc(balls[i].x, balls[i].y,RADIUS , 0 , 2*Math.PI , true);
    	ctx.closePath();
    	
    	ctx.fill();
    }
}

 function renderDigit(x , y ,num , ctx){
 	ctx.fillStyle = "rgb(0,102,153)";
 	
 	for(var i=0; i<digit[num].length;i++){
 		for(var j=0; j<digit[num][i].length;j++){
 			if(digit[num][i][j]==1){
 				ctx.beginPath();
 				ctx.arc( x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS,0, 2*Math.PI);
 				ctx.closePath();
 				ctx.fill();
 			}
 			
 		}
 		
 	}
 }



