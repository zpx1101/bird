//上下文（画笔）
var context;
//记录调用几次画鸟的方法
var index=0;
//取消循环调用函数的标记
var timer;
//标记游戏是否结束
var isGameOver;
//表示管道移动速度
var velocity=10;
//分数，过的管道个数
var score=0;
//计分标记
var isScore;
//将三张小鸟的图片路径放到数组里面
var birdArray=['images/0.gif','images/1.gif','images/2.gif'];
//创建游戏中需要的对象
//背景
var backGround=new BackGround(0,0,400,600,'images/bg.png');
//创建地板
var floor=new Floor(0,550,400,50,'images/ground.png');
//创建上管道
var upPipe=new Pipe(0,0,100,150,'images/pipe.png');
//创建下管道
var downPipe=new Pipe(0,400,100,150,'images/pipe.png');
//创建鸟对象
var bird=new Bird(80,280,40,40);

window.onload=function(){
//拿到画布
var canvas=document.getElementById('canvas');
//获取上下文（画笔）
context=canvas.getContext("2d");
//添加一个键盘事件（按键松开）
document.onkeyup=keyup;
//添加点击事件
document.onclick=gameAgain;
//循环调用一个方法
// setInterval(a,b):a表示循环调用哪个函数，b表示每隔几毫秒调用此函数
timer=setInterval(drawAll,80);
}

//通过按空格键让小鸟上升的函数
//事件函数里面自带事件对象，使用evt来代替事件对象
function keyup (evt){
	//兼容浏览器，有的浏览器获取不到事件对象（window.event）
	evt=evt || window.event;
	//键码：代表键盘里面的值，空格键的键码：32
	//事件对象获取键码
	var currentKey=evt.keyCode || evt.which || evt.charCode;
	//空格键的键码：32
	if (currentKey==32) {
		//小鸟上升
		bird.y-=80;
	}
	//alert(currentKey);
	//alert(arguments[0]);
	//alert('按了按键');
}

//点击屏幕重新开始游戏
function gameAgain (){
    if (isGameOver){
      //重新加载界面
	window.location.reload();
}
	
}
//绘制函数
function drawAll (){
	//让背景对象自己绘图
backGround.drawBgImage();
//画地板
floor.drawFloorImage();
//画上管道
upPipe.drawUpPipe();
//画下管道
downPipe.drawDownPipe();
//画鸟
bird.drawBird();
//移动管道
movePipe();
}

//背景图片的构造函数
function BackGround (x,y,width,height,src){

	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;

	//创建图片属性,创建对象的方式创建图片
	var bgImage=new Image();
	//给图片对象设置图片
	bgImage.src=src;
	this.image=bgImage;

	//添加画图的方法
	this.drawBgImage=function(){
		//画背景图
        //context.drawImage(图片对象,x,y,width,height);
    context.drawImage(backGround.image,backGround.x,backGround.y,backGround.width,backGround.height);
	}
}

//地板的构造函数
function Floor (x,y,width,height,src){

	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;

	//创建图片属性,创建对象的方式创建图片
	var bgImage=new Image();
	//给图片对象设置图片
	bgImage.src=src;
	this.image=bgImage;

	//添加画图的方法
	this.drawFloorImage=function(){
		//画背景图
        //context.drawImage(图片对象,x,y,width,height);
    context.drawImage(floor.image,floor.x,floor.y,floor.width,floor.height);
	}
}

//小鸟的构造函数
function Bird (x,y,width,height){

    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    //画鸟的方法
    this.drawBird=function (){
    	
    	//创建图片对象
    	var image=new Image();
    	//将路径赋值给图片对象
    	//让index始终在0,1,2之间切换
    	/*
    	 第几次  第一次  第二次  第三次   第四次   5     6
    	 index     0        1      2         1     0     1
    	*/
    	image.src=birdArray[index%3];
    	//让次数+1
    	index++;
        //简单画图
        context.drawImage(image,bird.x,bird.y,bird.width,bird.height);
    };
}

//管道的构造函数
function Pipe (x,y,width,height,src){

	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;

	//创建图片属性,创建对象的方式创建图片
	var bgImage=new Image();
	//给图片对象设置图片
	bgImage.src=src;
	this.image=bgImage;

	//添加画上面管道的方法
	this.drawUpPipe=function(){
		//drawImage(图片对象,目标图片的x,目标图片的y,目标图片的宽,目标图片的高,x,y,width,height)
		context.drawImage(upPipe.image,160,500,150,800,upPipe.x,upPipe.y,upPipe.width,upPipe.height);
	}
	//添加画下面管道的方法
	this.drawDownPipe=function(){
		context.drawImage(downPipe.image,0,500,150,500,downPipe.x,downPipe.y,downPipe.width,downPipe.height);
	}
}

//让管道动起来
function movePipe (){
	//让小鸟有重力的效果
	bird.y+=10;
	//if(管道的x坐标+管道的宽<0）管道不见了
	//如果>0，则管道的x坐标一直改变
	if (upPipe.x+upPipe.width<=0&&downPipe.x+downPipe.width<=0){
		// 改变管道的x坐标==画布的宽度
		upPipe.x=400;
		downPipe.x=400;
		//先确定上管道的高度，随机值（100-300)
        upPipe.height=Math.random()*200+100;
        //下管道的y：
        downPipe.y=upPipe.height+200;
        //两管道的之间的距离固定为200
        //下管道的height=地板的y-200-上管道的height
        downPipe.height=floor.y- downPipe.y;
        //开始计分
        isScore=true;
	}else {
		//每次减少多少
		upPipe.x-=velocity;
		downPipe.x-=velocity;
		
	}
	//与地板碰撞(小鸟的y坐标+小鸟的高>=地板的y坐标)
	var floorCondition=bird.y+bird.height>=floor.y+5;
	//与上管道的碰撞，只需判断左上角和右上角的点即可
	/*
	小鸟左上角的x坐标的取值范围:
    上管道的x<=X>=上管道的y+上管道的x+height
	小鸟左上角的y坐标的取值范围:
	上管道的y<=Y<=上管道的y+上管道的height
	小鸟右上角的y坐标的取值范围:
    上管道的x<=X+width<=上管道的x+width
	小鸟右上角的y坐标的取值范围:
	上管道的y<=Y+height<=上管道的y+上管道的height
	*/
	//左上角坐标的取值范围
	var zuoShangJiaoCondition=(bird.x>=upPipe.x&&bird.x<=upPipe.x+upPipe.width)&&(bird.y>=0&&bird.y<=upPipe.y+upPipe.height);
	//右上角坐标的取值范围
	var youShangJiaoCondition=(bird.x+bird.width>=upPipe.x+20&&bird.x+bird.width<=upPipe.x+upPipe.width)&&(bird.y>=0&&bird.y<=upPipe.y+upPipe.height);
    //与下管道的碰撞,只需判断左下角和右下角的点
    /*
    小鸟左下角的x坐标的取值范围:
    下管道的x<=X<=下管道的x+width
	小鸟左上角的y坐标的取值范围:
	上管道的y<=Y<=上管道的y+上管道的height
	小鸟右下角的y坐标的取值范围:
    下管道的x<=X+width<=下管道的x+width
	小鸟右上角的y坐标的取值范围:
	下管道的y<=Y+height<=下管道的y+下管道的height
    */
    //左下角坐标的取值范围
    var zuoXiaJiaoCondition=(bird.x>=downPipe.x&&bird.x<=downPipe.x+downPipe.width)&&(bird.y+bird.height>=downPipe.y&&bird.y<=downPipe.y+downPipe.height);
    //右下角坐标的取值范围
    var youXiaJiaoCondition=(bird.x+bird.width>=downPipe.x+20&&bird.x+bird.width<=downPipe.x+downPipe.width)&&(bird.y+bird.height>=downPipe.y&&bird.y<=downPipe.y+downPipe.height);
    //与天花板碰撞
    var ceilCondition=bird.y<=0;
	if(floorCondition || zuoShangJiaoCondition || youShangJiaoCondition || zuoXiaJiaoCondition || youXiaJiaoCondition || ceilCondition){
		//条件成立的话，碰撞了
		// alert('碰撞了！！！');
		//取消循环调用函数
		clearInterval(timer);
		isGameOver=true;
		//在画布上面显示分数
		//设置文字内容
		//设置文本颜色
		context.fillStyle="red";
		//文本字体及大小
		context.font="30px 宋体";
		/*
		fillText(内容，x，y)
		*/
		context.fillText('你的分数为'+score+'分',100,100);
		
	}
	//过了管道分数增加
	if (isScore&&bird.x>upPipe.x+upPipe.width){
        //增加分数
        score++;
        //每过三个管道速度加快
        if (score%3==0){
        	//增加移动速度
        	velocity+=5;
        }
        //不要计分
		isScore=false;
	}
	console.log(score);
}