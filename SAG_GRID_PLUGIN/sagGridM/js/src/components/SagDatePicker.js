// function to act as a class
function SagDatePicker(optn,callBack) {
	
	this.optionArray = optn;
	this.callBackFn = callBack;
}

// gets called once before the renderer is used
SagDatePicker.prototype.init = function(params) {
    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;

};

// gets called once when grid ready to insert the element
SagDatePicker.prototype.getGui = function() {
    return this.eInput;
};

// focus and select can be done after the gui is attached
SagDatePicker.prototype.afterGuiAttached = function() {
    //this.eInput.focus();
	    let self = this;
		var date = new Date();
		var currentYear = date.getFullYear();
		var currentMonth = date.getMonth() + 1;
		var currentDate = date.getDate();
		var defaultCurrentDate = currentDate + '/' + currentMonth + '/'
				+ currentYear;
		var maxYear = date.getFullYear() + 1;
		var startYear = date.getFullYear() - 137;
		var yearRange = startYear + ":" + maxYear;
		var startDate = currentDate + '/' + currentMonth + '/' + startYear;
		var birthYear = date.getFullYear() - 18;

		var json = {
			dateFormat : "dd/mm/yy",
			changeYear : true,
			changeMonth : true,
			minDate : "01/07/2017",
			maxDate : defaultCurrentDate,
			yearRange : yearRange
		}
		console.log("json -- " + json);
		
		var setDate = function(dateInString){
			self.eInput.value = dateInString;
		}
		
		$(self.eInput).datepicker({
			dateFormat : json.dateFormat,
			changeYear : json.changeYear,
			changeMonth : json.changeMonth,
			minDate : json.minDate,
			maxDate : json.maxDate,
			yearRange : json.yearRange,
			onSelect : function(date) {
				setDate(date);
				self.destroy();
			},
			onClose :function(date){
				self.destroy();
			}
		});
		//$("#datepickerPopup").show();
		$(self.eInput).datepicker('show');
};

// returns the new value after editing
SagDatePicker.prototype.getValue = function() {
    return this.eInput.value;
};

//returns the new value after editing
SagDatePicker.prototype.getText = function() {
    return this.eInput.value;
};

SagDatePicker.prototype.getTextUsingVal =function(val) {
	return val;
};

//returns the new value after editing
SagDatePicker.prototype.getTextView = function() {
    return this.eInput.value;
};


//any cleanup we need to be done here
SagDatePicker.prototype.destroy = function() {
    // but this example is simple, no cleanup, we could
// even leave this method out as it's optional
	$(self.eInput).datepicker("destroy");
	let event = new Event('change');
	this.eInput.dispatchEvent(event);
};

// if true, then this editor will appear in a popup
SagDatePicker.prototype.isPopup = function() {
    // and we could leave this method out also, false is the default
		return true;
};

SagDatePicker.prototype.onChangeValue = function(callBack){

}

//all events 
SagDatePicker.prototype.preventDefaultEvent = function() {
  
	   
    $(this.eInput).click(function(event){ 
		e.stopPropagation();
	});
    
    this.eInput.addEventListener("keyup", function(event) {
		  // Number 13 is the "Enter" key on the keyboard
		  if (event.keyCode === 13) {
		    event.preventDefault();
		  }
		});
};