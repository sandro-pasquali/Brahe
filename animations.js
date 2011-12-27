
var ANIM = new Object();
var ENV = new Object();

ENV.X = ENV.Y = 0;
ENV.IE = (document.all);
ENV.NS = (!ENV.IE);
ENV.SCREEN_X = screen.availWidth;
ENV.SCREEN_Y = screen.availHeight;
ENV.blockState = 0;
ENV.dockbarX = 14;
ENV.dockbarY = 14;
ENV.cursorRefs = new 
Array('CUR_TL','CUR_TR','CUR_BL','CUR_BR','CUR_TL2','CUR_TR2','CUR_BL2','CUR_BR2');
ENV.dockbarCoords = new Array('34:1','67:1','1:67','34:67','1:1','1:34','67:34','67:67');

ENV.show = function(thisEl)
  {
    (ENV.IE) ? document.all[thisEl].style.visibility = 'visible' : document.layers[thisEl].visibility = 'show';
    return;
  }
  
ENV.hide = function(thisEl)
  {
    (ENV.IE) ? document.all[thisEl].style.visibility = 'hidden' : document.layers[thisEl].visibility = 'hide';
    return;
  }

ENV.getRef = function(thisName)
  {
    return((ENV.IE) ? document.all[thisName].style : document.layers[thisName]);
  }

ENV.moveTo = function(thisEl,thisX,thisY)
  {
    var oRef = (ENV.IE) ? document.all[thisEl].style : document.layers[thisEl];
    oRef.left = thisX + ENV.dockbarX;
	oRef.top = thisY + ENV.dockbarY;
	return;
  }
 
ENV.turnDockpadOn = function()
  {
    if(!ENV.fixIsOn && (ENV.srcName.indexOf("BR")==-1))
	  {
        ENV.show('DOCKPAD');
	    ENV.moveTo('DOCKPAD',ENV.left,ENV.top);
	  }
	return;
  }

ENV.turnDockpadOff = function()
  {
    if(!ENV.fixIsOn)
	  {
        ENV.hide('DOCKPAD');
	  }
    return;
  }

function rollMenu(thisOb,state)
  {
    var IS = thisOb.src;
    var CR = thisOb.name.replace('i_','')
	if(eval("ANIM['" + CR + "'].fixed"))
	  {	
        //alert(CR);
	  }
    return;
  }

function makePrecise()
  {
    if(ENV.fixIsOn && (ENV.currentBlock.indexOf("BR")==-1))
	  {
	    for(x=0; x < ENV.dockbarCoords.length; x++)
		  {
		    var coords = ENV.dockbarCoords[x].split(':');
		    ANIM[ENV.cursorRefs[x]].MoveTo(ENV.FX + parseInt(coords[0]),ENV.FY + parseInt(coords[1]));
		  }
		//var oRef = ENV.getRef(ENV.currentBlock);
		//oRef.zIndex = 99;
	  }
	return;
  }

function mDown(e) 
  {
    if((ENV.srcName.indexOf("NAV")!=-1) || ENV.fixIsOn)
	  {
        var tFX = ENV.left + ENV.dockbarX;
	    var tFY = ENV.top + ENV.dockbarY;
	    ENV.FX = tFX;
	    ENV.FY = tFY;
		ENV.currentBlock = ENV.srcName;
        for(x=0; x < ENV.cursorRefs.length; x++)
	      {
            var AnimRef = ANIM[ENV.cursorRefs[x]];
            var coords = ENV.dockbarCoords[x].split(':');
			if(ENV.currentBlock.indexOf("BR")==-1)
		      {
		        AnimRef.fixedX = tFX + parseInt(coords[0]);
		        AnimRef.fixedY = tFY + parseInt(coords[1]);
			  }
			else
			  {
			    AnimRef.fixedX = tFX -2500;
				AnimRef.fixedY = tFY -2500;
			  }
		    AnimRef.fixed = (AnimRef.fixed) ? 0 : 1;
		  }
	    if(AnimRef.fixed)
		  {
            ENV.turnDockpadOn();
		    ENV.precisionTimer = setTimeout("makePrecise()",900);
			ENV.fixIsOn = 1;
		  }
		else
		  {
		    ENV.fixIsOn = 0;
			ENV.turnDockpadOff();
			ENV.precisionTimer = null;
	        //var oRef = ENV.getRef(ENV.currentBlock);
		    //oRef.zIndex = 200;
	      }
	  }
    return; 
  }

function mMove(e)
  {
    (!e) && (e = window.event);
    ENV.X = (ENV.IE) ? e.clientX : e.pageX;
    ENV.Y = (ENV.IE) ? e.clientY : e.pageY; 
	ENV.srcElement = (ENV.IE) ? e.srcElement : e.target;
    ENV.srcImage = (ENV.IE) ? ENV.srcElement.id : ENV.srcElement.name;
    ENV.srcName = (ENV.srcImage) ? ENV.srcImage.replace('i_','') : '';
	ENV.oRef = (ENV.srcName) ? ((ENV.IE) ? document.all[ENV.srcName].style : document.layers[ENV.srcName]) : '';
	if(ENV.srcName)
	  {
        ENV.left = parseInt(ENV.oRef.left);
        ENV.top = parseInt(ENV.oRef.top);	  
	  }
	status = ENV.srcName;
    return;  
  }

function mUp(e)
  {
    return;
  }

function mDblClick(e)
  {
    return;
  }

function init()
  { 
    if(ENV.NS)
      { 
        document.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP | Event.DBLCLICK) 
      } 
    document.onmousedown = mDown; 
    document.onmousemove = mMove; 
    document.onmouseup = mUp;
    document.ondblclick = mDblClick;
	
    ANIM['CUR_TR'] = new animObj('CUR_TR',50,0,-25);
    ANIM['CUR_TL'] = new animObj('CUR_TL',45,-25,-25);
    ANIM['CUR_BL'] = new animObj('CUR_BL',40,-25,0);
    ANIM['CUR_BR'] = new animObj('CUR_BR',35,0,0);
    ANIM['CUR_TR2'] = new animObj('CUR_TR2',30,15,-40);
    ANIM['CUR_TL2'] = new animObj('CUR_TL2',25,-40,-40);
    ANIM['CUR_BL2'] = new animObj('CUR_BL2',20,-40,15);
    ANIM['CUR_BR2'] = new animObj('CUR_BR2',15,15,15);

    var COLL = (ENV.IE ? document.all : document.layers);
	for(n=0; n < COLL.length; n++)
	  {
	    var testID = (ENV.IE) ? COLL[n].id : COLL[n].name;
		if(testID && testID.indexOf("i_")==-1) 
		  {
		    if(testID.indexOf("NAV") !=-1)
			  {
			    COLL[n].onmouseover = ENV.turnDockpadOn;
				COLL[n].onmouseout = ENV.turnDockpadOff;
			  }
			else if(testID.indexOf("CUR") != -1)
			  {
			    COLL[n].onmouseover = function() { }
			  }
		  }
	  }
    return;
  } 

function animObj(id,interval,offsetX,offsetY,gapClose)
  { 
    this.id = id;
    this.element = (ENV.IE) ? document.all[this.id].style : document.layers[this.id];
    this.name = id;
    this.interval = interval;
    this.Xoffset = offsetX || 0;
    this.Yoffset = offsetY || 0;
    this.gapClose = gapClose || .2;
    this.deltaX = 0;
    this.deltaY = 0;
    this.fixed = 0; 
    this.timer = setInterval("ANIM['" + this.name + "'].Step()",this.interval); 
    return;
  }

animObj.prototype.fixedX = 0;
animObj.prototype.fixedY = 0;
animObj.prototype.Left = function() { return parseInt(this.element.left); }
animObj.prototype.Top = function() { return parseInt(this.element.top); }
animObj.prototype.MoveTo = function(x,y) {this.element.left = x; this.element.top = y; }

animObj.prototype.Step = function()
  { 
    var thisX = (this.fixed) ? this.fixedX-this.Xoffset : ENV.X;
	var thisY = (this.fixed) ? this.fixedY-this.Yoffset : ENV.Y;
    this.deltaX = (this.Left() - (thisX + this.Xoffset))*(-1)*this.gapClose;
	this.deltaY = (this.Top() - (thisY + this.Yoffset))*(-1)*this.gapClose;
    this.MoveTo(this.Left() + this.deltaX, this.Top() + this.deltaY);
    return;
  }



