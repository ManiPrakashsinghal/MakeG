function GridExport(sagGridObj){

    this.sagGridObj = sagGridObj;
	
}

GridExport.prototype.onClickButton = function(ele){
	
	let exportType = ele.getAttribute("export-type");
	
	if(exportType == "exportBtnPage"){
			
		/**47 A
		 * This Method For Export the Data in Excel
		 * Here self is this mean self and this is same Object
		 * */
		this.exportGridData("allPage","xlsx","");
	
	}else if(exportType == "exportBtnAll"){
		/**48 B
		 * This Method For Export the Data in Excel
		 * Here self is this mean self and this is same Object
		 * */
		this.exportGridData("pageWise","xlsx","");
	
	}else if(exportType == "exportBtnForPDFPortrait"){


		/**48 C
		 * This Method For Export the Data in PDF landscape
		 * Here self is this mean self and this is same Object
		 * */
			this.exportGridData("allPage","pdf","landscape");
	
	}else if(exportType == "exportBtnForPDFLandscape"){
		
		/**48 D
		 * This Method For Export the Data in Excel
		 * Here self is this mean self and this is same Object
		 * */
			this.exportGridData("allPage","pdf","portrait");
		
	}
		
}


GridExport.prototype.exportGridData = function(exportMode,typeOfExp,pageOrient){
	
	let self = this.sagGridObj;
	

	let rowData = Array.from(self.originalRowData);
	let gridRowData = Array.from(self.originalRowData);
	let colData = Array.from(self.originalColData);
	
	for(let c=0;c<colData.length;c++){
	
		  let colmn = colData[c];
		  
		  let componentType = false;
		  if(colmn.hasOwnProperty("component")){
			  componentType = "component";
		  }else if(colmn.hasOwnProperty("cellRenderView")){
			  componentType = "cellRenderView";
		  }else{
			  componentType = false;
		  }
		  
		  if(componentType){
		  		  let field = colmn.field
		  		  gridRowData = [];
				  gridRowData = rowData.map(function(x,index) {
					
						 let val = x[field];
						 let conponentName = colData[c][componentType];
						
						 let compObj = self.components[conponentName];
						// let compObj = new component();
						 let params = {
								 "rowIndex":index,
								 "colKey":field,
								 "rowValue":x,
								 "colValue":colData[c],
								 "value":val,
						 };
						 compObj.init(params);
						 //fieldVal = compObj.getValue();
						 fieldVal = compObj.getText();
						 x[field] = fieldVal;
						 return x;
				 }); 
		  
		  }
	 
	}
	
	
	
	
	
	
	let mergeObj = {};
	mergeObj["columns"] = colData;
	if(exportMode != null){
		if(exportMode == "pageWise")
			mergeObj["rows"] 	= gridRowData;
		else
			mergeObj["rows"] 	= gridRowData;
	}else
		mergeObj["rows"] 		= gridRowData;
	
	if(self.ExcelExportService != null && self.ExcelExportService != null){
		/*if(self.sheatDetailsfun){
			mergeObj["sheatDetails"] = self.sheatDetailsfun();
		}else
		if(self.sheatDetails)*/
			mergeObj["sheatDetails"] = self.sheatDetails;
		/*typeOfExp,pageOrient*/
		if(typeOfExp=="xlsx"){
			self.ExcelExportService.gridDataExport(mergeObj,"xlsx")
			.then(
					function(response){
						console.log("File Export Successfully");
					},
					function(errorMgs){
						console.log("Error occued for Export Data..!");
					}
			);
		}
		else{
			mergeObj["orientation"] = pageOrient;
			self.ExcelExportService.gridDataExport(mergeObj,"pdf")
			.then(
					function(response){
						console.log("File Export Successfully");
					},
					function(errorMgs){
						console.log("Error occued for Export Data..!");
					}
			);
		}

	}else{
		alert("ExportService Is Null ...!");
	}
	
}




























