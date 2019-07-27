
    function Resize(sagGridObj){
        this.sagGridObj = sagGridObj;
    }


    Resize.prototype.onResize = function(){
    	

    	 var thisObj = this;
         var self = this.sagGridObj;
         
         $(".sagGridResize").draggable({
        	  axis: 'x',
        	  start:function( event,ui){
        		  
        		  thisObj.startLeftPos = ui.helper.offset().left;
        		  
        		  let currentColDiv =  ui.helper.parent()[0];
        		  
        		  thisObj.curColWidth =  $(currentColDiv).outerWidth();
        		  let currentColLeft = currentColDiv.offsetLeft;

        		  thisObj.resizeCellPos = currentColDiv.getAttribute("colpos");
        		  thisObj.resizeColId =  currentColDiv.getAttribute("colid");
        		  thisObj.resizeColField =  currentColDiv.getAttribute("colfield");
        		  
        		  thisObj.allColIdList = [];
        		  let nodeList = (self.gridEle).querySelectorAll('.header_cell[colpos="'+thisObj.resizeCellPos+'"]');
        		  for (let i = 0; i < nodeList.length; i++) {
        			  let node = nodeList[i];
        			  let nodeColId = node.getAttribute("colid");
        			  if(nodeColId != thisObj.resizeColId && node.offsetLeft > currentColLeft){
        				  
        				  let obj = {};
        				  obj["colId"]= nodeColId;
        				  obj["colLeft"] = $("."+nodeColId).position().left;
      				  
        				  thisObj.allColIdList.push(obj);
        			  }
        			  
        			}
        		  
        		  thisObj.parentDiv = (self.gridEle).querySelectorAll('div[parent="'+thisObj.resizeCellPos+'"]');
        		  thisObj.parentWidth = 0;
        		  if(thisObj.resizeCellPos == 'center'){
        			  //thisObj.parentWidth =  thisObj.parentDiv[0].scrollWidth;
        			  
        			  //changes According to resize without freezing   
        			  let widthInPx = thisObj.parentDiv[0].style.width;
        			  widthInPx = widthInPx.replace("px","");
        			  thisObj.parentWidth = Number(widthInPx);
        			 
        			  thisObj.centerWidth = thisObj.sagGridObj.centerTableWidth;
        		  }else if(thisObj.resizeCellPos == 'left') {
        			  thisObj.parentWidth =  $(thisObj.parentDiv[0]).outerWidth();   
        			  thisObj.leftWidth = thisObj.sagGridObj.leftTableWidth;
        		  }else if(thisObj.resizeCellPos == 'right'){
        			  thisObj.parentWidth =  $(thisObj.parentDiv[0]).outerWidth();
        			  thisObj.rightWidth = thisObj.sagGridObj.rightTableWidth;
        		  }else{
        			 console.error("Error in find parent div for calculate width. resize.js");
        		  }
        	  },
        	  drag: function( event, ui ) {
        		  
        		  let a = ui.helper.parent()[0];
        		  //let left = $(a).position().left;
        	
        		  thisObj.stopLeftPos = ui.helper.offset().left;
        		  let totalDragLeft = thisObj.stopLeftPos - thisObj.startLeftPos;
        		  
        		 // thisObj.resizeColId, thisObj.resizeCellPos, thisObj.allColIdList
        		  
        		  let width = thisObj.curColWidth
        		  width = totalDragLeft + width;
        		 
        		
        		 //check condition for max resize
        		  let sml_headBodyWidth =  $((self.gridEle).querySelector(".sml_headBody")).width();
        		  sml_headBodyWidth = sml_headBodyWidth - 50;
        		 let isMaxCond = true;
        		 if(thisObj.resizeCellPos == 'left'){
        			 if(sml_headBodyWidth < thisObj.leftWidth + totalDragLeft)
        				 isMaxCond = false;
          		  }else if(thisObj.resizeCellPos == 'right'){
           			if((sml_headBodyWidth) < thisObj.rightWidth + totalDragLeft)
       				 isMaxCond = false;
           		  }

        		  //check condition for minimum resize 
        		 if(width > 100 && isMaxCond){
        			 
        			 

           		  if(thisObj.resizeCellPos == 'center'){
           			  thisObj.sagGridObj.centerTableWidth = thisObj.centerWidth + totalDragLeft;
           		  }else if(thisObj.resizeCellPos == 'left') {
           			  thisObj.sagGridObj.leftTableWidth = thisObj.leftWidth + totalDragLeft;;
           		  }else if(thisObj.resizeCellPos == 'right'){
           			  thisObj.sagGridObj.rightTableWidth = thisObj.rightWidth + totalDragLeft;;
           		  }else{
           			 console.error("Error in find parent div for calculate width. resize.js");
           		  }
           		  
           		  let parentWidth = totalDragLeft + thisObj.parentWidth;
           		  $(thisObj.parentDiv).css("width",parentWidth);
           		  
        		  
        		  $("."+thisObj.resizeColId).css("width",width);
        		  for (let i = 0; i < thisObj.sagGridObj.colData.length; i++) {
        			  let obj = thisObj.sagGridObj.colData[i];
        			  if(obj.field == thisObj.resizeColField){
        				  thisObj.sagGridObj.colData[i].width = width+"px";
        			  }
        		  }
        		  
 
        		  for (let i = 0; i < thisObj.allColIdList.length; i++) {
        			  let obj = thisObj.allColIdList[i];
        			  let colId = obj.colId;
        			  let nodeLeft = obj.colLeft;
        			  nodeLeft = nodeLeft + totalDragLeft;
        			  $("."+colId).css("left",nodeLeft);
        			}
        		  
        		 }
        	  },
        	  
        	  stop:function( event, ui ) {
        		  
        		  ui.helper[0].style.left = "auto";
        		  ui.helper[0].style.top = "auto";
        		  
        		  self.bottomScrollObj.applyScrollOnChange();
        		 
        	  }
        });
    	
    }
    
