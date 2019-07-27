
        function cL(args){
			//console.log(args);
		}

    function Dragging(sagGridObj){
        this.sagGridObj = sagGridObj;
    }


    Dragging.prototype.dragDropCol = function(){

    	var thisObj = this;
         var self = this.sagGridObj;
         $((this.sagGridObj.gridEle).querySelectorAll( ".sag_colDrag" )).draggable({ revert: true, helper: "clone" });

         $((this.sagGridObj.gridEle).querySelectorAll( ".sag_colDrag" )).droppable({
                            accept: ".sag_colDrag",
                            activeClass: "ui-state-hover",
                            hoverClass: "ui-state-active",
                            drop: function( event, ui ) {

                                var draggable = ui.draggable, droppable = $(this);
                        
                                var dragColId = $(draggable).attr("colId"),dropColId = $(droppable).attr("colId");

                                let dragColPos = $(draggable).attr("colPos"),dropColPos = $(droppable).attr("colPos");

                                let colPosSame = false;

                                if(dragColPos == dropColPos){
                                   colPosSame =  true;
                                }else{
                                    colPosSame = false;
                                }

                                if(dragColId != undefined && dropColId != undefined && colPosSame){

                                    var startIndex = self.colIdArray[dragColPos].indexOf(dragColId);
                                    var endIndex = self.colIdArray[dragColPos].indexOf(dropColId);
                                    if(startIndex < endIndex){
                                        for(let i=startIndex;i<endIndex;i++){
											let temp = self.colIdArray[dragColPos][i];
                                            self.colIdArray[dragColPos][i] = self.colIdArray[dragColPos][i+1];
											self.colIdArray[dragColPos][i+1] = temp;
                                           swipeCol(self.colIdArray[dragColPos][i],self.colIdArray[dragColPos][i+1],colPosSame);

                                           //change in original colDataArray for append new col
                                           
                                           let dragIndex;
                                           let dropIndex;
                                           
                                           for(let j=0;j<self.colData.length;j++){
              
                                        	   if(self.colIdArray[dragColPos][i] == self.colData[j]["sagColClass"]){
                                        		   dragIndex = j;
                                        	   }
                                        	   
                                        	   if(self.colIdArray[dragColPos][i+1] == self.colData[j]["sagColClass"]){
                                        		   dropIndex = j;
                                        	   }
                                           }
                                           
                                             let temp2 =self.colData[dragIndex];                                          
                                             self.colData[dragIndex] = self.colData[dropIndex];
											 self.colData[dropIndex] = temp2;
                                           
                                        }
                                        console.log(self.colIdArray[dragColPos]);
                                    }else{
                                        for(let i=startIndex;i>endIndex;i--){
                                             let temp = self.colIdArray[dragColPos][i];
                                             self.colIdArray[dragColPos][i] = self.colIdArray[dragColPos][i-1];
                                             self.colIdArray[dragColPos][i-1] = temp;
                                             swipeCol(self.colIdArray[dragColPos][i],self.colIdArray[dragColPos][i-1],colPosSame);

                                             //change in original colDataArray for append new col
                                             
                                             let dragIndex;
                                             let dropIndex;
                                             
                                             for(let j=0;j<self.colData.length;j++){
                
                                          	   if(self.colIdArray[dragColPos][i] == self.colData[j]["sagColClass"]){
                                          		   dragIndex = j;
                                          	   }
                                          	   
                                          	   if(self.colIdArray[dragColPos][i-1] == self.colData[j]["sagColClass"]){
                                          		   dropIndex = j;
                                          	   }
                                             }
                                             
                                               let temp2 =self.colData[dragIndex];                                          
                                               self.colData[dragIndex] = self.colData[dropIndex];
  											 self.colData[dropIndex] = temp2;
                                        }
                                        console.log(self.colIdArray);
                                    } 
                            
                                    function swipeCol(dragColId,dropColId,colPosSame){
                                  
                                    draggable = $((thisObj.sagGridObj.gridEle).querySelectorAll("."+dragColId));
                                    droppable = $((thisObj.sagGridObj.gridEle).querySelectorAll("."+dropColId));

                                     var dragWidth = draggable.outerWidth();
                                     var dropWidth = droppable.outerWidth();
                                
                                    
                                    var dragPos = draggable.position(), dropPos = droppable.position();

                                    let dragNewLeft;
                                    let dropNewLeft
                                    if(colPosSame){
                                          dragNewLeft = dropPos.left;
                                          dropNewLeft =dragPos.left;
                                          
                                          if(dropNewLeft > dragNewLeft){
                                              dragNewLeft = dragNewLeft;
                                              dropNewLeft = dragNewLeft + dragWidth;
                                          }else{
                                              dropNewLeft = dropNewLeft;
                                              dragNewLeft = dropNewLeft+dropWidth;
                                          }
                                          
                                          draggable.css({
                                              left: dragNewLeft+'px', //dropPos.left;
                                              top: dropPos.top+'px',
                                              width: dragWidth+'px'
                                          });

                                          droppable.css({
                                              left: dropNewLeft+'px', //dragPos.left+'px',
                                              top: dragPos.top+'px',
                                              width: dropWidth+'px'
                                          });
                                          thisObj.swap(draggable,droppable);
                                          
                                    }else{
                                    	
                                        // dragNewLeft = dragPos.left;
                                        // dropNewLeft =dropPos.left;
                                    }
                                    
                                 
                                }
                            }
                          }
                        });
    }
    
    Dragging.prototype.swap = function(thisA,b){ 
        b = jQuery(b)[0]; 
        var a = thisA[0]; 
        var t = a.parentNode.insertBefore(document.createTextNode(''), a); 
        b.parentNode.insertBefore(a, b); 
        t.parentNode.insertBefore(b, t); 
        t.parentNode.removeChild(t); 
        return thisA; 
    };
