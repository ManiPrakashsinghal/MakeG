function Scroll(sagGridObj){
        this.sagGridObj = sagGridObj;

        this.sourceDivId = sagGridObj.sourceDivId;

		this.lastScrollTop = 0;
		this.upIndex = 0;
		this.downIndex = 0;
		this.lastUpScroll = 0;
		this.lastDownScroll = 0;
		this.gridRowObj = this.sagGridObj.gridRowObj;
		this.throttlescroll;
		
		this.rowData = this.sagGridObj.rowData;
        this.colData = this.sagGridObj.colData;
        this.rowLen = this.rowData.length;
        this.colLen = this.colData.length;
        this.gridEle = this.sagGridObj.gridEle;
        this.tableBody = this.sagGridObj.tableBody;
        this.leftTableBody = this.sagGridObj.tableBodyLeft;
        this.righTableBody = this.sagGridObj.tableBodyRight;
        this.centerTableBody = this.sagGridObj.tableBodyCenter;
        
        this.totalRow = 0;

	}
	
	Scroll.prototype.setRowLen = function(length){
		this.rowLen = length;
	}
	
	Scroll.prototype.resetScroll = function(){
		this.addGridScroll();
	}
	

	Scroll.prototype.changeRowDataLen = function(){
		
		this.rowData = this.sagGridObj.rowData;
		this.rowLen = this.sagGridObj.rowData.length;
		
	}
	

	Scroll.prototype.addGridScroll = function(){
	
					let thisObj = this;
					
					//verScroll
					$((this.sagGridObj.gridEle).querySelectorAll("#verScroll")).unbind( "scroll" );
					$((this.sagGridObj.gridEle).querySelectorAll("#verScroll")).scroll(function(event) {
					
							    let ele = this;
							    let pos =  $(ele).scrollTop();
							    event.preventDefault();
							    
							    $((thisObj.sagGridObj.gridEle).querySelectorAll("#verScroll")).animate({scrollTop:pos}, 0, 'linear', function() { 
							    	thisObj.eventOnScroll(ele);
							    });
							    
							    /*$((thisObj.sagGridObj.gridEle).querySelectorAll("#verScroll")).stop().animate({scrollTop:pos}, 00, 'linear', function() { 
							    	thisObj.eventOnScroll(ele);
							    });*/
							    
							   /* clearTimeout(thisObj.throttlescroll)
							        thisObj.throttlescroll = setTimeout(function(){ // throttle code inside scroll to once every 50 milliseconds
							        	thisObj.eventOnScroll(ele);
						        },00)*/
						  });
	}
	
	Scroll.prototype.scrollToTop = function(){
		//verScroll
		$((this.sagGridObj.gridEle).querySelectorAll("#verScroll")).scrollTop(0);
	}
	
	Scroll.prototype.scrollToIndex = function(rowIndex){
		//verScroll
		let scrollPos = rowIndex*this.sagGridObj.OneRowHeight;
		$((this.sagGridObj.gridEle).querySelectorAll("#verScroll")).scrollTop(scrollPos);
	}

 
	Scroll.prototype.eventOnScroll = function(ele){

		let thisObj = this;
	
		var st = $(ele).scrollTop();
		let rowCnt = Math.round(Math.abs((thisObj.lastScrollTop - st)/thisObj.sagGridObj.OneRowHeight));
		//console.log("st------------->"+st);
		//console.log("rowCnt------------->"+rowCnt)
		
		let rowStart = Math.round(st/thisObj.sagGridObj.OneRowHeight);
		
		if(rowCnt > 25){
			
			//handle row grouping node to prevent from delete
			if(this.sagGridObj.rowSpan){
				$((this.sagGridObj.gridEle).querySelectorAll(".sagRow")).not(".sagGroupRow").remove();
			}else{
				$((this.sagGridObj.gridEle).querySelectorAll(".sagRow")).remove();
			}
			
   
            thisObj.sagGridObj.gridRowIndexArray = [];
            
            let fromIndex = rowStart - 25;
            let toIndex = rowStart + 15 +25;
            
            if(fromIndex < 0 ){
            	fromIndex = 0;
            }
            
            if(toIndex > thisObj.rowLen){
            	toIndex = thisObj.rowLen;
            }
            
            thisObj.upIndex = fromIndex;
			thisObj.downIndex = toIndex;
			
			for(let i=fromIndex;i<toIndex;i++){
				thisObj.addRowByIndex(i);
			}
		}else{
		
		  if (st > thisObj.lastScrollTop){
			   // downscroll code
			    //console.log("downscroll code--->"+st);
				//delete upRow AND Add downRow
					for(let i=0;i<rowCnt;i++){
						thisObj.addDownRow();
						if(i!=rowCnt-1){
	                    thisObj.deleteUpRow();
						}
	                }
		   } else {
			  // upscroll code
			 // console.log("upscroll code--->"+st);
			  //Add upRow AND Delete downRow
				   for(let i=0;i<rowCnt;i++){
						 thisObj.addUpRow();
							if(i!=rowCnt-1){
						 thisObj.deleteDownRow();
							}
					}
		   }
		}  
		
		if($(ele).scrollTop() == 0){
			
			//alert("top");
			let limit = thisObj.sagGridObj.totalRowShow;
			
			thisObj.upIndex  = 0;
			thisObj.downIndex  = limit;
			
			let indexArray = thisObj.sagGridObj.gridRowIndexArray;
			for(let i=0;i<indexArray.length;i++){
				let index = indexArray[i];
				if(index > limit){
					thisObj.deleteRowByIndex(index);
				}	
			}
		}else if($(ele).scrollTop() + $(ele).innerHeight() >= $(ele)[0].scrollHeight) {
			
             // alert('end reached');

			let limit = thisObj.rowLen - thisObj.sagGridObj.totalRowShow;
			
			thisObj.upIndex  = limit;
			thisObj.downIndex  = thisObj.rowLen;
			
			let indexArray = thisObj.sagGridObj.gridRowIndexArray;
			for(let i=0;i<indexArray.length;i++){
				let index = indexArray[i];
				if(index < limit){
					thisObj.deleteRowByIndex(index);
				}	
			}
         }
		
		if(rowCnt != 0){
		   thisObj.lastScrollTop = st;
		}
     }


        
   Scroll.prototype.addRow = function(){
    
	   this.addRowByIndex(this.downIndex);
	   this.downIndex++;
   }
   
   Scroll.prototype.addRowByIndex = function(index,addFlag){
	   
				let self = this;
				this.gridRowObj = this.sagGridObj.gridRowObj;
			   if( index >= 0  && index < this.rowLen && !(this.sagGridObj.gridRowIndexArray.includes(index))){
		
				   //handle row grouping node to prevent from remove groped node from add because its note deleted
					if(self.sagGridObj.rowSpan && self.sagGridObj.rowObjSpanIndexWidth.hasOwnProperty(index)){
						
						//in future handle what we do for this condition 
						if(!self.sagGridObj.inDomRowSpanIndex.includes(String(index))){
							let gridRowHtmlTest = self.gridRowObj.getRowHtml(index);
							self.sagGridObj.addGridRowDom(gridRowHtmlTest);   
							self.sagGridObj.inDomRowSpanIndex.push(index);
						}
						
					}else{
					   let gridRowHtmlTest = self.gridRowObj.getRowHtml(index);
					   self.sagGridObj.addGridRowDom(gridRowHtmlTest);   
					}
					
					if(addFlag == undefined){
						//store row index 
					   self.sagGridObj.gridRowIndexArray.push(index); 
					}
			   }
   }
   
   Scroll.prototype.deleteRowByIndex = function(index){
	   if(this.sagGridObj.gridRowIndexArray.includes(index)){
		   
		   //handle row grouping node to prevent from remove groped node from add because its note deleted
			if(this.sagGridObj.rowSpan && this.sagGridObj.rowObjSpanIndexWidth.hasOwnProperty(index)){
				//in future handle what we do for this condition 
			
			}else{
			    let rowId = 'row_'+index; 
			    let rowVal = (this.sagGridObj.gridEle).querySelectorAll('#'+rowId);  //document.querySelectorAll('#'+this.sourceDivId+' .sag_grid_table_main .table_body #'+rowId);//(this.tableBody).querySelectorAll('#'+rowId);  //
			    $(rowVal).remove();
			}
			
	
				//remove row index from storage after delete row 
				let arr = this.sagGridObj.gridRowIndexArray; 
				let val = index;
				this.sagGridObj.gridRowIndexArray =  arr.filter(function(ele){
					   return ele != val;
				   });
			
        }
   }
   
   Scroll.prototype.addUpRow = function(){
	   if( this.upIndex > 0 ){
			this.upIndex--;
			cL("addUpRow---->"+this.upIndex);
			this.addRowByIndex(this.upIndex);	   
	   }
   }
   
   Scroll.prototype.addDownRow = function(){
	   if(this.downIndex < this.rowLen ){
		   cL("addDownRow---->"+this.downIndex);
		   this.addRowByIndex(this.downIndex);
		   this.downIndex++;
	   }
   }
   
   Scroll.prototype.deleteUpRow = function(){
	   if(this.sagGridObj.gridRowIndexArray.length > 74 ){
		   cL("deleteUpRow---->"+this.upIndex);
		   this.deleteRowByIndex(this.upIndex);
		   this.upIndex++;
	   }	   
   }
   
   Scroll.prototype.deleteDownRow = function(){
	   if(this.sagGridObj.gridRowIndexArray.length > 74 ){
		    cL("deleteDownRow---->"+this.downIndex);
		    this.deleteRowByIndex(this.downIndex);
			this.downIndex--;
	   }
    }
   
	