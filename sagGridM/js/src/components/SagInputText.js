// function to act as a class
function SagInputText(optn,callBack) {
	
	this.optionArray = optn;
	this.callBackFn = callBack;
}

// gets called once before the renderer is used
SagInputText.prototype.init = function(params) {
    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
};

// gets called once when grid ready to insert the element
SagInputText.prototype.getGui = function() {
    return this.eInput;
};

// focus and select can be done after the gui is attached
SagInputText.prototype.afterGuiAttached = function() {
    this.eInput.focus();
};

// returns the new value after editing
SagInputText.prototype.getValue = function() {
    return this.eInput.value;
};

//returns the new value after editing
SagInputText.prototype.getText = function() {
    return this.eInput.value;
};

//returns the new value after editing
SagInputText.prototype.getTextView = function() {
    return this.eInput.value;
};

SagInputText.prototype.getTextUsingVal =function(val) {
	return val;
};

// any cleanup we need to be done here
SagInputText.prototype.destroy = function() {
    // but this example is simple, no cleanup, we could
// even leave this method out as it's optional
};

// if true, then this editor will appear in a popup
SagInputText.prototype.isPopup = function() {
    // and we could leave this method out also, false is the default
    return false;
};

//all events 
SagInputText.prototype.preventDefaultEvent = function() {
  
	   
    $(this.eInput).click(function(e){ 
		e.stopPropagation();
		console.log("input click");
	});
    
    this.eInput.addEventListener("keyup", function(event) {
		  // Number 13 is the "Enter" key on the keyboard
		  if (event.keyCode === 13) {
		    event.preventDefault();
		  }
		});
};