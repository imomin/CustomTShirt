var canvas;
var tshirts = new Array(); //prototype: [{style:'x',color:'white',front:'a',back:'b',price:{tshirt:'12.95',frontPrint:'4.99',backPrint:'4.99',total:'22.47'}}]
var a;
var b;
var line1;
var line2;
var line3;
var line4;
 	document.addEventListener('DOMContentLoaded', function() {
		//setup front side canvas 
 		canvas = new fabric.Canvas('tcanvas', {
		  hoverCursor: 'pointer',
		  selection: true,
		  selectionBorderColor:'blue'
		});
 		canvas.on({
			 'object:moving': function(e) {		  	
			    e.target.opacity = 0.5;
			  },
			  'object:modified': function(e) {		  	
			    e.target.opacity = 1;
			  },
			 'object:selected':onObjectSelected,
			 'selection:cleared':onSelectedCleared
		 });
		// piggyback on `canvas.findTarget`, to fire "object:over" and "object:out" events
 		canvas.findTarget = (function(originalFn) {
		  return function() {
		    var target = originalFn.apply(this, arguments);
		    if (target) {
		      if (this._hoveredTarget !== target) {
		    	  canvas.fire('object:over', { target: target });
		        if (this._hoveredTarget) {
		        	canvas.fire('object:out', { target: this._hoveredTarget });
		        }
		        this._hoveredTarget = target;
		      }
		    }
		    else if (this._hoveredTarget) {
		    	canvas.fire('object:out', { target: this._hoveredTarget });
		      this._hoveredTarget = null;
		    }
		    return target;
		  };
		})(canvas.findTarget);

 		canvas.on('object:over', function(e) {		
		  //e.target.setFill('red');
		  //canvas.renderAll();
		});
		
 		canvas.on('object:out', function(e) {		
		  //e.target.setFill('green');
		  //canvas.renderAll();
		});
		 		 	 
		document.getElementById('add-text').onclick = function() {
			var text = document.getElementById("text-string").value;
		    var textSample = new fabric.Text(text, {
		      left: fabric.util.getRandomInt(0, 200),
		      top: fabric.util.getRandomInt(0, 400),
		      fontFamily: 'helvetica',
		      angle: 0,
		      fill: '#000000',
		      scaleX: 0.5,
		      scaleY: 0.5,
		      fontWeight: '',
	  		  hasRotatingPoint:true
		    });		    
            canvas.add(textSample);	
            canvas.item(canvas.item.length-1).hasRotatingPoint = true;    
						var textEditor = document.getElementById("texteditor");
						textEditor.style.display = "block";
						var imageEditor = document.getElementById("imageeditor");
						imageEditor.style.display = "block";
	  	};
	  	document.getElementById("text-string").addEventListener("keyup",function(){	  		
	  		var activeObject = canvas.getActiveObject();
		      if (activeObject && activeObject.type === 'text') {
		    	  activeObject.text = this.value;
		    	  canvas.renderAll();
		      }
			});

			var imgPolaroids = document.getElementsByClassName("img-polaroid");
			for (let imgPolaroid of imgPolaroids) {
				imgPolaroid.onclick = function(e){
					var el = e.target;
					/*temp code*/
					var offset = 50;
						var left = fabric.util.getRandomInt(0 + offset, 200 - offset);
						var top = fabric.util.getRandomInt(0 + offset, 400 - offset);
						var angle = fabric.util.getRandomInt(-20, 40);
						var width = fabric.util.getRandomInt(30, 50);
						var opacity = (function(min, max){ return Math.random() * (max - min) + min; })(0.5, 1);
						
					fabric.Image.fromURL(el.src, function(image) {
								image.set({
									left: left,
									top: top,
									angle: 0,
									padding: 10,
									cornersize: 10,
									hasRotatingPoint:true
								});
								//image.scale(getRandomNum(0.1, 0.25)).setCoords();
								canvas.add(image);
							});
				}
			}

	  document.getElementById('remove-selected').onclick = function() {		  
		    var activeObject = canvas.getActiveObject(),
		        activeGroup = canvas.getActiveGroup();
		    if (activeObject) {
		      canvas.remove(activeObject);
		      document.getElementById("text-string").value = "";
		    }
		    else if (activeGroup) {
		      var objectsInGroup = activeGroup.getObjects();
		      canvas.discardActiveGroup();
		      objectsInGroup.forEach(function(object) {
		        canvas.remove(object);
		      });
		    }
	  };
	  document.getElementById('bring-to-front').onclick = function() {		  
		    var activeObject = canvas.getActiveObject(),
		        activeGroup = canvas.getActiveGroup();
		    if (activeObject) {
		      activeObject.bringToFront();
		    }
		    else if (activeGroup) {
		      var objectsInGroup = activeGroup.getObjects();
		      canvas.discardActiveGroup();
		      objectsInGroup.forEach(function(object) {
		        object.bringToFront();
		      });
		    }
	  };
	  document.getElementById('send-to-back').onclick = function() {		  
		    var activeObject = canvas.getActiveObject(),
		        activeGroup = canvas.getActiveGroup();
		    if (activeObject) {
		      activeObject.sendToBack();
		    }
		    else if (activeGroup) {
		      var objectsInGroup = activeGroup.getObjects();
		      canvas.discardActiveGroup();
		      objectsInGroup.forEach(function(object) {
		        object.sendToBack();
		      });
		    }
	  };		  
	  document.getElementById("text-bold").addEventListener("click", function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
		    activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');		    
		    canvas.renderAll();
		  }
		});
	  document.getElementById("text-italic").addEventListener("click", function() {		 
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');		    
		    canvas.renderAll();
		  }
		});
	  document.getElementById("text-strike").addEventListener("click", function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
		    canvas.renderAll();
		  }
		});
	  document.getElementById("text-underline").addEventListener("click", function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
		    canvas.renderAll();
		  }
		});
	  document.getElementById("text-left") && document.getElementById("text-left").addEventListener("click", function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'left';
		    canvas.renderAll();
		  }
		});
	  document.getElementById("text-center") && document.getElementById("text-center").addEventListener("click", function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'center';		    
		    canvas.renderAll();
		  }
		});
	  document.getElementById("text-right") && document.getElementById("text-right").addEventListener("click", function() {		  
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'text') {
			  activeObject.textAlign = 'right';		    
		    canvas.renderAll();
		  }
		});	  
	  document.getElementById("font-family") && document.getElementById("font-family").addEventListener("change", function() {
	      var activeObject = canvas.getActiveObject();
	      if (activeObject && activeObject.type === 'text') {
	        activeObject.fontFamily = this.value;
	        canvas.renderAll();
	      }
	    });	  

			document.getElementById("text-fontcolor").onchange = function() {
			var activeObject = canvas.getActiveObject();
			if (activeObject && activeObject.type === 'text') {
				activeObject.fill = this.value;
				canvas.renderAll();
			}
		};

		document.getElementById("text-strokecolor").onchange = function() {
			var activeObject = canvas.getActiveObject();
			if (activeObject && activeObject.type === 'text') {
				activeObject.strokeStyle = this.value;
				canvas.renderAll();
			}
		};
	
		//canvas.add(new fabric.fabric.Object({hasBorders:true,hasControls:false,hasRotatingPoint:false,selectable:false,type:'rect'}));
	   document.getElementById("drawingArea").addEventListener("onmouseover", 
	        function() { 	        	
	        	 canvas.add(line1);
		         canvas.add(line2);
		         canvas.add(line3);
		         canvas.add(line4); 
						 canvas.renderAll();
						 
						 canvas.remove(line1);
		         canvas.remove(line2);
		         canvas.remove(line3);
		         canvas.remove(line4);
		         canvas.renderAll();
	        }
			);
			var colorPicker = document.getElementById("color-picker");
			colorPicker.onchange = function() {
				document.getElementById("shirtDiv").style.backgroundColor = this.value;
			};
		 
		 document.getElementById("flip").onclick = 
		   function() {			   
			   	if (this.getAttribute("data-original-title") == "Show Back View") {
			   		this.setAttribute('data-original-title', 'Show Front View');			        		       
			        document.getElementById("tshirtFacing").setAttribute("src","img/crew_back.png");			        
			        a = JSON.stringify(canvas);
			        canvas.clear();
			        try
			        {
			           var json = JSON.parse(b);
			           canvas.loadFromJSON(b);
			        }
			        catch(e)
			        {}
			        
			    } else {
			    	this.setAttribute('data-original-title', 'Show Back View');			    				    	
			    	document.getElementById("tshirtFacing").setAttribute("src","img/crew_front.png");			    	
			    	b = JSON.stringify(canvas);
			    	canvas.clear();
			    	try
			        {
			           var json = JSON.parse(a);
			           canvas.loadFromJSON(a);			           
			        }
			        catch(e)
			        {}
			    }		
			   	canvas.renderAll();
			   	setTimeout(function() {
			   		canvas.calcOffset();
			    },200);			   	
        };	   
	   $(".clearfix button,a").tooltip();
	   line1 = new fabric.Line([0,0,200,0], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line2 = new fabric.Line([199,0,200,399], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line3 = new fabric.Line([0,0,0,400], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	   line4 = new fabric.Line([0,400,200,399], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
	 });//doc ready
	 
	 
	 function getRandomNum(min, max) {
	    return Math.random() * (max - min) + min;
	 }
	 
	 function onObjectSelected(e) {	 
	    var selectedObject = e.target;
	    document.getElementById("text-string").value = "";
	    selectedObject.hasRotatingPoint = true
	    if (selectedObject && selectedObject.type === 'text') {
	    	//display text editor	    	
				var textEditor = document.getElementById("texteditor");
				textEditor.style.display = "block";
	    	document.getElementById("text-string").value = selectedObject.getText();
	    	document.getElementById("text-fontcolor").value = selectedObject.fill;
	    	document.getElementById("text-strokecolor").value = selectedObject.strokeStyle;	
				var imageEditor = document.getElementById("imageeditor");
				imageEditor.style.display = "block";
	    }
	    else if (selectedObject && selectedObject.type === 'image'){
				//display image editor
				var textEditor = document.getElementById("texteditor");
				textEditor.style.display = "none";
				var imageEditor = document.getElementById("imageeditor");
				imageEditor.style.display = "block";
	    }
	  }
	 function onSelectedCleared(e){
		 var textEditor = document.getElementById("texteditor");
		 textEditor.style.display = "none";
		 document.getElementById("text-string").value = "";
		 var imageEditor = document.getElementById("imageeditor");
		 imageEditor.style.display = "none";
	 }
	 function setFont(font){
		  var activeObject = canvas.getActiveObject();
	      if (activeObject && activeObject.type === 'text') {
	        activeObject.fontFamily = font;
	        canvas.renderAll();
	      }
	  }
	 function removeWhite(){
		  var activeObject = canvas.getActiveObject();
		  if (activeObject && activeObject.type === 'image') {			  
			  activeObject.filters[2] =  new fabric.Image.filters.RemoveWhite({hreshold: 100, distance: 10});//0-255, 0-255
			  activeObject.applyFilters(canvas.renderAll.bind(canvas));
		  }	        
	 }