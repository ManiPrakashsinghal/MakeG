function SagGridEvent(sagGridObj){

    this.sagGridObj = sagGridObj;
    this.searchColObj = {};
    this.currentSortCol = null;
   
    this.filterObj  = new SagFilter(sagGridObj); 


}

SagGridEvent.prototype.addClickListner = function(){
	
		this.addCheckBoxClick();
	    this.addAllCheckBoxClick();	 
	    
	   // this.addSagSelectClick();
		this.addFilterClick();
	    this.recordFilterOK();
	    this.allCheckBoxCheck();
	    this.singleCheckBoxClick();
	    this.searchPopUpFilterClick();
	    this.addRowHoverEvent();
	       
	   // this.addCellKeyEvent();
	    this.addCellEditing();
	   
}

SagGridEvent.prototype.searchFilter = function(){

    //.header_cell input[type="text"]

    let self = this;
    let searchNodeList = (this.sagGridObj.gridEle).querySelectorAll('.header_cell input[type="text"]');

    for (var i = 0, len = searchNodeList.length; i < len; i++) {
        let ele = searchNodeList[i];
        let field = ele.getAttribute("field");
        ele.addEventListener("keyup", function(event){
            //enter button press
        	 self.searchColObj[field] = this.value;
        	 self.applySearch();
            /* if (event.keyCode === 13) {
                self.applySearch();
            }else{
                self.searchColObj[field] = this.value;
            }*/
        }, false);
    }
}

SagGridEvent.prototype.applySearch = function(){

    let self = this;
    
    let filterdSerchColObj = {};
    
    for (let tempKey in self.searchColObj) {
    	
    	let serchVal = (self.searchColObj[tempKey]).trim();
	    if(serchVal != "" && serchVal != null && serchVal != undefined ){
	    		filterdSerchColObj[tempKey] = serchVal;
			}
    }
    
    self.sagGridObj.rowData= self.sagGridObj.originalRowData.filter(function(item) {
	  for (var key in filterdSerchColObj) {
		  try{
			   if((((item[key]).toLowerCase()).indexOf((filterdSerchColObj[key]).toLowerCase())) < 0 ){
				   return false;
			   }
		  }catch(err){
			   return false;
		  }	
	  }
	  return true;
    }); 

    self.sagGridObj.createGridBody();
}


SagGridEvent.prototype.addSortListner = function(){

	let self = this;
    let sortNodeList = (this.sagGridObj.gridEle).querySelectorAll('.header_cell img[type="sortIcon"]');
    for (var i = 0, len = sortNodeList.length; i < len; i++) {
        let ele = sortNodeList[i];
        let field = ele.getAttribute("field");
        let sortType = 'text';
        
        if(ele.hasAttribute("columnType")){
        	sortType =  ele.getAttribute("columnType");
        }
        
    	if(sortType == 'date'){
    		 ele.addEventListener("click", function(){  
 	        	self.applySortOnDate(field);
 	        }, false);
    	}else{
    		 ele.addEventListener("click", function(){  
    	        	self.applySort(field);
    	        }, false);
    	}
  
    }
}



SagGridEvent.prototype.applySort = function(columnName){
	
	let self = this;
	if(self.currentSortCol != columnName){
	self.sagGridObj.rowData = _.sortBy(self.sagGridObj.rowData,columnName);
	}else{
		self.sagGridObj.rowData = (self.sagGridObj.rowData).reverse();
	}
	 self.sagGridObj.createGridBody();
	 self.currentSortCol = columnName;
}

SagGridEvent.prototype.applySortOnDate = function(columnName){
	
	let self = this;
	if(self.currentSortCol != columnName){
		self.sagGridObj.rowData = self.sagGridObj.rowData.sort(function(a, b) {
			
			let date1 = self.getDateObjFrStr(a[columnName]);
			let date2 = self.getDateObjFrStr(b[columnName]);	
		
	        	  if(date1 == "") return 1;
	        	  if(date2 == "") return  -1;
	        	  if (date1 > date2) return 1;
	        	  if (date1 < date2) return -1;
	        	  return 0;
		    });
	}else{
		self.sagGridObj.rowData = (self.sagGridObj.rowData).reverse();
	}
	
	 self.sagGridObj.createGridBody();
	 self.currentSortCol = columnName;
}


SagGridEvent.prototype.getDateObjFrStr = function(dateInString){
	
	//check string is html element or not. ex-  input type
	let eleForCheckDom = "";
	let isDomObject = (function(getString){
		 eleForCheckDom = document.createElement('div');
		 eleForCheckDom.innerHTML = getString;
		if(eleForCheckDom.firstElementChild){
			if(eleForCheckDom.firstElementChild.nodeType == 1)
				return true;
		}
		return false;
	})(dateInString);
	if(isDomObject){
		dateInString = eleForCheckDom.firstElementChild.value;
	}
	
	let dateType = 1;
	if(dateInString != null || dateInString != undefined){
		dateInString = dateInString.trim();
	}
	 if(dateInString == null || dateInString == "" || dateInString == undefined){
			return "";
		}else{		
			
			// str1 format should be dd/mm/yyyy. OR dd-mm-yyyy Separator can be anything e.g. / or -. It wont effect
			if(dateType == 1){
				var dt   = parseInt(dateInString.substring(0,2));
				var mon  = parseInt(dateInString.substring(3,5));
				var yr   = parseInt(dateInString.substring(6,10));	
			}
			//str1 format should be  yyyy/mm/dd. OR yyyy-mm-dd Separator can be anything e.g. / or -. It wont effect
			else if(dateType == 2){
				var yr   = parseInt(dateInString.substring(0,4));					
				var mon  = parseInt(dateInString.substring(5,7));
				var dt   = parseInt(dateInString.substring(8,10));
			}
			var dateObj = new Date(yr, mon-1, dt); 
			//check date is valid or not 
			if(dateObj.getTime() === dateObj.getTime()){
				return dateObj;
			}else{
				return "";
			}
		}
}







SagGridEvent.prototype.addRowHoverEvent = function(){

	let self = this;
    let rowNodeList = (this.sagGridObj.gridEle).querySelectorAll('div.mouseOverOut');
    for (var i = 0, len = rowNodeList.length; i < len; i++) {
        let ele = rowNodeList[i];
        $(ele).removeClass("mouseOverOut");
        ele.addEventListener("mouseover", function(e){        	
        	self.sagGridObj.generalEvntObj.onRowHover(ele);
        }, false);
        
        ele.addEventListener("click", function(e){        	
        	self.sagGridObj.generalEvntObj.onRowClick(ele);
        	//let cName = ele.getAttribute("component");
        	//alert(cName);
        }, false);
        
        ele.addEventListener("dblclick", function(e){        	
        	self.sagGridObj.generalEvntObj.onRowDblclick(ele);
        }, false);
        
        ele.addEventListener("mouseout", function(e){        	
        	self.sagGridObj.generalEvntObj.outRowHover(ele);
        }, false);
        
      
    }
}


SagGridEvent.prototype.addCheckBoxClick = function(){
	let self = this;
    let nodeList = (this.sagGridObj.gridEle).querySelectorAll('span.sag-checkBox');
    for (var i = 0, len = nodeList.length; i < len; i++) {
        let ele = nodeList[i];
        $(ele).removeClass("sag-checkBox");
        ele.addEventListener("click", function(e){ 
        	self.onCheckBoxClick(this);
        }, false);
    }
   
}


SagGridEvent.prototype.addAllCheckBoxClick = function(){
	let self = this;
    let nodeList = (this.sagGridObj.gridEle).querySelectorAll('span.sag-AllCheckBox');
    for (var i = 0, len = nodeList.length; i < len; i++) {
        let ele = nodeList[i];
        $(ele).removeClass("sag-AllCheckBox");
        ele.addEventListener("click", function(e){ 
        	self.onAllCheckBoxClick(this);
        }, false);
    }
}

SagGridEvent.prototype.onCheckBoxClick = function(ele){
	
	let self = this;
	let sag_g_index = parseInt(ele.parentElement.getAttribute("sag_g_index"));
	
	if(ele.classList.contains(Property.fontAwsmClass.checked)){
		$(ele).removeClass(Property.fontAwsmClass.checked);
	    $(ele).addClass(Property.fontAwsmClass.unChecked);
	    var index = self.sagGridObj.checkedRowIdArray.indexOf(sag_g_index);
	    if (index > -1) {
	    	self.sagGridObj.checkedRowIdArray.splice(index, 1);
	     }
	    
	}else{
	
		$(ele).removeClass(Property.fontAwsmClass.unChecked);
	    $(ele).addClass(Property.fontAwsmClass.checked);
	    var index = self.sagGridObj.checkedRowIdArray.indexOf(sag_g_index);
	    if (index == -1) {
	    self.sagGridObj.checkedRowIdArray.push(sag_g_index);
	    }
	}
	
	 if(self.sagGridObj.checkedRowIdArray.length == self.sagGridObj.AllRowIndex.length){
	     $(".sag-AllCheckboxCls").removeClass(Property.fontAwsmClass.unChecked);
	     $(".sag-AllCheckboxCls").addClass(Property.fontAwsmClass.checked);
	 }else{
		 $(".sag-AllCheckboxCls").removeClass(Property.fontAwsmClass.checked);
	     $(".sag-AllCheckboxCls").addClass(Property.fontAwsmClass.unChecked);
	 }
	 
	 let data = {};
	 self.sagGridObj.generalEvntObj.onCheckBoxClick(data);
	 
	console.log(self.sagGridObj.checkedRowIdArray);
	
}

//onAllCheckBoxClick

SagGridEvent.prototype.onAllCheckBoxClick = function(ele){
	
	let self = this;
	
	if(ele.classList.contains(Property.fontAwsmClass.checked)){
		$(ele).removeClass(Property.fontAwsmClass.checked);
	    $(ele).addClass(Property.fontAwsmClass.unChecked);
	    
	    $(".sag-CheckboxCls").removeClass(Property.fontAwsmClass.checked);
	    $(".sag-CheckboxCls").addClass(Property.fontAwsmClass.unChecked);
	    
	    self.sagGridObj.checkedRowIdArray = [];
	    
	}else{
	
		$(ele).removeClass(Property.fontAwsmClass.unChecked);
	    $(ele).addClass(Property.fontAwsmClass.checked);
	    
	    $(".sag-CheckboxCls").removeClass(Property.fontAwsmClass.unChecked);
	    $(".sag-CheckboxCls").addClass(Property.fontAwsmClass.checked);
	    
	    let tempAllChecked= [];
	    self.sagGridObj.rowData.map(function(x,index) {
			 tempAllChecked.push(x["sag_G_Index"]);
		});      
	    
	    
	    self.sagGridObj.AllRowIndex=Array.from(tempAllChecked);
	    self.sagGridObj.checkedRowIdArray=Array.from(tempAllChecked);
	}
	
	
	 let data = {};
	 self.sagGridObj.generalEvntObj.onAllCheckBoxClick(data);
	
	console.log(self.sagGridObj.checkedRowIdArray);
	
}


/** not used now */
SagGridEvent.prototype.addSagSelectClick = function(){
	let self = this;
    let nodeList = (this.sagGridObj.gridEle).querySelectorAll('span.sag-selectBox');
    for (var i = 0, len = nodeList.length; i < len; i++) {
        let ele = nodeList[i];
        $(ele).removeClass("sag-selectBox");
        ele.addEventListener("click", function(e){ 
        	self.onClickSagComponent(this);
        }, false);
    }
}

SagGridEvent.prototype.onClickSagComponent = function(ele) {
	

	var x = ele.parentElement;
	let sag_g_key = x.getAttribute("sag_g_key");
	let obj = this.sagGridObj.columnElementObj[sag_g_key];
	var sel = document.createElement('select');
	let optionArr = obj.option;
	
	for(let i=0;i<optionArr.length;i++){
	var opt = document.createElement('option');
	  opt.value = optionArr[i].val;
	  opt.text = optionArr[i].text;
	  sel.appendChild(opt);
	}
	
	sel.value = obj.val;
	x.appendChild(sel);
	ele.style.display = "none";
	$(sel).focus();
	
	$(sel).focusout(function(e){ 
		e.stopPropagation();
		let val = sel.value;
		ele.innerHTML = val;
		sel.remove();
		ele.style.display = "block";
	});
	
	
}



//* filter popup working start*//

SagGridEvent.prototype.singleCheckBoxClick = function(){
	
	 let self = this;
	 let nodeList = (this.sagGridObj.gridEle).querySelectorAll('.filterRowInput');
	 for (var i = 0, len = nodeList.length; i < len; i++) {
	    let ele = nodeList[i];
	   $(ele).removeClass("filterRowInput");
	    ele.addEventListener("click", function(e){ 
	    	self.filterObj.onClickAllCheckBox(ele);
	    }, false);
	 }
	
}


SagGridEvent.prototype.searchPopUpFilterClick = function(el){

	let self = this;
	let searchNodeList = (this.sagGridObj.gridEle).querySelectorAll('.popup-filetr-search');

	for (var i = 0, len = searchNodeList.length; i < len; i++) {
	    let ele = searchNodeList[i];
	    $(ele).removeClass("popup-filetr-search");
	    ele.addEventListener("keyup", function(event){
	    	 $('.filterRow').remove();
	    	self.filterObj.onSearchPopUpFilterClick(ele);
	    });
	}
}


SagGridEvent.prototype.addFilterClick = function(){

	 let self = this;
	 
	 let nodeList = (this.sagGridObj.gridEle).querySelectorAll('span.filterDropdown');
	 for (var i = 0, len = nodeList.length; i < len; i++) {
	    let ele = nodeList[i];
	    $(ele).removeClass("filterDropdown");
	    ele.addEventListener("click", function(e){ 
	    	self.filterObj.onFilterClick(ele);
	    }, false);
	 }
}


SagGridEvent.prototype.recordFilterOK = function(el){

	 let self = this;
	 let nodeList = (this.sagGridObj.gridEle).querySelectorAll('button.btnFilter');
	 for (var i = 0, len = nodeList.length; i < len; i++) {
	    let ele = nodeList[i];
	    $(ele).removeClass("btnFilter");
	    ele.addEventListener("click", function(e){ 
	    	self.filterObj.onFilterOkButtonClick(ele);
	    }, false);
	 }
}


SagGridEvent.prototype.allCheckBoxCheck = function(ele){

	 let self = this;
	 var state = false; 
	 let nodeList = (this.sagGridObj.gridEle).querySelectorAll('input.allCheckbox');
	 for (var i = 0, len = nodeList.length; i < len; i++) {
	    let ele = nodeList[i];
	   $(ele).removeClass("allCheckbox");
	    ele.addEventListener("click", function(e){ 
	    	self.filterObj.onClickAllCheckBox(ele,state);
	    }, false);
	 }

	}
//* filter working end *//



/** cell Editing start **/

SagGridEvent.prototype.addCellEditing = function(){
	
	let self = this;
    let nodeList = (this.sagGridObj.gridEle).querySelectorAll('div[component].cellEventListnr');
    for (var i = 0, len = nodeList.length; i < len; i++) {
        let ele = nodeList[i];
        $(ele).removeClass("cellEventListnr");
        ele.addEventListener("click", function(e){ 

        	if(ele.hasAttribute("component")){
	        	let conponentName = ele.getAttribute("component");
	        	let field = ele.getAttribute("sag_g_key");
	        	let rowIndex = parseInt(ele.getAttribute("sag_g_index"));
	        	let obj = self.sagGridObj.originalRowData[rowIndex];
	        
					 let val = obj[field];
					 let compObj = self.sagGridObj.components[conponentName];
					 //let compObj = new component();
					 let params = {
							 "rowIndex":rowIndex,
							 "colKey":field,
							 "rowValue":obj,
							 "colValue":{},
							 "value":val,
					 };
					 compObj.init(params);
					 let eleComp = compObj.getGui();
					 ele.innerHTML = '';
					 ele.append(eleComp);
					 compObj.afterGuiAttached();
					
					 if(compObj.isPopup()){	
						 
						 
						 eleComp.addEventListener('change',function(){
							     let val = compObj.getValue();
							     let text = compObj.getTextView();
								self.sagGridObj.originalRowData[rowIndex][field] = val;
								ele.innerHTML = text;
							});
						 
						 
					 }else{		
						 $(eleComp).focusout(function(e){ 
								e.stopPropagation();
								let val = compObj.getValue();
								let text = compObj.getTextView();
								self.sagGridObj.originalRowData[rowIndex][field] = val;
								ele.innerHTML = text;
							}); 					 
					 }
 
        	}
        }, false);
    }
}

SagGridEvent.prototype.onCellClick = function(ele){
	console.log(ele);
	let type = ele.getAttribute("editable");
	let compObj = new Components();
	let editObj = compObj.getComponent(type);
	
	var param = {"value":ele.innerHTML};
	ele.innerHTML = '';
	
	editObj.init(param);
	let eleComp = editObj.getGui();
	ele.append(eleComp);
	editObj.afterGuiAttached();
	
	$(eleComp).click(function(e){ 
		e.stopPropagation();
		console.log("input click");
	});
	
	 eleComp.addEventListener("keyup", function(event) {
		  // Number 13 is the "Enter" key on the keyboard
		  if (event.keyCode === 13) {
		    event.preventDefault();
		  }
		});
	
	$(eleComp).focusout(function(e){ 
		e.stopPropagation();
		let val = editObj.getTextView();
		ele.innerHTML = val;
	});
	
	
}

/** cell Editing End **/



/** Export data work start **/

SagGridEvent.prototype.addExportClick = function(){
	
	let self = this;
    let nodeList = (this.sagGridObj.gridEle).querySelectorAll('.allPageExport');
    for (var i = 0, len = nodeList.length; i < len; i++) {
        let ele = nodeList[i];
        $(ele).removeClass("allPageExport");
        ele.addEventListener("click", function(e){       
        	self.sagGridObj.gridExportObj.onClickButton(ele);
        }, false);
    }
}


/** keyboard Key Event  **/

SagGridEvent.prototype.addCellKeyEvent = function(){
	
	document.onkeydown 				= this.onKeyDown;
	
/*	let self = this;
    let nodeList = (this.sagGridObj.gridEle).querySelectorAll('.cellEventListnr');
    for (var i = 0, len = nodeList.length; i < len; i++) {
        let ele = nodeList[i];
        $(ele).removeClass("cellEventListnr");
        ele.addEventListener("click", function(e){       
        	self.onCellSelect(ele);
        }, false);
    }*/
	
}

SagGridEvent.prototype.onCellSelect = function(ele){
	
}


SagGridEvent.prototype.onKeyDown  = function(e){
	
	let self = this;
	
	switch (e.keyCode) {
	
			case 38: // <Up>
					let pElement = document.querySelectorAll('div.sml_slectedRow [sag_g_key]');  //sag_g_index  //cellEventListnr 
					if(pElement.length > 0){
					let preIndex = parseInt(pElement[0].getAttribute("index"))-1;
					let pnEle = document.querySelectorAll('[index="'+preIndex+'"]');
					if(pnEle.length > 0){
					pnEle[0].click();
					pnEle[0].scrollIntoView(false);
					}
				}
					
				break;				
			case 40: // <Down>
				let nelement = document.querySelectorAll('div.sml_slectedRow [sag_g_key]');  //sag_g_index  //cellEventListnr 
				if(nelement.length > 0){
				let nextIndex = parseInt(nelement[0].getAttribute("index"))+1;
				let npEle = document.querySelectorAll('[index="'+nextIndex+'"]');
				if(npEle.length > 0 ){
				npEle[0].click();
				npEle[0].scrollIntoView(false);
				}
				}
				break;
		
	}
	
}


SagGridEvent.prototype.showFooterSum = function(){
	
	
	let self = this;
	
	//if(Object.keys(self.sagGridObj.totalFooterCol).length === 0){
	if(!self.sagGridObj.showTotal){
		(self.sagGridObj.gridEle).querySelector("#totalFooter").style.display = "none";
	}
	
	for (var key in self.sagGridObj.totalFooterCol) {
	
		  let sum = _.sumBy(self.sagGridObj.rowData, function(o) { 
				  let val = Number(o[key]);
				  if(val){
					  return val;
				  }else{
					  return 0;
				  }	
			});
		  
		  sum = sum.toFixed(2)
		  self.sagGridObj.totalFooterCol[key] =  sum;
		  let ele  = (self.sagGridObj.gridEle).querySelector('div[sag_g_key="'+key+'"].totalField');
		  ele.innerHTML = sum;	  		  
	}
	
}



        


/**
SagGridEvent.prototype.addCellClick = function(){
	let self = this;
    let nodeList = (this.sagGridObj.gridEle).querySelectorAll('div.grid_cell');
    for (var i = 0, len = nodeList.length; i < len; i++) {
        let ele = nodeList[i];
        let field = ele.innerHTML;  //getAttribute("field");
        ele.addEventListener("dblclick", function(e){ 
        	
        	e.preventDefault();
        	e.stopPropagation();
        	self.onCellClick(this);
        	
        }, false);
    }
}

SagGridEvent.prototype.onCellClick = function(ele){
	
	var text = document.createElement("input");
	text.setAttribute("type", "text");
	text.setAttribute("value",ele.innerHTML);
	ele.innerHTML = '';
	ele.append(text);
	
	$(text).dblclick(function(e){ 
		e.stopPropagation();
		console.log("input click");
	});
	$(text).focus();
	$(text).focusout(function(e){ 
		e.stopPropagation();
		let val = text.value;
		ele.appendChild(val);
	});
	
	console.log(ele);
}

**/






