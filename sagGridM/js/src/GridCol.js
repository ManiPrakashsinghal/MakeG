
	 
	function GridCol(sagGridObj){
		this.sagGridObj = sagGridObj;
        this.colObj = {};
        this.cellHeight = this.sagGridObj.OneRowHeight;
        
	 }
	 
	 GridCol.prototype.getColHtml = function(index){

         let columns = this.sagGridObj.colData;
         let colHtml  = {};
         let rowIndex = index;
         let obj = this.sagGridObj.rowData[rowIndex];
         let sag_G_Index = obj.sag_G_Index;
       
        
          let colHtmlCenter = GeneralEvent.createElementFromHTML('<div class="grid_row" sag_G_Index="'+sag_G_Index+'" grid_row_id="'+rowIndex+'"  > </div>');
          let colHtmlRight = GeneralEvent.createElementFromHTML('<div class="grid_row" sag_G_Index="'+sag_G_Index+'" grid_row_id="'+rowIndex+'"> </div>');
          let colHtmlLeft = GeneralEvent.createElementFromHTML('<div class="grid_row" sag_G_Index="'+sag_G_Index+'" grid_row_id="'+rowIndex+'" > </div>');
            
          let leftStyleL = 0;
          let leftStyleR = 0;
          let leftStyleC = 0;
          
         for(let j=0;j<columns.length;j++){
                 
                let styleWidth = columns[j]["width"];  //this.styleWidth;
                let field = columns[j]["field"];

                if(this.sagGridObj.frezzManager.hasOwnProperty(field)){
                    let val = this.sagGridObj.frezzManager[field];
                    if(val =='left'){
                        colHtmlLeft.appendChild(this.createCol(index,j,leftStyleL,"left"));
                         leftStyleL +=  Number(styleWidth.replace("px", ""));
                    }else if(val == 'right'){
                           colHtmlRight.appendChild(this.createCol(index,j,leftStyleR,"right"));
                           leftStyleR +=  Number(styleWidth.replace("px", ""));
                    }else{
                        colHtmlCenter.appendChild(this.createCol(index,j,leftStyleC,"center"));
                        leftStyleC +=  Number(styleWidth.replace("px", ""));
                    }
                }else{
                     colHtmlCenter.appendChild(this.createCol(index,j,leftStyleC,"center"));
                      leftStyleC +=  Number(styleWidth.replace("px", ""));
                }
            }

            colHtml["left"] = colHtmlLeft;
            colHtml["right"] = colHtmlRight;
            colHtml["center"] = colHtmlCenter;
            
     
		 return colHtml;
		 
     }


     GridCol.prototype.createCol = function(index,j,styleLeft,pos){


                let obj = this.sagGridObj.rowData[index];
                let columns = this.sagGridObj.colData;
                
                let sag_G_Index = obj.sag_G_Index;

                let styleWidth = columns[j]["width"];  //this.styleWidth;
                let styleHight = this.cellHeight;
                let colHtml = '';
                
       
                let field = columns[j]["field"];
                let colClass = columns[j]["sagColClass"];   //this.sagGridObj.colIdArray[pos][j];   //'col'+j;
                
                let textAlign = 'left';
				if (columns[j].hasOwnProperty("text-align")) {
					textAlign = columns[j]["text-align"];
				 }
				
				let attributes = {};
				let colEvent = {};
				if (columns[j].hasOwnProperty("attributes")) {
					attributes = columns[j]["attributes"];
					colEvent = attributes;
				 }
				
				attributes["sag_G_Index"] = sag_G_Index;
				attributes["sag_G_Key"] = field;
				attributes["index"]= index;
				
                
				let fieldVal = ''
				
            	if(field == 'id'){
					fieldVal = sag_G_Index;
				}else if(field == 'sno'){
					fieldVal = index+1;
				}else{
					
					if (!columns[j].hasOwnProperty("component")) {
						fieldVal = obj[field];
					 }else{
						 
						 let val = obj[field];
						 let conponentName = columns[j]["component"];
						 
						 attributes["component"] = conponentName;
						 attributes["keyValue"] = val;
						 
						 let compObj = this.sagGridObj.components[conponentName];
						// let compObj = new component();
						 let params = {
								 "rowIndex":sag_G_Index,
								 "colKey":field,
								 "rowValue":obj,
								 "colValue":columns[j],
								 "value":val,
						 };
						 compObj.init(params);
						 //fieldVal = compObj.getValue();
						 fieldVal = compObj.getTextView();
					 }	
					
					
				}
 
				if(fieldVal == null || fieldVal == undefined){
					fieldVal = " ";
				}
				
				
				/**
				 * Cell Render view work start
				 */
				if (columns[j].hasOwnProperty("cellRenderView")) {
					 let conponentName = columns[j]["cellRenderView"];
					 let compObj = this.sagGridObj.components[conponentName];
					 //let compObj = new component();
					 let params = {
							 "rowIndex":sag_G_Index,
							 "colKey":field,
							 "rowValue":obj,
							 "colValue":columns[j],
							 "value":fieldVal,
					 };
					 compObj.init(params);
					 fieldVal = compObj.getGui();	
					 compObj.afterGuiAttached();
				 }
			
				let nodeObject = {};
				
				if (columns[j]["colType"] == "checkBox"){
					let cls = Property.fontAwsmClass.unChecked;
					if(this.sagGridObj.checkedRowIdArray.indexOf(sag_G_Index) > -1){
						cls = Property.fontAwsmClass.checked;
					}
					
					//colHtml = `<div index="${index}" class="grid_cell ${colClass}" sag_G_Index="${sag_G_Index}" sag_G_Key="${field}" style="width:${styleWidth}; height:${styleHight}px; left:${styleLeft}px; text-align:center;  "  > <span class=" fa ${cls} sag-checkBox  sag-CheckboxCls" > </span></div>`;
                
					
					   nodeObject = {
								"nodeType":"div",
								"attributes":attributes,
								"classes":["grid_cell","cellEventListnr",colClass],
								"styles":{"width":styleWidth,"left":styleLeft+"px","height":styleHight+"px","text-align":textAlign},
								"childNode":[
									{
										"nodeType":"span",
										//"attributes":colEvent,
										"classes":[ "fa",cls,"sag-checkBox","sag-CheckboxCls"],
									}
								]						
					  };
					
				}else{
		
				   nodeObject = {
							"nodeType":"div",
							"attributes":attributes,
							"classes":["grid_cell","cellEventListnr",colClass],
							"styles":{"width":styleWidth,"left":styleLeft+"px","height":styleHight+"px","text-align":textAlign},
							"props":{"innerHTML":fieldVal},							
				  };
				  
				   //Editable work start
					if (columns[j].hasOwnProperty("editable")) {
						if(columns[j]["editable"] == true){
							nodeObject.classes.push("sagCellEditable");
							nodeObject.attributes["editable"] = "input-type-text";
						}
					 }
				  
			
                }		 
                //let colHtml = `<div index="${index}" class="grid_cell ${colClass}" style="width:${styleWidth}; left:${styleLeft}px"  >${fieldVal}</div> `;
				
				//if row is selected 
				if(this.sagGridObj.gridEventObj.selectedRowINdex != null && this.sagGridObj.gridEventObj.selectedRowINdex == sag_G_Index){
					nodeObject.classes.push("sml_slectedRow");
				}
				
				colHtml = this.createElement(nodeObject,"null");
				//colHtml  = GeneralEvent.createHtmlStrFromEle(colHtml); 
                return colHtml;

     }
     
	 
	 
	 GridCol.prototype.clickOngrid_cell = function(){
		 
		 $('div.grid_cell').ondblclick = function(){console.log("click success")};
		
	 }
     
     
     
     GridCol.prototype.createElement = function(nodeObj,fieldVal) {
    	    
     	let nodeType = nodeObj.nodeType;
     	var element = document.createElement(nodeType);

     	//set attributes
     	if (nodeObj.hasOwnProperty("attributes")) {
 	    	let attrObj = nodeObj.attributes;
 	    	for (let key in attrObj) {
 			  let value = attrObj[key];
 			  element.setAttribute(key, value);
 			  }
     	}
     	
     	//set property
     	if (nodeObj.hasOwnProperty("props")) {
 	    	let propObj = nodeObj.props;
 	    	for (let key in propObj) {
 			  let value = propObj[key];
 			  	if(key == "innerHTML"){
				   if(value instanceof HTMLElement){
					  element.append(value);
					}else{
						element[key] = value;
					}
			    }else{
	 	    		element[key] = value;
	 	    	}
 	    	}
 			  
     	}
     	
     	//add styles
     	if (nodeObj.hasOwnProperty("styles")) {
 	    	let styleArray = nodeObj.styles;
 	    	for (let key in styleArray) {
 	  		  let value = styleArray[key];
 	  		  element.style[key] = value;
 	  		
 	  		}
     	}
       	
     	//add class
     	if (nodeObj.hasOwnProperty("classes")) {
 	    	let classArray = nodeObj.classes;
 	    	for(let i=0;i<classArray.length;i++){
 	    		element.classList.add(classArray[i]);
 	    	}
     	}
     	
     	if (nodeObj.hasOwnProperty("childNode")) {
 	    	    let childNodeArray = nodeObj.childNode;
 	    	    for(let i=0;i<childNodeArray.length;i++){
 	    	    	let childObj = 	childNodeArray[i];
 	    	    	let eleDom = this.createChildElement(childObj);
 	    	    	element.appendChild(eleDom);
 	    	    }
     	 }
     	 
     	
     	//add events
     	if (nodeObj.hasOwnProperty("events")) {
 	    	let eventObj = nodeObj.events;
 	    	for (let key in eventObj) {
 	  		  let value = eventObj[key];	  		
 		  			 //element.addEventListener(key,value);	
 	  		  this.sagGridObj.EventListner.push({"ele":element,"k":key,"fn":value});
 	  		}
     	}
     	
     	if (nodeObj.hasOwnProperty("callBack")) {
     		nodeObj.callBack(element,fieldVal);
     	}

     	return element;
     }
     
     GridCol.prototype.createChildElement = function(nodeObj) {
     	
     	let nodeType = nodeObj.nodeType;
     	var element = document.createElement(nodeType);

     	//set attributes
     	if (nodeObj.hasOwnProperty("attributes")) {
 	    	let attrObj = nodeObj.attributes;
 	    	for (let key in attrObj) {
 			  let value = attrObj[key];
 			  element.setAttribute(key, value);
 			  }
     	}
     	
     	//set property
     	if (nodeObj.hasOwnProperty("props")) {
 	    	let propObj = nodeObj.props;
 	    	for (let key in propObj) {
 	 			  let value = propObj[key];
 	 			  	if(key == "innerHTML"){
 					   if(value instanceof HTMLElement){
 						  element.append(value);
 						}else{
 							element[key] = value;
 						}
 				    }else{
 		 	    		element[key] = value;
 		 	    	}
 	 	    	}
     	}
     	
     	//add styles
     	if (nodeObj.hasOwnProperty("styles")) {
 	    	let styleArray = nodeObj.styles;
 	    	for (let key in styleArray) {
 	  		  let value = styleArray[key];
 	  		  element.style[key] = value;
 	  		}
     	}
       	
     	//add class
     	if (nodeObj.hasOwnProperty("classes")) {
 	    	let classArray = nodeObj.classes;
 	    	for(let i=0;i<classArray.length;i++){
 	    		element.classList.add(classArray[i]);
 	    	}
     	}
     	
     	if (nodeObj.hasOwnProperty("childNode")) {
 	    	    let childNodeArray = nodeObj.childNode;
 	    	    for(let i=0;i<childNodeArray.length;i++){
 	    	    	let childObj = 	childNodeArray[i];
 	    	    	let eleDom = this.createChildElement(childObj);
 	    	    	element.appendChild(eleDom);
 	    	    }
     	  }
     	return element;
     }
     
     
