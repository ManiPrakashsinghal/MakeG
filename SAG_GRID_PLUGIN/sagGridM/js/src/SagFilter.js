function Filter(sagGridObj){
	
	 this.sagGridObj = sagGridObj;
	 this.lastSearchEle = null;
	 this.filterRecordStoreArray = [];
	 this.filterInputTextSearch = [];
	 this.filterInputTextValue = null;
	 this.filterInputTextStoreArray = [];
	 this.textValueStore = null;

	 this.checkedTextArray = [];
	 this.totalCheckBoxTextArray = null;
	 
	 
	
}


Filter.prototype.createFilterPopUp = function(ele){
	
	 let self = this;
	 let field = ele.getAttribute("field");
	 self.lastSearchEle = ele
	 this.filterInputTextValue = null;
	 $('#myInput').val(''); 
	 if(this.filterInputTextStoreArray.length){
		 
		  let valueObject =  _.findLast(this.filterInputTextStoreArray, function(n) {
		    	  return n.field  == field;
		    	}); 
		  if(valueObject != undefined ){
			 let inputTextValue = valueObject['textValue'];
			 if(new String(inputTextValue).valueOf() == new String(this.textValueStore).valueOf()){
				 $('#myInput').val(inputTextValue); 
			 }else{
				 $('#myInput').val(this.textValueStore);
				let lastIndex = _.findLastIndex(this.filterInputTextStoreArray, { 'textValue': inputTextValue });
				this.filterInputTextStoreArray.splice(lastIndex, 1); 
				 
			 }
			
		  }
	 }
	 let rowDataList = this.sagGridObj.rowData; 
	// let rowDataUniqueList = self.unique(rowDataList, field);
	 let childElement = self.createInnerPopUpRecord(rowDataList,field);
	    self.ParentNodeAppendChildNode(ele,childElement);
	    self.InnerPopUpCheckBox_ClickEvent();

}


Filter.prototype.ParentNodeAppendChildNode = function(ele,childNodes){
	
	 let self = this;
	 $('#tabLList').empty();
	 let parentDivElement = (this.sagGridObj.gridEle).querySelector('.tabLList');
	 parentDivElement.appendChild(childNodes);
	 let checkboxNodeList   =  (this.sagGridObj.gridEle).querySelectorAll('.filterRow input[type="checkbox"]');
	    for (let i = 0, len = checkboxNodeList.length; i < len; i++) {
	        let ele = checkboxNodeList[i];
	        $(ele).removeClass("filterRow");
	         ele.addEventListener("click", function(){        	
	        	 self.InnerPopUpCheckBox_ClickEvent(ele);
	        }, false);
	    }

}


Filter.prototype.createInnerPopUpRecord = function (dataArrayList,field) {
	 let self = this;
	 let checkedArray =null;
	 this.checkedTextArray = [];
	 let fieldValue = field;
	 let rowDataList = dataArrayList;//this.sagGridObj.rowData; 
	 let rowDataUniqueList = self.unique(rowDataList, field);
//	 var filtered = rowDataUniqueList.filter(function (el) {
//		  return el != null;
//		});
	 
	 var strArrCheckedList =  rowDataUniqueList.map(String);//filtered.map(function(e){return e.toString()});
	 
	
	 if(this.filterRecordStoreArray.length > 0){
		 let lastObject =_.last(this.filterRecordStoreArray);
			 fieldValue = lastObject['field'];
			 if(fieldValue == field){
			  this.totalCheckBoxTextArray = lastObject['totalInputsCheckBox'];
			  checkedArray = lastObject['checked'];
			 }else{
			   this.totalCheckBoxTextArray = rowDataList;//Array.from(rowDataList);
			   checkedArray = strArrCheckedList;
			 }
	 }else{
		 this.totalCheckBoxTextArray = rowDataList;//Array.from(rowDataList); 
		 checkedArray = strArrCheckedList;
		 
	 }
	 
	 let rowFilterDataList = self.unique(this.totalCheckBoxTextArray, field);
//	 var filtered = rowFilterDataList.filter(function (el) {
//		  return el != null;
//		});
	 
	 var strArrList =  rowFilterDataList.map(String);//filtered.map(function(e){return e.toString()});
	 
		let uniqueArray = strArrList.filter(function(item, pos, self) {
		    return self.indexOf(item) == pos;
		});
		
	 
	 let componentObj = null;
	 
	 let colDataArray = this.sagGridObj.colData;  
	 let colObj =  _.find(colDataArray, { 'field': field});
	 
	 let componentType = false;
	  if(colObj.hasOwnProperty("component")){
		  componentType = "component";
	  }else if(colObj.hasOwnProperty("cellRenderView")){
		  componentType = "cellRenderView";
	  }else{
		  componentType = false;
 
	  }
	 
	 if(componentType){
		 let conponentName = colObj[componentType];
		  componentObj = this.sagGridObj.components[conponentName];	 
     }
	
	 let innerDivElement = document.createDocumentFragment();
	 for (var i = 0, len = uniqueArray.length; i < len; i++) {
		 
		  let textShow = null;
	      let textValue = uniqueArray[i];
	     
	      let textText = textValue;
	      
		  if(componentObj){
		 		 textText = componentObj.getTextUsingVal(textValue);
		 		 if(componentObj.isFilterValueShow){
					  textShow = textText+"  [ "+textValue+" ]";  
				  }else{
					  textShow = textText;
				  }	 
		  }else{
			  textShow = textText;
		  }
		  
		 
		   	      
          let filterRow = document.createElement('div');  
 	      filterRow.className = 'filterRow';
 	      let checkBoxDiv = document.createElement('div');  
          checkBoxDiv.className = 'checkbox';
          let inputFilter = document.createElement('input');  
          inputFilter.className = 'filterRowInput filterRowInputClickEvent';
          inputFilter.type = 'checkbox';  
          inputFilter.value = textValue;
          inputFilter.name = "filterInput[]";
          if(checkedArray.includes(textValue)){
       	  inputFilter.checked = true;
       	  this.checkedTextArray.push(textValue);
          }else{
       	  inputFilter.checked = false;
          }       
          inputFilter.id = "filterInputId_"+i;     
          let checkLabel = document.createElement('div');  
          checkLabel.className = 'checkLabel'; 
          checkLabel.innerText = textShow;
          checkBoxDiv.appendChild(inputFilter);
 	      filterRow.appendChild(checkBoxDiv);
 	      filterRow.appendChild(checkLabel);      	     
 	      innerDivElement.appendChild(filterRow);
	 }
	 return innerDivElement;
	
}


Filter.prototype.OkButton_FilterClickEvent = function(ele){
	
	let self = this;
	let filterDataArray = [];
	
	let selectedEle = this.lastSearchEle;
	let field = selectedEle.getAttribute("field");

	 let rowDataUniqueList = self.unique(this.totalCheckBoxTextArray, field);
/*	 var filtered = rowDataUniqueList.filter(function (el) {
		  return el != null;
		});*/
	 var strArrOkList = rowDataUniqueList.map(String);//filtered.map(function(e){return e.toString()});
	
	let uniqueArray = strArrOkList.filter(function(item, pos, self) {
		    return self.indexOf(item) == pos;
		});
	 
	let checkedArray = [];
	for(let a = 0, n =  uniqueArray.length; a < n;  a++)
	{
		let allDataValue  =  uniqueArray[a];
		
	 if(this.checkedTextArray.includes(allDataValue)){
		checkedArray.push(allDataValue);
	  	let obj =  {};
    	obj[field] = allDataValue;
    	let arrayFilter = _.filter(this.totalCheckBoxTextArray,function(o){
    		if(String(obj[field]) == String(o[field])){
    			return true;
    		}
    	});
    
    	  filterDataArray.push.apply(filterDataArray, arrayFilter);
    	
	 }
	}

    
    if($((this.sagGridObj.gridEle).querySelectorAll('.filterRowInput:checked')).length == $((this.sagGridObj.gridEle).querySelectorAll('.filterRowInput')).length){
    
    	if(this.filterInputTextValue != null){
    		
    		this.textValueStore = this.filterInputTextValue;
    		
  	      $((this.sagGridObj.gridEle).querySelectorAll(".sagGridFilter")).removeClass("sml_activeFilter");
          if(selectedEle){
			   selectedEle.classList.add('sml_activeFilter');
	    	 }
    		 this.filterInputTextStoreArray.push({"field":field,"textValue":this.textValueStore });
    		
    	}
    	
    	if(this.filterRecordStoreArray.length > 0){
    	let lastObject =_.last(this.filterRecordStoreArray);
    	let fieldValue = lastObject['field'];
    	 if(fieldValue == field){
    		this.filterRecordStoreArray.pop();
    		if(this.filterRecordStoreArray.length > 0){
    	    	let lastObject =_.last(this.filterRecordStoreArray);
    	    	let fieldValue = lastObject['field'];
    	    	let lastSelectedElement = lastObject['selectedEle'];
    	    	  $((this.sagGridObj.gridEle).querySelectorAll(".sagGridFilter")).removeClass("sml_activeFilter");
    	    	  lastSelectedElement.classList.add('sml_activeFilter');
        	}else{
       		 $((this.sagGridObj.gridEle).querySelectorAll(".sagGridFilter")).removeClass("sml_activeFilter");
        	}
    	 }
    	}
    

    }else{
	      $((this.sagGridObj.gridEle).querySelectorAll(".sagGridFilter")).removeClass("sml_activeFilter");
          if(selectedEle){
			   selectedEle.classList.add('sml_activeFilter');
	    	 }
          if(this.filterRecordStoreArray.length == 0){
    	    this.filterRecordStoreArray.push({"field":field,"totalInputsCheckBox":this.totalCheckBoxTextArray,"checked":checkedArray,"selectedEle" :selectedEle,"filterDataArray" : filterDataArray}); 
          }else {
        	  let lastArrayObject = _.last(this.filterRecordStoreArray);
        	  let key = lastArrayObject['field'];
        	  if(key == field){
        		  let lastObjectTotalInputsCheckBox = lastArrayObject['totalInputsCheckBox'];
        		  this.filterRecordStoreArray.pop();
        		  this.filterRecordStoreArray.push({"field":field,"totalInputsCheckBox":lastObjectTotalInputsCheckBox,"checked":checkedArray,"selectedEle" :selectedEle,"filterDataArray" : filterDataArray});
        		  
                }else{
                	
                	  this.filterRecordStoreArray.push({"field":field,"totalInputsCheckBox":this.totalCheckBoxTextArray,"checked":checkedArray,"selectedEle" :selectedEle,"filterDataArray" : filterDataArray});
                }
        		  
        	  }
        	  
          }
    
	
	if(filterDataArray.length > 0){
		this.filter = false;
		self.InnerPopUpCheckBox_ClickEvent();
		this.sagGridObj.scrollObj.scrollToTop();
		let afterSortArr = _.sortBy(filterDataArray, [function(o) { return o.sag_G_Index; }]);
		this.sagGridObj.rowData = afterSortArr;
		
		this.sagGridObj.createGridBody();
		
	}

}
	

Filter.prototype.AllCheckBox_ClickEvent = function(ele){
	
	this.checkedTextArray = [];

	var checkboxes = (this.sagGridObj.gridEle).querySelectorAll('input.filterRowInput[type=checkbox]'); 

	     if (ele.checked) {
	         for (var i = 0; i < checkboxes.length; i++) {
	             if (checkboxes[i].type == 'checkbox') {
	                 checkboxes[i].checked = true;
	                 let val =  checkboxes[i].value;
	                 this.checkedTextArray.push(val);
	             }
	         }
	    
	     } else {
	         for (var i = 0; i < checkboxes.length; i++) {
	             console.log(i)
	             if (checkboxes[i].type == 'checkbox') {
	                 checkboxes[i].checked = false;
	             }
	         }
	     
	     }
	     
	     var empty = [].filter.call( checkboxes, function( el ) {
	        return !el.checked
	     });

	     if (checkboxes.length == empty.length) {
	    	 $((this.sagGridObj.gridEle).querySelector('#btnFilterOkButton')).attr('disabled', 'disabled');
	    	 $((this.sagGridObj.gridEle).querySelector('#allCheckboxBlue')).css('display','none');
	    	 $((this.sagGridObj.gridEle).querySelector('#checkAll')).css('display','block');
	         //return false;
	     }else{
	    	 $((this.sagGridObj.gridEle).querySelector('#btnFilterOkButton')).removeAttr('disabled');
	     }
	
}


Filter.prototype.AllCheckBoxRemoveColorBlue_ClickEvent = function(ele){

	         this.checkedTextArray = [];
	         $((this.sagGridObj.gridEle).querySelector('#allCheckboxBlue')).css('display','none');
	         $((this.sagGridObj.gridEle).querySelector('#checkAll')).css('display','block');
	         $((this.sagGridObj.gridEle).querySelector('.allCheckbox')).prop('checked',true);

	         
	     	var checkboxes = (this.sagGridObj.gridEle).querySelectorAll('input.filterRowInput[type=checkbox]'); 


		         for (var i = 0; i < checkboxes.length; i++) {
		             if (checkboxes[i].type == 'checkbox') {
		                 checkboxes[i].checked = true;
		                 let val =  checkboxes[i].value;
		                 this.checkedTextArray.push(val);
		             }
		         }

}


Filter.prototype.InnerPopUpCheckBox_ClickEvent = function(ele){

    if(ele != undefined){
    	
 	   let value = ele["value"];

 	   if(!this.checkedTextArray.includes(value)){
 	      this.checkedTextArray.push(value);
 	   }else{
 		  var index = this.checkedTextArray.indexOf(value);
 		  if(index!=-1){
 			  this.checkedTextArray.splice(index, 1);
 		  }
 	   }
 	   
 	  
     }

	
    if($((this.sagGridObj.gridEle).querySelectorAll('.filterRowInput:checked')).length == $((this.sagGridObj.gridEle).querySelectorAll('.filterRowInput')).length){
        
    	$((this.sagGridObj.gridEle).querySelector('.allCheckbox')).prop('checked',true);
        $((this.sagGridObj.gridEle).querySelector('#allCheckboxBlue')).css('display','none');
        $((this.sagGridObj.gridEle).querySelector('#checkAll')).css('display','block');

    	
    }else{
     	$((this.sagGridObj.gridEle).querySelector('.allCheckbox')).prop('checked',false);	
        $((this.sagGridObj.gridEle).querySelector('#allCheckboxBlue')).css('display','block');
        $((this.sagGridObj.gridEle).querySelector('#checkAll')).css('display','none');

    }
    
    
    var textinputs =  (this.sagGridObj.gridEle).querySelectorAll('input.filterRowInput[type=checkbox]'); 
    var empty = [].filter.call( textinputs, function( el ) {
       return !el.checked
    });

    if (textinputs.length == empty.length) {
    	 $((this.sagGridObj.gridEle).querySelector('#btnFilterOkButton')).attr('disabled', 'disabled');
    	 $((this.sagGridObj.gridEle).querySelector('#allCheckboxBlue')).css('display','none');
    	 $((this.sagGridObj.gridEle).querySelector('#checkAll')).css('display','block');
        
    }else{
    	$((this.sagGridObj.gridEle).querySelector('#btnFilterOkButton')).removeAttr('disabled');
    }
	

}


Filter.prototype.InputTextSearchPopUp_ClickEvent = function(ele){
	
	 let self = this;
	 let selectedEle = this.lastSearchEle;
	 let field = selectedEle.getAttribute("field");
	 let nodeList =  this.sagGridObj.originalRowData;  //originalRowData;  //rowData
	 let inputVal = (this.sagGridObj.gridEle).querySelector('#myInput').value;
	 if(inputVal != ''){
	    this.filterInputTextValue = inputVal;
	 }
	 let allList  = self.unique(nodeList, field);
	 let val = inputVal;
	 let key = field;
	 let filteredAllList = nodeList;// Array.from(nodeList);
	 this.filterInputTextSearch = nodeList;//Array.from(nodeList);
	 
	 var e = document.getElementById("selectFilter");
	 var selectedValue = e.options[e.selectedIndex].value;
	  if(inputVal != '' && field != null){
	 switch(selectedValue){
		
		case "StartWith":
			
			 filteredAllList = self.startWithStr(inputVal,field);
			
			break;
		case "EndWith":

			 filteredAllList = self.endWithStr(inputVal,field);

			break;
		case "Contains":

			 filteredAllList = self.containStr(inputVal,field);
			
			break;
		case "Equals":

			 filteredAllList = self.equalStr(inputVal,field);
			
			break;
		case "NotEquals":

			 filteredAllList = self.notEqualStr(inputVal,field);
			
			break;
		}
	  }else{
		  
		  filteredAllList =  this.sagGridObj.originalRowData; //Array.from(this.sagGridObj.originalRowData);
	  }
	  
	  
	  let childElement = self.createInnerPopUpRecord(filteredAllList,field); 
	                     self.ParentNodeAppendChildNode(ele,childElement);
	                     self.InnerPopUpCheckBox_ClickEvent();

	  
}


Filter.prototype.startWithStr = function(searchVal,fieldName){
	
	
	let dataArray = this.filterInputTextSearch;  
	let val = searchVal;
	let key = fieldName;

	let filtered = dataArray.filter(function(item) {
		return (String(item[key]).toLowerCase()).startsWith(val.toLowerCase());
      }); 
	
	return filtered;

}

Filter.prototype.endWithStr = function(searchVal,fieldName){
	
	let dataArray = this.filterInputTextSearch;  
	let val = searchVal;
	let key = fieldName;

	let filtered = dataArray.filter(function(item) {
		return (String(item[key]).toLowerCase()).endsWith(val.toLowerCase());
      }); 
	
	return filtered;
	
}

Filter.prototype.containStr = function(searchVal,fieldName){
	
	let dataArray = this.filterInputTextSearch;  
	let val = searchVal;
	let key = fieldName;

	let filtered = dataArray.filter(function(item) {
		return ((String(item[key]).toLowerCase()).indexOf(val.toLowerCase()) > -1);
      }); 
	return filtered;
	
}

Filter.prototype.equalStr = function(searchVal,fieldName){
	
	let dataArray = this.filterInputTextSearch;  
	let val = searchVal;
	let key = fieldName;
	
	let filtered = dataArray.filter(function(item) {
		return ((String(item[key]).toLowerCase()) == (val.toLowerCase()) );
      }); 
	return filtered;
	
}

Filter.prototype.notEqualStr = function(searchVal,fieldName){
	
	let dataArray = this.filterInputTextSearch;  
	let val = searchVal;
	let key = fieldName;

	let filtered = dataArray.filter(function(item) {
		return ((String(item[key]).toLowerCase()) != (val.toLowerCase()));
      }); 
	return filtered;
	
}

Filter.prototype.unique = function (arr, prop) {
    return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
        return i === a.indexOf(e);
    });
}