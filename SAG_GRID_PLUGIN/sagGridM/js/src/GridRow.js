
	function GridRow(sagGridObj){
      this.rowTransformY = 0;
      this.sagGridObj = sagGridObj;
      this.rowData = sagGridObj.rowData;
      this.rowHtml = {};
	}
	 
	GridRow.prototype.getRowHtml = function(rowIndex){
		 
		  this.rowTransformY = rowIndex*this.sagGridObj.OneRowHeight;
		  
		  let obj = this.sagGridObj.rowData[rowIndex];
          let sag_G_Index = obj.sag_G_Index;
		  
		  let gridColObj = new GridCol(this.sagGridObj);
	      let allColHtml = gridColObj.getColHtml(rowIndex);
	      
	      if(allColHtml["center"].children.length != 0){
	 
	     let grid_row = '<div id="row_'+rowIndex+'" sag_G_Index="'+sag_G_Index+'" saggridRowId="'+rowIndex+'" class="grid_row_header sagRow mouseOverOut "  style=" height: '+this.sagGridObj.OneRowHeight+'px; transform: translateY('+this.rowTransformY+'px);">  </div>';
	     grid_row = GeneralEvent.createElementFromHTML(grid_row);
	     
	     if(this.sagGridObj.rowObjSpanIndexWidth.hasOwnProperty(sag_G_Index)){
	    	 grid_row.classList.add("sagGroupRow");
 		 }
	   
	     grid_row.appendChild(allColHtml["center"]);
	    
		  this.rowHtml["center"] = grid_row;  //`${allColHtml.center}`;
	      }else{
	    	  this.rowHtml["center"] = '';
	      }
	      
	      
	      if(allColHtml["left"].children.length != 0){
	    	  
	    	  
	    	  let grid_row = '<div id="row_'+rowIndex+'"sag_G_Index="'+sag_G_Index+'" saggridRowId="'+rowIndex+'" class="grid_row_header sagRow mouseOverOut " style=" height: '+this.sagGridObj.OneRowHeight+'px; transform: translateY('+this.rowTransformY+'px);">  </div>';
	 	     grid_row = GeneralEvent.createElementFromHTML(grid_row);
	 	     if(this.sagGridObj.rowObjSpanIndexWidth.hasOwnProperty(sag_G_Index)){
		    	 grid_row.classList.add("sagGroupRow");
	 		 }
	 	     grid_row.appendChild(allColHtml["left"]);
	 	   
	        this.rowHtml["left"] = grid_row;
	                        
	      }else{
	    	  this.rowHtml["left"]='';
	      }
	      
	    
	        
	      if(allColHtml["right"].children.length != 0){
	    	  
	    	  
	    	  let grid_row = '<div id="row_'+rowIndex+'" sag_G_Index="'+sag_G_Index+'" saggridRowId="'+rowIndex+'" class="grid_row_header sagRow mouseOverOut " style=" height: '+this.sagGridObj.OneRowHeight+'px; transform: translateY('+this.rowTransformY+'px);" >  </div>';
		 	   grid_row = GeneralEvent.createElementFromHTML(grid_row);
		 	   
		 	  if(this.sagGridObj.rowObjSpanIndexWidth.hasOwnProperty(sag_G_Index)){
			    	 grid_row.classList.add("sagGroupRow");
		 		 }
		 	   
		 	    grid_row.appendChild(allColHtml["right"]); 
		 	  
	        this.rowHtml["right"] =grid_row;
	      
	      }else{
	    	  this.rowHtml["right"]='';
	      }
	      
			 return this.rowHtml;
		 }
	
	/**
	 * addRowByIndex is used to add row in given index and given data 
	 * and also shift next index to array 
	 */
	GridRow.prototype.addRowByIndex = function(rowIndex){
		
		
	}
	
	
	/**
	 * addRowByIndex is used to delete row in given index and given data 
	 * and also shift next index to array 
	 */
	GridRow.prototype.deleteRowByIndex = function(rowIndex){
		
		
		
	}
	
	
	/**
	 * addRowByIndex is used to add row in starting 
	 * and also shift next index to array 
	 */
	GridRow.prototype.addRowStart = function(rowIndex){
		
		let obj = this.sagGridObj.rowData[5];
		this.sagGridObj.rowData.push(obj);
		
	}
	
	
	/**
	 * addRowByIndex is used to add row in Ending
	 * and also shift next index to array 
	 */
	GridRow.prototype.addEndRow = function(rowIndex){
		
		
		  let obj = self.rowData[5];
		  self.rowData.push(obj);
		  self.scrollObj = new Scroll(self);
		  self.scrollObj.addGridScroll();
		  self.gridHeight = self.gridHeight + self.OneRowHeight;
		  $(".gridTHeight").height(self.gridHeight);

		
	}
	
	
	/**
	 * addRowByIndex is used to add row in Ending
	 * and also shift next index to array 
	 */
	GridRow.prototype.delteEndRow = function(rowIndex){
		
		  let obj = self.rowData[5];
		  self.rowData.pop();
		  self.scrollObj = new Scroll(self);
		  self.scrollObj.addGridScroll();
		  self.gridHeight = self.gridHeight - self.OneRowHeight;
		  $(".gridTHeight").height(self.gridHeight);
		
	}
	