// function to act as a class
function SagCheckBox(optn,callBack) {
	
	this.optionArray = optn;
	this.callBackFn = callBack;
}

// gets called once before the renderer is used
SagCheckBox.prototype.init = function(params) {
	 this.params = params; 
	 this.eGui = document.createElement('span');
	  
	 this.input = document.createElement('input');
	 this.input.type = 'checkbox';
	 
	 
	 if( params.value == true ||  params.value == 1){
	      this.input.checked = true;
	 }else{
		 this.input.checked = false;
	 }
	 
	 
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


