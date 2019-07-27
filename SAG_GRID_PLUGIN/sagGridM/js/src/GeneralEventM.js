	 function GeneralEvent(sagGridObj){
		    this.sagGridObj = sagGridObj;
		    this.callBackJson = this.sagGridObj.callBack;
	}

    GeneralEvent.createElementFromHTML = function(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild; 
    }
    
    GeneralEvent.createHtmlStrFromEle = function(ele) {
        var wrap = document.createElement('div');
        wrap.appendChild(ele.cloneNode(true));
        return wrap.innerHTML;
    }
    
    
    GeneralEvent.prototype.onRowHover = function(ele) {
    	
    	//let rowId = $(ele).attr("sag_g_index");
    	// $((this.sagGridObj.gridEle).querySelectorAll('[sag_g_index="'+rowId+'"]')).addClass("sml_hoverRow");
    	
    	
	    //compile this row for event 
	   /* if($(ele).attr("isCompiled") != "true"){
	    	this.sagGridObj.compile(ele)(this.sagGridObj.scope);
	    	$(ele).attr("isCompiled","true");
	    }*/
	    
    }
    
    GeneralEvent.prototype.outRowHover = function(ele){
    	//let rowId = $(ele).attr("sag_g_index");
    	//$((this.sagGridObj.gridEle).querySelectorAll('[sag_g_index="'+rowId+'"]')).removeClass("sml_hoverRow");
	   
	}
    
    GeneralEvent.prototype.onRowClick = function(ele) {
    	let rowId = $(ele).attr("sag_g_index");
    	this.sagGridObj.gridEventObj.setSelectedRowIndex(rowId);
    	this.selectRowClrChange(rowId);
    
    	 if(this.callBackJson.hasOwnProperty("onRowClick")){
    		 this.callBackJson.onRowClick();
         } 	
    }
    
    
    GeneralEvent.prototype.onRowDblclick = function(ele) {
 
    	 if(this.callBackJson.hasOwnProperty("onRowDbleClick")){
    		 this.callBackJson.onRowDbleClick();
         } 	
      }
    
    
    GeneralEvent.prototype.onCheckBoxClick = function(data) {
    	 
   	 if(this.callBackJson.hasOwnProperty("onCheckBoxClick")){
   		 this.callBackJson.onCheckBoxClick(data);
        } 	
     }
    
    GeneralEvent.prototype.onAllCheckBoxClick = function(data) {
   	 
      	 if(this.callBackJson.hasOwnProperty("onAllCheckBoxClick")){
      		 this.callBackJson.onAllCheckBoxClick(data);
           } 	
        }

    
  
    //onRowDblclick
    GeneralEvent.prototype.selectRowClrChange = function(rowIndex) {
    	let allCellElePre = $((this.sagGridObj.gridEle).querySelectorAll('div[sag_g_index]'));
    	allCellElePre.removeClass("sml_slectedRow");   //.css("background-color", ''); grid_cell
    	allCellElePre.removeClass("sml_hoverRow");
    	
    	let allCellEleNew = (this.sagGridObj.gridEle).querySelectorAll('[sag_g_index="'+rowIndex+'"]');
	    $(allCellEleNew).addClass("sml_slectedRow"); //.css("background-color", '#9f9e9d');   //d8d8d8
	    //this.sagGridObj.scrollObj.scrollToIndex(rowIndex);
	    	 //allCellEleNew[0].scrollIntoView();

    }
    
    
    /** This method for setRow Property rowJson like that format {"color":"red"}; it will set tr attribute */
    GeneralEvent.prototype.setRowStyleProperty = function(var_rowIndex,var_rowJson) {
  
       let allCellEleNew = (this.sagGridObj.gridEle).querySelectorAll('[sag_g_index="'+var_rowIndex+'"]');
       var var_keys = Object.keys(var_rowJson);
   	   for (var i = 0; i < allCellEleNew.length; i++) {
	    	  var item = allCellEleNew[i];
	    	  for(let j=0;j<var_keys.length;j++){
	    		  item.style[var_keys[j]] = var_rowJson[var_keys[j]];
	    	  }
	    	}
    }
    
    
    
    
    
  
    
    
    
	
	

	    
