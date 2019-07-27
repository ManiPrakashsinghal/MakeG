// function to act as a class
function SagSelectBox(optn,callBack) {
	
	this.optionArray = optn;
	this.callBackFn = callBack;
	
}

// gets called once before the renderer is used
SagSelectBox.prototype.init = function(params) {
    // create the cell
	
	let array = this.optionArray;
	this.params = params;
	
	let self = this;
	
	this.selectList = document.createElement("select");

	for (var i = 0; i < array.length; i++) {
	    var option = document.createElement("option");
	    option.value = array[i].key;
	    option.text = array[i].val;
	    this.selectList.appendChild(option);
	}
	
	this.selectList.value = params.value;
	
	this.preventDefaultEvent();

};

// gets called once when grid ready to insert the element
SagSelectBox.prototype.getGui = function() {
	
	if(this.selectList.value == "Filed"){
		 var x = document.createElement("SPAN");
		  var t = document.createTextNode(this.selectList.value);
		  return t;
	}
	
    return this.selectList;
};

// focus and select can be done after the gui is attached
SagSelectBox.prototype.afterGuiAttached = function() {
    this.selectList.focus();
	//this.selectList.click()
    this.callBackFn(this.selectList,this.params);
	
};

// returns the new value after editing
SagSelectBox.prototype.getValue = function() {
    return this.selectList.value;
};

//returns the new value after editing
SagSelectBox.prototype.getText = function() {
	let sel = this.selectList;
	let opt = sel.options[sel.selectedIndex < 0 ? 1:sel.selectedIndex];
    return opt.text;
};

SagSelectBox.prototype.getTextUsingVal =function(val) {
	//let found = this.optionArray.find(element => element.key == val);
	let found = _.find(this.optionArray, function(obj) { return obj.key == val })
	if(found){
		return found.val;
	}else{
		return "";
	}
};

//returns the new value after editing
SagSelectBox.prototype.getTextView = function() {
	let sel = this.selectList;
	let opt = sel.options[sel.selectedIndex < 0 ? 1:sel.selectedIndex];
    return opt.text+'<span class="pull-right"> <i class="fa fa-caret-down" aria-hidden="true"></i></span> ';
};


//any cleanup we need to be done here
SagSelectBox.prototype.destroy = function() {
    // but this example is simple, no cleanup, we could
// even leave this method out as it's optional
};

// if true, then this editor will appear in a pop up
SagSelectBox.prototype.isPopup = function() {
    // and we could leave this method out also, false is the default
    return false;
};

//create for change value in cellRenderView when component value chnage 
SagSelectBox.prototype.onChangeValue = function(callBack){

}

//all events 
SagSelectBox.prototype.preventDefaultEvent = function() {
  
	let self = this;

	 $(this.selectList).click(function(e){ 
			e.stopPropagation();
			//e.preventDefault();
		});
	    
    this.selectList.addEventListener("keyup", function(event) {
		  // Number 13 is the "Enter" key on the keyboard
		  if (event.keyCode === 13) {
		    event.preventDefault();
		  }
		});
};


