  /* function for cursor movement in Grid -- Varun Jain */
  function GridNavigation(sagGridObj)
  {
	  this.sagGridObj = sagGridObj;
	  this.RowLength = sagGridObj.rowData.length;
	  this.ColLength = sagGridObj.colData.length;
	  
	  let self = this;
	  let colno, rowno;
	  let navCellEle = (self.sagGridObj.gridEle).querySelectorAll(".gridNavigationEvent");
	  $(navCellEle).off().on("click", function(){
		  $((self.sagGridObj.gridEle).querySelectorAll(".grid_cell")).removeClass("grid_cell_selected");
		  $(document.activeElement).addClass("grid_cell_selected");
	  });
	  
	  $(navCellEle).on('keydown', function(event){
		  
		  colno = $((self.sagGridObj.gridEle).querySelector(".grid_cell_selected")).attr("tabindex_col");
		  rowno = $((self.sagGridObj.gridEle).querySelector(".grid_cell_selected")).attr("tabindex_row"); 	
		  let cursorMove = {
				  nextColDown: Number(colno), 
				  nextRowDown: function(){	
					  if(Number(rowno) < self.sagGridObj.rowData.length-1)
						  return Number(rowno)+1;
					  else
						  return Number(rowno);
					},
				  
				  nextColUp: Number(colno),
				  nextRowUp: function(){ 
					  if(Number(rowno)>0) 
						  return Number(rowno)-1;
					  else
						  return Number(rowno);
				  	},
				  
	  			  nextColRight: function(){ 
	  				  if(Number(colno) < self.sagGridObj.colData.length-1) 
	  					  return Number(colno)+1;
	  				  else
	  					  return Number(colno);
	  				},
	  			  nextRowRight: Number(rowno),
	  			  
	  			  nextColLeft: function(){ 
	  				  if (Number(colno)>0)
	  					  return Number(colno)-1; 
	  				  else	
	  					  return Number(colno) ;  
	  				  },
				  nextRowLeft: 	Number(rowno)			  
		  }
		  
			switch(event.keyCode)
			{
				case 40:
					event.preventDefault();
					$((self.sagGridObj.gridEle).querySelectorAll(".grid_cell")).removeClass("grid_cell_selected");
					$((self.sagGridObj.gridEle).querySelector("[tabindex_col='"+cursorMove.nextColDown+"'][tabindex_row='"+cursorMove.nextRowDown()+"']")).addClass("grid_cell_selected").focus();
				break;
				
				case 38:
					event.preventDefault();
					$((self.sagGridObj.gridEle).querySelectorAll(".grid_cell")).removeClass("grid_cell_selected");
					$((self.sagGridObj.gridEle).querySelector("[tabindex_col='"+cursorMove.nextColUp+"'][tabindex_row='"+cursorMove.nextRowUp()+"']")).addClass("grid_cell_selected").focus();
				break;
				
				case 39:
					event.preventDefault();
					$((self.sagGridObj.gridEle).querySelectorAll(".grid_cell")).removeClass("grid_cell_selected");
					$((self.sagGridObj.gridEle).querySelector("[tabindex_col='"+cursorMove.nextColRight()+"'][tabindex_row='"+cursorMove.nextRowRight+"']")).addClass("grid_cell_selected").focus();
				break;
				
				case 37:
					event.preventDefault();
					$((self.sagGridObj.gridEle).querySelectorAll(".grid_cell")).removeClass("grid_cell_selected");
					$((self.sagGridObj.gridEle).querySelector("[tabindex_col='"+cursorMove.nextColLeft()+"'][tabindex_row='"+cursorMove.nextRowLeft+"']")).addClass("grid_cell_selected").focus();
				break;
				
				case 32:
					
					if(!$(document.activeElement).is("select")){
						event.preventDefault();
						let rowId = $(document.activeElement).attr("tabindex_row");
						let selectRow = (self.sagGridObj.gridEle).querySelectorAll('[tabindex_row="'+rowId+'"]');
						
						let sag_g_index =  $(document.activeElement).attr("sag_g_index");
						
						self.sagGridObj.sagGridEvent.setRowSelectInTab(Number(sag_g_index));
						//$(selectRow).toggleClass("sml_slectedRow");
						let ele;
						for(var i=0; i<selectRow.length; i++) {
							var result = $(selectRow[i]).find(".sag-CheckboxCls"); 
							if(result.length > 0) {
								ele = result[0];
								break;
							}; 
						}
						
						if(ele){
							//self.sagGridObj.sagGridEvent.onCheckBoxClick(ele);
							ele.click();
						}
					}
					break;
					
				case 113:
					//MakeEditable();
					//lert("Called");
					let ele = document.activeElement;
					let compAttr =  $(ele).attr("component");
					
					if (typeof compAttr !== typeof undefined && compAttr !== false) {
						$(ele).click();
					}
				break;
				
				case 13:
					event.preventDefault();
					$((self.sagGridObj.gridEle).querySelectorAll(".grid_cell")).removeClass("grid_cell_selected");
					$((self.sagGridObj.gridEle).querySelector("[tabindex_col='"+cursorMove.nextColDown+"'][tabindex_row='"+cursorMove.nextRowDown()+"']")).addClass("grid_cell_selected").focus();
				break;
				
				case 9:
					event.preventDefault();
					$(".bottomline button:first").focus();
				break;
				
				
			}
	  });
	  
	  $(navCellEle).removeClass("gridNavigationEvent");
  }
  
    
	  
  
  /* function for cursor movement in Grid -- end Varun Jain */
  /* 
   * grid navigation key down work commit from varun sir by mani parakash singhal
     work in key up/down/left/right/f12/enter/space
   */
  
   