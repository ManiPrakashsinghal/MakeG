// function to act as a class
function headerCheckBox(optn,callBack) {
	
	this.optionArray = optn;
	this.callBackFn = callBack;
	this.gridObj= null;
}

// gets called once before the renderer is used
headerCheckBox.prototype.init = function(params) {
	 let self = this;
	 this.eGui = document.createElement('span');
	  
	 this.input = document.createElement('input');
	 this.input.type = 'checkbox';
	 this.input.setAttribute("headerComponent", params.compName);
	 this.input.setAttribute("compColKey", params.compColKey);
	 this.input.classList.add("headerComponent"); 
	 
	 this.eGui.appendChild(this.input);

};

//gets called once when grid ready to insert the element
headerCheckBox.prototype.getGui = function() {
   // return this.selectList;
	return this.eGui ;
};


headerCheckBox.prototype.afterGuiAttached = function(ele,gridObj) {
  
	let self = this;
	ele.checked = false;
	this.gridObj = gridObj;
	ele.onclick  = function(){
		 let val = 0; 
		 if(this.checked){
			val = 1;
		 }	 
		 let obj = {"value":val};
		 let colKey = this.getAttribute("compColKey");

		 self.gridObj.rowData = self.gridObj.rowData.map(function(obj){
			 obj[colKey] = val; 
			 return obj;
		 });
		 
		 self.gridObj.sagGridEvent.refreshCol(colKey);
		// console.log(self.gridObj);
	 };
	
};
