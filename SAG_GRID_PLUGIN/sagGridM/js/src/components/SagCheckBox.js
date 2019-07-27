// function to act as a class
function SagCheckBox(optn,callBack) {
	
	this.optionArray = optn;
	this.callBackFn = callBack;
	this.isFilterValueShow = true;
}

// gets called once before the renderer is used
SagCheckBox.prototype.init = function(params) {
	let self = this;
	 this.params = params; 
	 this.eGui = document.createElement('span');
	  
	 this.input = document.createElement('input');
	 this.input.type = 'checkbox';
	 this.input.setAttribute("rowIndex", this.params.rowIndex );
	 this.input.setAttribute("colKey", this.params.colKey );
	 this.input.setAttribute("colVal", this.params.value );
	 
	 
	 if( params.value == true ||  params.value == 1){
	      this.input.checked = true;
	 }else{
		 this.input.checked = false;
	 }
	 
	 this.input.onclick  = function(){
		 
		 let val = 0; 
		 if(this.checked){
			val = 1;
		}
		 
		 let rowIndex = parseInt(this.getAttribute("rowindex"));
		 let colKey = this.getAttribute("colkey");
		 self.applyChange(rowIndex,colKey,val);
		 
		 console.log(self.params.sagGridObj);
		 let headerComp = (self.params.sagGridObj.gridEle).querySelector('[compcolkey="'+colKey+'"]');
		 if(headerComp){
		
			 let checkedArr  =  _.filter(self.params.sagGridObj.rowData,function(o){
		    		if(o[colKey] == val){
		    			return true;
		    		}
		    	});
	
			 if(checkedArr.length == self.params.sagGridObj.rowData.length){
				 //get header component
				 	if(val == 1){
					 headerComp.checked = true;
				 	}else{
				 		headerComp.checked = false;
				 	}
			 }else{
				 headerComp.checked = false;
			 }
		 }
		 
		 
		 
	 };

	 this.eGui.appendChild(this.input);

};

// returns the new value for show 
SagCheckBox.prototype.getValue = function() {
    return this.input.value;
};


//returns the new value for show 
SagCheckBox.prototype.getText = function() {
    if(this.input.checked){
    	return true;
    }else{
    	return false;
    }
};

SagCheckBox.prototype.getTextUsingVal =function(val) {
	if(val == 1 || val == true){
    	return true;
    }else{
    	return false;
    }
	
};

SagCheckBox.prototype.onChangeValue = function(callBack){
	this.applyChange = callBack;
}


//returns the new value for show 
SagCheckBox.prototype.getTextView = function() {
    return this.input.value;
};


//gets called once when grid ready to insert the element
SagCheckBox.prototype.getGui = function() {
   // return this.selectList;
	return this.eGui ;
};

SagCheckBox.prototype.afterGuiAttached = function() {
   // this.callBackFn(this.input,this.params);
	
};


