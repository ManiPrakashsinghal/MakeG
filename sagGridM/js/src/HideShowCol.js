function HideShowCol(sagGridObj){
    this.sagGridObj = sagGridObj;
}



HideShowCol.prototype.hideShowFn = function(checkbox,colmnData){

	
	let colClass = checkbox.getAttribute("colclass");
	let colPos = checkbox.getAttribute("colPos");
	   if (checkbox.checked) {
		   // for showColumn
           this.ShowColumn(colClass,colPos);
       }
       else {
    	   //for hide column
           //alert ("The check box is not checked.");
    	   this.hideColumn(colClass,colPos);
       }   
}


HideShowCol.prototype.hideColumn = function(colClass,colPos){
	
	
			let self = this;
			let hideColId = colClass;
			let hideColPos = colPos;
			
		    var startIndex = self.sagGridObj.colIdArray[hideColPos].indexOf(hideColId);
		    startIndex = startIndex+1;
		    let endIndex = self.sagGridObj.colIdArray[hideColPos].length;
		    
		    let hideColmn = $((self.sagGridObj.gridEle).querySelectorAll("."+hideColId));
		    $(hideColmn).hide();
		    
		    let hideColWidth = $("."+hideColId).outerWidth();
		    
		    
		   for(let i=startIndex;i<endIndex;i++){
			   
			   let cls = self.sagGridObj.colIdArray[hideColPos][i];
			   let ele = (self.sagGridObj.gridEle).querySelectorAll("div."+cls);
			   let eleLeft =$(ele)[0].offsetLeft
			   $(ele).css("left",eleLeft-hideColWidth);
		   }
		    
		      if(colPos == 'center'){
		    	  self.sagGridObj.centerTableWidth = self.sagGridObj.centerTableWidth - hideColWidth;
		    	  $((self.sagGridObj.gridEle).querySelectorAll("[parent=center]")).width(self.sagGridObj.centerTableWidth);
	 		  }else if(colPos == 'left') {
	 			 self.sagGridObj.leftTableWidth = self.sagGridObj.leftTableWidth - hideColWidth;
	 			  $((self.sagGridObj.gridEle).querySelectorAll("[parent=left]")).width(self.sagGridObj.leftTableWidth);
	 		  }else if(colPos == 'right'){
	 			 self.sagGridObj.rightTableWidth = self.sagGridObj.rightTableWidth - hideColWidth;
	 			 $((self.sagGridObj.gridEle).querySelectorAll("[parent=right]")).width(self.sagGridObj.rightTableWidth);
	 		  }else{
	 			 console.error("Error in find parent div for calculate width. resize.js");
	 		  }
}

HideShowCol.prototype.ShowColumn = function(colClass,colPos){
	
	let self = this;
	let hideColId = colClass;
	let hideColPos = colPos;
	
    var startIndex = self.sagGridObj.colIdArray[hideColPos].indexOf(hideColId);
    startIndex = startIndex+1;
    let endIndex = self.sagGridObj.colIdArray[hideColPos].length;
    
    let hideColmn = $((self.sagGridObj.gridEle).querySelectorAll("."+hideColId));
    let hideColWidth = $("."+hideColId).outerWidth();
    
    if(colPos == 'center'){
  	  self.sagGridObj.centerTableWidth = self.sagGridObj.centerTableWidth + hideColWidth;
  	  $((self.sagGridObj.gridEle).querySelectorAll("[parent=center]")).width(self.sagGridObj.centerTableWidth);
	  }else if(colPos == 'left') {
		 self.sagGridObj.leftTableWidth = self.sagGridObj.leftTableWidth + hideColWidth;
		  $((self.sagGridObj.gridEle).querySelectorAll("[parent=left]")).width(self.sagGridObj.leftTableWidth);
	  }else if(colPos == 'right'){
		 self.sagGridObj.rightTableWidth = self.sagGridObj.rightTableWidth + hideColWidth;
		 $((self.sagGridObj.gridEle).querySelectorAll("[parent=right]")).width(self.sagGridObj.rightTableWidth);
	  }else{
		 console.error("Error in find parent div for calculate width. resize.js");
	  }
    
    $(hideColmn).show();
    
    
	   for(let i=startIndex;i<endIndex;i++){
		   
		   let cls = self.sagGridObj.colIdArray[hideColPos][i];
		   let ele = (self.sagGridObj.gridEle).querySelectorAll("div."+cls);
		   let eleLeft =$(ele)[0].offsetLeft
		   $(ele).css("left",eleLeft+hideColWidth);
	   }
	
}