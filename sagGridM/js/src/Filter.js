function SagFilter(sagGridObj){
	
	 this.sagGridObj = sagGridObj;
	 this.filterSearchData = [];
	 this.filterPopUpFiledVal = null;
	 let self = this;
	 this.filterSearchPopUp = [];
	 this.fieldValueStore = null;
	 this.fldValue = null;
	 
	 this.lastSearchEle = null;

}

SagFilter.prototype.onFilterClick = function(ele){
	
	 let self = this;
	 let field = ele.getAttribute("field");
	 
	 self.lastSearchEle = ele;
	 
	 this.fieldValueStore = field;
	 this.filterPopUpFiledVal = field;
	 let nodeListOriginalData = this.sagGridObj.originalRowData; 
	 let addInnerElement = self.createPopUpInnerRecord(ele,nodeListOriginalData,field);
	 $('#tabLList').empty();
	 $('#myInput').val('');
	 let parent = (this.sagGridObj.gridEle).querySelector('.tabLList');
	 parent.appendChild(addInnerElement);
	 let checkboxNodeList   =  (this.sagGridObj.gridEle).querySelectorAll('.filterRow input[type="checkbox"]');
	    for (let i = 0, len = checkboxNodeList.length; i < len; i++) {
	        let ele = checkboxNodeList[i];
	        $(ele).removeClass("filterRow");
	         ele.addEventListener("click", function(){        	
	        	self.onClickInputCheckBox(ele);
	        }, false);
	    }
	    
	   self.onClickInputCheckBox();
	 
}


SagFilter.prototype.createPopUpInnerRecord = function(ele,recordList,field){
	
	 let self = this;
	 let originalRowDataAllList = recordList;
	 let rowDataList = this.sagGridObj.rowData;  
	 let AllDataNodeList  =this.unique(originalRowDataAllList, field);
	 
	 let rowList = this.unique(rowDataList, field);
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
	
	 let filterListArray = document.createDocumentFragment();
	 for (var i = 0, len = AllDataNodeList.length; i < len; i++) {
		 
		      let textValue = AllDataNodeList[i];
		      let textText = textValue;
		 	  if(componentObj){
		 		 textText = componentObj.getTextUsingVal(textValue);
		 	  }
	          
	         if(this.fldValue == field){
	        	 let filterRow = document.createElement('div');  
		  	      filterRow.className = 'filterRow';
		  	      let checkBoxDiv = document.createElement('div');  
		          checkBoxDiv.className = 'checkbox';
		          let inputFilter = document.createElement('input');  
		          inputFilter.className = 'filterRowInput';
		          inputFilter.type = 'checkbox';  
		          inputFilter.value = textValue;
		          inputFilter.name = "filterInput[]";
		          if(rowList.includes(textValue)){
		        	  inputFilter.checked = true;
		          }else{
		        	  inputFilter.checked = false;
		          }
		          
		          inputFilter.id = "filterInputId_"+i;     
		          let checkLabel = document.createElement('div');  
		          checkLabel.className = 'checkLabel'; 
		          checkLabel.innerText = textText;
		          checkBoxDiv.appendChild(inputFilter);
		  	      filterRow.appendChild(checkBoxDiv);
		  	      filterRow.appendChild(checkLabel);      	     
		  	      filterListArray.appendChild(filterRow);
	         }
	         else if(rowList.includes(textValue)) { 
	          let filterRow = document.createElement('div');  
	  	      filterRow.className = 'filterRow';
	  	      let checkBoxDiv = document.createElement('div');  
	          checkBoxDiv.className = 'checkbox';
	          let inputFilter = document.createElement('input');  
	          inputFilter.className = 'filterRowInput';
	          inputFilter.type = 'checkbox';  
	          inputFilter.value = textValue;
	          inputFilter.name = "filterInput[]";
	          if(rowList.includes(textValue)){
	        	  inputFilter.checked = true;
	          }else{
	        	  inputFilter.checked = false;
	          }
	          
	          inputFilter.id = "filterInputId_"+i;     
	          let checkLabel = document.createElement('div');  
	          checkLabel.className = 'checkLabel'; 
	          checkLabel.innerText = textText;
	          checkBoxDiv.appendChild(inputFilter);
	  	      filterRow.appendChild(checkBoxDiv);
	  	      filterRow.appendChild(checkLabel);      	     
	  	      filterListArray.appendChild(filterRow);
	         }
	   }
	         return filterListArray;
	
}


SagFilter.prototype.onClickInputCheckBox = function(ele){
	
	
    if($((this.sagGridObj.gridEle).querySelectorAll('.filterRowInput:checked')).length == $((this.sagGridObj.gridEle).querySelectorAll('.filterRowInput')).length){
        
    	$((this.sagGridObj.gridEle).querySelector('.checked_all')).prop('checked',true);
    }else{
     	$((this.sagGridObj.gridEle).querySelector('.checked_all')).prop('checked',false);	
    }
}


SagFilter.prototype.onFilterOkButtonClick = function(ele){
	
	let all_location_id = (this.sagGridObj.gridEle).querySelectorAll('input[name="filterInput[]"]:checked');
	let filterDataArray = [];
	let fieldVal = this.fieldValueStore;
	if(this.fldValue == null){this.fldValue = this.fieldValueStore;}
	let dataArray = this.sagGridObj.originalRowData;

	for(let x = 0, l = all_location_id.length; x < l;  x++)
	{
		let chekValue = all_location_id[x].value;
	  	let obj =  {};
    	obj[fieldVal] = chekValue;
    	let arr = _.filter(dataArray,function(o){
    		if(obj[fieldVal] == String(o[fieldVal])){
    			return true;
    		}
    	});
    	filterDataArray.push.apply(filterDataArray, arr);
	}
	
	
	 let selectedEle = this.lastSearchEle;
	 $((this.sagGridObj.gridEle).querySelectorAll(".sagGridFilter")).removeClass("sml_activeFilter");
	 if(selectedEle){
		 selectedEle.classList.add('sml_activeFilter');
	 }

	
 
    this.sagGridObj.scrollObj.scrollToTop();
    this.sagGridObj.rowData = filterDataArray;
    this.sagGridObj.createGridBody();

}



SagFilter.prototype.searchTimeOut = function(fn, duration){
	
    var timer;
    return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, duration)
  }
}


SagFilter.prototype.onSearchPopUpFilterClick = function(ele){

 
 let self = this;
 let fieldName = this.filterPopUpFiledVal;
 let nodeList =  this.sagGridObj.originalRowData;  //originalRowData;  
 let inputVal = (this.sagGridObj.gridEle).querySelector('#myInput').value;
 let allList  = _.uniqBy(nodeList, fieldName);
 let val = inputVal;
 let key = fieldName;
 this.filterSearchPopUp = [];  
 this.filterSearchData = allList;
 let filteredAllList = allList;
 
 var e = document.getElementById("selectFilter");
 var selectedValue = e.options[e.selectedIndex].value;
  if(inputVal != '' && fieldName != null){
 switch(selectedValue){
	
	case "StartWith":
		
		 filteredAllList = self.startWithStr(inputVal,fieldName);
		
		break;
	case "EndWith":

		 filteredAllList = self.endWithStr(inputVal,fieldName);

		break;
	case "Contains":

		 filteredAllList = self.containStr(inputVal,fieldName);
		
		break;
	case "Equals":

		 filteredAllList = self.equalStr(inputVal,fieldName);
		
		break;
	case "NotEquals":

		 filteredAllList = self.notEqualStr(inputVal,fieldName);
		
		break;
	}
  }
  
  this.filterSearchPopUp = filteredAllList;

	 let addInnerElement = self.onSearchFilterRecord(ele,this.filterSearchPopUp,fieldName);
	 $('#tabLList').empty();
	 let parent = (this.sagGridObj.gridEle).querySelector('.tabLList');
	 parent.appendChild(addInnerElement);

	 let checkboxNodeList   =  (this.sagGridObj.gridEle).querySelectorAll('.filterRow input[type="checkbox"]');
	    for (let i = 0, len = checkboxNodeList.length; i < len; i++) {
	        let ele = checkboxNodeList[i];
	        $(ele).removeClass("filterRow");
	         ele.addEventListener("click", function(){        	
	        	self.onClickInputCheckBox(ele);
	        }, false);
	    }
	    
	   self.onClickInputCheckBox();
  
  
 if($((this.sagGridObj.gridEle).querySelectorAll('.filterRowInput:checked')).length == $((this.sagGridObj.gridEle).querySelectorAll('.filterRowInput')).length){
 
 	$((this.sagGridObj.gridEle).querySelector('.checked_all')).prop('checked',true);
 }else{
  	$((this.sagGridObj.gridEle).querySelector('.checked_all')).prop('checked',false);	
 }

}


SagFilter.prototype.onSearchFilterRecord = function(ele,AllDataNodeList,field){
	
	  let rowDataList = this.sagGridObj.rowData; 
	  let rowList = this.unique(rowDataList, field);
	
	 let filterListArray = document.createDocumentFragment();
	 for (var i = 0, len = AllDataNodeList.length; i < len; i++) {
	          let textValue = AllDataNodeList[i][field];  
	        if(this.fldValue == field){
	          let filterRow = document.createElement('div');  
	  	      filterRow.className = 'filterRow';
	  	      let checkBoxDiv = document.createElement('div');  
	          checkBoxDiv.className = 'checkbox';
	          let inputFilter = document.createElement('input');  
	          inputFilter.className = 'filterRowInput';
	          inputFilter.type = 'checkbox';  
	          inputFilter.value = textValue;
	          inputFilter.name = "filterInput[]";
	          if(rowList.includes(textValue)){
	        	  inputFilter.checked = true;
	          }else{
	        	  inputFilter.checked = false;
	          }
	          
	          inputFilter.id = "filterInputId_"+i;  
	         
	          
	          let checkLabel = document.createElement('div');  
	          checkLabel.className = 'checkLabel'; 
	          checkLabel.innerText = textValue;
	          checkBoxDiv.appendChild(inputFilter);
	  	      filterRow.appendChild(checkBoxDiv);
	  	      filterRow.appendChild(checkLabel);      	     
	  	      filterListArray.appendChild(filterRow);
	  	      
	   } else if(rowList.includes(textValue)){
		   
	          let filterRow = document.createElement('div');  
	  	      filterRow.className = 'filterRow';
	  	      let checkBoxDiv = document.createElement('div');  
	          checkBoxDiv.className = 'checkbox';
	          let inputFilter = document.createElement('input');  
	          inputFilter.className = 'filterRowInput';
	          inputFilter.type = 'checkbox';  
	          inputFilter.value = textValue;
	          inputFilter.name = "filterInput[]";
	          if(rowList.includes(textValue)){
	        	  inputFilter.checked = true;
	          }else{
	        	  inputFilter.checked = false;
	          }
	          
	          inputFilter.id = "filterInputId_"+i;  
	         
	          
	          let checkLabel = document.createElement('div');  
	          checkLabel.className = 'checkLabel'; 
	          checkLabel.innerText = textValue;
	          checkBoxDiv.appendChild(inputFilter);
	  	      filterRow.appendChild(checkBoxDiv);
	  	      filterRow.appendChild(checkLabel);      	     
	  	      filterListArray.appendChild(filterRow);
		   
	   }
	        
	 }
	         return filterListArray;
}


SagFilter.prototype.onClickAllCheckBox = function(ele,state){
	
    if($(ele).prop("checked") == true){
        $('.filterRowInput').prop('checked', true).attr('checked', 'checked');
    }
    else if($(ele).prop("checked") == false){
        $('.filterRowInput').prop('checked', false).removeAttr('checked');
    }

}


SagFilter.prototype.startWithStr = function(searchVal,fieldName){
	
	
	let dataArray = this.filterSearchData;  
	let val = searchVal;
	let key = fieldName;

	let filtered = dataArray.filter(function(item) {
		return (String(item[key]).toLowerCase()).startsWith(val.toLowerCase());
      }); 
	
	return filtered;

}

SagFilter.prototype.endWithStr = function(searchVal,fieldName){
	
	let dataArray = this.filterSearchData;  
	let val = searchVal;
	let key = fieldName;

	let filtered = dataArray.filter(function(item) {
		return (String(item[key]).toLowerCase()).endsWith(val.toLowerCase());
      }); 
	
	return filtered;
	
}

SagFilter.prototype.containStr = function(searchVal,fieldName){
	
	let dataArray = this.filterSearchData;  
	let val = searchVal;
	let key = fieldName;

	let filtered = dataArray.filter(function(item) {
		return ((String(item[key]).toLowerCase()).indexOf(val.toLowerCase()) > -1);
      }); 
	return filtered;
	
}

SagFilter.prototype.equalStr = function(searchVal,fieldName){
	
	let dataArray = this.filterSearchData;  
	let val = searchVal;
	let key = fieldName;
	
	let filtered = dataArray.filter(function(item) {
		return ((String(item[key]).toLowerCase()) == (val.toLowerCase()) );
      }); 
	return filtered;
	
}


SagFilter.prototype.notEqualStr = function(searchVal,fieldName){
	
	let dataArray = this.filterSearchData;  
	let val = searchVal;
	let key = fieldName;

	let filtered = dataArray.filter(function(item) {
		return ((String(item[key]).toLowerCase()) != (val.toLowerCase()));
      }); 
	return filtered;
	
}

SagFilter.prototype.unique = function (arr, prop) {
    return arr.map(function(e) { return e[prop]; }).filter(function(e,i,a){
        return i === a.indexOf(e);
    });
}




