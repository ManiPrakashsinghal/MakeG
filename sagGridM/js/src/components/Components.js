
/** 
 * Add component to document
 * @returns
 */ 
/*common components */
/*document.write('<script type="text/javascript" src="sagGridM/js/src/components/SagInputText.js"></script>');*/
document.write("<script type='text/javascript' src='sagGridM/js/es6plugins.js'></script>");
document.write('<script type="text/javascript" src="sagGridM/js/src/components/SagSelectBox.js"></script>');
document.write('<script type="text/javascript" src="sagGridM/js/src/components/SagDatePicker.js"></script>');
document.write("<script type='text/javascript' src='sagGridM/js/src/components/SagCheckBox.js'></script>");
document.write("<script type='text/javascript' src='sagGridM/js/src/HideShowCol.js'></script>");
document.write("<script type='text/javascript' src='sagGridM/js/src/RowGroup.js'></script>");


function Components(){
	
	
}

/**
 * parameter 
 * 
 * 						let params = {
								 "rowIndex":sag_G_Index,
								 "colKey":field,
								 "rowValue":obj,
								 "colValue":columns[j],
								 "value":val,
						 }
 * 
 * 
 */ 

/*
  //component calling 
  
  
         {
     	   header :"Date of Registration",
     	   field :"gstRgdt",
     	   filter : true,
     	   width : "150px",
     	   "text-align":"center",
     	   "editable": false,
     	   search :true,
     	  component:"dateOfReg",
     	    "columnType":"date",
     	   "attributes":{
     	  // "ng-click" : "selectRow()",
     	   //"ng-dblclick" : "modifyBySelectRow()"
     	   }
        }
  
  
		{
     	   header :"Composition",
     	   field :"gstnCmpyn",
     	   filter : true,
     	   width : "160px",
     	   "text-align":"center",
     	   "editable": false,
     	   search :true,
     	  cellRenderView:"gstnStatus",
     	    "columnType":"number",
     	   "attributes":{
     	   //"ng-click" : "selectRow()",
     	   //"ng-dblclick" : "modifyBySelectRow()"
     	   }
        }
  
 var callBackMethode = {
		"onRowClick":function(){ $scope.safeApply(function() {
			$scope.selectRow();
		});
		},
		"onRowDbleClick":function(){ $scope.safeApply(function() {
			$scope.modifyBySelectRow();
		});
		}
};

let optArr = ["LLP",
	"Properitorship",
	"Other (Please Specify)",
	"Private Limited Company",
	"Hindu Undivided Family",
	"Public Limited Company",
	"Partnership",
	"Government Department",
	"Local Authority",
	"Any other body notified by committee"];

let selectObj = new SagSelectBox(optArr,function(ele,params){
	ele.addEventListener('change',function(){
		 alert(params.rowIndex);
	});
});

let checkBoxObj = new SagCheckBox(function(ele,params){
	ele.addEventListener('click',function(){
		alert(ele.checked);
		 alert(params.rowIndex);
	});
});

 var components = {
        "groupNameComponent": new SagInputText(),
        "statusname":selectObj,
        "dateOfReg":new SagDatePicker(),
        "gstnStatus":checkBoxObj,
    };

if( undefined != sourceDiv){
	var gridData = { 
			columnDef     : columns,
			rowDef        : rowsDataCopy,
			menu          : {fontFamily:true,fontSize:true,underline:true,left:true,center:true,right:true,selectionType:true,columnDraggable:true,columnResizable : true},
			selection     : "row",
			//pagging       : true,
			//paggingType   : "Record Wise",
			clientSidePagging : true,
			recordPerPage : $rootScope.gridPCount,
			recordNo      : true,
			gridExportService	:	gridExportService,
			frezzManager		:	{"checkBox":"left","sno":"left","othindName":"left","groupName":"left","clientCode":"left"},
			sheatDetails :{sheatName:"Client_ClientCreation_Client_List",title:"Client Creation Client List",fileName : "Client_ClientCreation_Client_List"},
			callBack:callBackMethode,
			components:components
	};
	$scope.gridDynamic = SagGridMP(sourceDiv,gridData, $compile, $scope);
	
	*/