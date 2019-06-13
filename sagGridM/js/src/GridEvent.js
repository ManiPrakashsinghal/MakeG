/**
 *Grid event which is call from out side of grid. to get any data  and call any functionality according to condition. 
 * @param sagGridObj
 * @returns
 */
function GridEvent(sagGridObj){

    this.sagGridObj = sagGridObj;
    this.selectedRowINdex = null;

}


GridEvent.prototype.setSelectedRowIndex  = function(index){
	this.selectedRowINdex = parseInt(index);
}
GridEvent.prototype.getCurrentPageNo  = function(){
	return 1;
}


GridEvent.prototype.getSelectedRowIndex  = function(index){
	let returnIndex = parseInt(this.selectedRowINdex);
	if(returnIndex == undefined || isNaN(returnIndex)){
		returnIndex = null;
	}
	return  returnIndex;
}

GridEvent.prototype.setGridHight = function(param){
	
	
	//set grid height
	var totalHeight = headerHeight = pageHeaderHeaight = pageHeaderHeaight =  bottomLineHeight  =  sagButtonLine  =  tableGridHeaderFirst =  tableGridHeaderSecond  = footerGridHeight = tableGridTotalHeight = calculateHeight = sagFieldSecHeight =  sagtabsSectionNav = null;
	 totalHeight = $(window).outerHeight(true);
	 var outerHeight = 0;
	 headerHeight = $('.site-header').outerHeight();
	 pageHeaderHeaight = $('.page-content-header').outerHeight();
	 sagFieldSecHeight = $('.sagFieldSec').outerHeight();
	 sagtabsSectionNav = $('.tabs-section-nav').outerHeight();
	 bottomLineHeight = $('.bottomline').outerHeight();
	 sagButtonLine = $('.sagbootom-Line').outerHeight();
	 outerHeight = headerHeight + pageHeaderHeaight + sagFieldSecHeight + sagtabsSectionNav + bottomLineHeight + sagButtonLine;

	// tableGridHeaderFirst = $('.drag-div').outerHeight();
	// tableGridHeaderSecond = $('#gridHeader').outerHeight();
	// footerGridHeight = $('.footerGrid').outerHeight();

	// tableGridTotalHeight = tableGridHeaderFirst + tableGridHeaderSecond + footerGridHeight;

	 calculateHeight = totalHeight - outerHeight ;
	 let sourceDiv = this.sagGridObj.gridEle;
	 $(sourceDiv).parents(".masterdiv").height(calculateHeight);
	 
	
	
}

GridEvent.prototype.setPageNumberSaveState  = function(param){
	console.warn("setPageNumberSaveState function is not working");
}


GridEvent.prototype.getSeletedRowData  = function(){
	if(this.selectedRowINdex != null){
		var obj = this.sagGridObj.originalRowData[this.selectedRowINdex];
		return obj;
	}else{
		console.error("No Row Selected");
		return null;
	}
}


GridEvent.prototype.setRowSelected = function(var_index,status){
	this.selectedRowINdex = var_index;
	this.sagGridObj.generalEvntObj.selectRowClrChange(this.selectedRowINdex);
}

/**
* This function for get data according to checked data
* */
GridEvent.prototype.getCheckedDataParticularColumnWise = function(paramKey){
	
	let self = this;
	let orgArray = self.sagGridObj.originalRowData;
	 let dataArray = orgArray.filter(function(item) {
		 let index = item["sag_G_Index"];
		 if(self.sagGridObj.checkedRowIdArray.includes(index)){
		   return item;
		 }
	    }); 
	 console.log(dataArray);
	 return dataArray;

}	



/***2.This Method for Get All Grid Data Its return An Json Array and All Json key is equal of 
* that field which is define in column Json when set first time
* return Data 
* 
* Note : if Pagging apply then it will return page wise all data
* 		  in that case use  getAllPageData ()
* 
* 
* ***/
GridEvent.prototype.getGridData = function(){
	
	let self = this;
	let orgArray = self.sagGridObj.originalRowData;
	 console.log(orgArray);
	 return orgArray;
}



/**35
*/
GridEvent.prototype.defaultSearchEnable = function(var_columnKey){
	
	
}

/**
* 53 Method for going to any page pass page number 
**/

GridEvent.prototype.goAnyWherePage = function (pageNumber){
	
	
}





//
////Old Grid method Implements
//
///***1.This Method for Set All Grid Column and Row ,Remove Present Row and Column*
// * Parameter -- 1.ColumnData(JSONArray) 
// * 				2.RowData(JSONArray)
// * return -- null**/
//GridEvent.prototype.setJsonArr = function (var_ColumnData, var_rowData){
//	
//}
//
//

//
//
///**3.This Method For Getting Particular Row Data Need To pass index of a row and index is start with 0 **/
//GridEvent.prototype.getRowData = function(var_rowIndex){
//	
//}
//
///**4.This method for Highlight Perpouse pass Argument rowIndex and color/color code **/
//GridEvent.prototype.highlightRow = function(var_rowIndex,var_color){
//	
//	
//}
//
///**5.This Method for delete particular row take argument is rowIndex */
//GridEvent.prototype.deleteRow =function(var_rowIndex){
//	
//}
//
///**6.This method for Update Row argument rowIndex and update Json with field name key */
//GridEvent.prototype.updateRow = function(var_rowIndex, var_updateJson){
//	
//}
//
///**7.This Method For highlight Column */
//GridEvent.prototype.setColumnProperty = function(var_columnJsonArr){
//	
//}
//
///**8.This Row For Inserting Perpose */
//GridEvent.prototype.addRow =function(var_index , var_rowJsonData){
//	
//}
//
///**9.This method for setRow Property rowJson like that format {"style":"color:red;"} it will set tr attribute */
//GridEvent.prototype.setRowProperty = function(var_rowIndex,var_rowJson){
//	
//	
//}
//
///**10. search Data and highlight this function is not Complete */
//GridEvent.prototype.search = function(var_coldef, var_searchContain, var_propertyJson){
//	
//}
//
///**11.This Method for Grid Lines*/
//GridEvent.prototype.gridLines = function (var_propertyName){ 
//	
//}
//
///**12.This Method for selection we have 4 selection type - Grid,Cell,Row,Column,Header
// * Parameter -- selectionValue (String)
// * return null**/
//GridEvent.prototype.setSelection = function(var_selection){
//	
//}
//
//
///**13.This Method for SetGridWidth 
// *Parameter -- ValueOfWidth in px,%,vm(String Object) 
// *return null**/
//GridEvent.prototype.setGridWidth = function(var_gridWidth){
//
//}
//
///**14.This Method For GetColumn 
// * Parameter -- columnJsonData (JSONObject) 
// * return -- Array in String Form*/
//GridEvent.prototype.getColumnData = function(var_ColumnJson){
//	
//}
//
///**15.This Method For removeRowProperty 
// * Parameter -- rowIndexValue (int/String)
// * 				propertyName 
// * return -- null*/
//GridEvent.prototype.removeRowProperty = function(var_rowIndex, var_PropertyName){
//	
//}
//
///**16.This Method for SetGridHeight 
// *Parameter -- ValueOfWidth in px,%,vm(String Object) 
// *return null**/
//GridEvent.prototype.setGridHight = function(var_gridHeight){
//	
//}
//
///**17.Parameter --  {currentPage :1,totalPage :10,showRecord:100,nextEnable :true,previousEnable : true,nextOnclick : null,previousOnclick: null,range: 1-10,totalRecord:10,firstOnclick: null,lastOnclick:};
//*return null**/
//GridEvent.prototype.setServerPagingData = function(var_data){
//	
//}
//
///**18.Parameter --  {currentPage :1,totalPage :10,showRecord:100};
//*return null**/
//GridEvent.prototype.getServerPagingData = function(){
//	
//}
//
///**
// * 19
// * */
//GridEvent.prototype.setRowsEventProperty = function(var_rowIndex, var_propertyJson){
//	
//	
//}
//
///**
// * 20
// * */
//GridEvent.prototype.setRowData = function(rowsDataJson){
//	
//}
//
//GridEvent.prototype.setColumnFrezz = function(var_frezzColumn,var_frezzType){
//	
//}
//
// /** 22
// * @parm columnKey is column key which column key based groupping
// * @parm openCloseStatus its status for open and Close if status is null then its default true (mean close with +) and false  
// * */
//GridEvent.prototype.addRowGroupping = function(columnKey,openCloseStatus){
//	 
// }
//
///**23
// * 
// * */
//GridEvent.prototype.removeRowGroupping   = function(columnKey){
//	
//}
///**
// * 24
// * */
//GridEvent.prototype.grouppingStateChange = function(){
//	
//}
///**25
// *  Comming Soon
// * */
//GridEvent.prototype.getSeletedRowData = function(){
//
//}
//
///**26
// *  Comming Soon
// * */
//GridEvent.prototype.setGridEditable = function(var_status){
//	
//	
//}
//
///**27
// *  Comming Soon
// * */
//GridEvent.prototype.setColumnEditableProperty = function(var_columnKey, var_status){
//	
//	
//}
//
///**28
// *  Comming Soon
// * */
//GridEvent.prototype.setRowEditable = function(var_rowIndex , var_status){
//	
//	
//}
//
///**29
// *  Comming Soon
// * */
//GridEvent.prototype.deleteSeletedRowData = function(){
//	
//}
//
///**  Comming Soon
//* */
//GridEvent.prototype.getSelectedRowIndex = function(){
//	
//}
//
///**31
// *  Comming Soon
// * */
//GridEvent.prototype.updateTotal = function(){
//	
//}
//
///**32
// *  Comming Soon
// * */
//GridEvent.prototype.setRowSelected = function(var_index,status){
//	
//	
//}
//
///**33
// *  Comming Soon
// * */ 
//GridEvent.prototype.setPageNumberSaveState = function(selectedPage){
//	
//}
//
///**34
//*  Comming Soon
//* */
//GridEvent.prototype.insertRowAtPostion = function(var_index,dataJsonObj){
//	
//	
//}
//
//
//
///**36
// */
//GridEvent.prototype.resizeEnable = function(){
//	
//	
//}
//
///**37
// */
//GridEvent.prototype.mergeRowWhenSame= function(columnKey){
//	
//	
//}
//
///**38
// * */
//GridEvent.prototype.updateTotalTD = function() {
//	
//}
//
///**39
// * this function  is used to highlight selected row**
// * ***********/
//GridEvent.prototype.fun_highlightRow=function(selectedIndex){
//	
//	
//}
//
///*******40
// * this function  is used to highlight selected row**
// * ***********/
//GridEvent.prototype.fun_removeHighlightRow=function(selectedIndex){
//	
//	
//}
//
///*******41
// * this function  is used to highlight selected row**
// * ***********/
//GridEvent.prototype.fun_highlightRowWithColorNm =function(selectedIndex, colorName){
//	
//}
//
///*** 
// * 42
// ****/
//GridEvent.prototype.setTdTextColor =function(selectedIndex, colorName){
//	
//	
//}
//
///*******43
// * this function  is used to highlight selected row**
// * ***********/
//GridEvent.prototype.fun_highlightRowBoder =function(selectedIndex, colorName){
//	
//}
//
///*******44
// * this function  is used to highlight selected row**
// * ***********/
//GridEvent.prototype.fun_removeColumnBorderColor =function(selectedIndex, colorName){
//	
//	
//	
//}
//
///*******45
// * this function  is used to highlight selected row**
// * ***********/
//GridEvent.prototype.conditionMerze = function(var_equalCondColumnKey , merzeColumnKeyArr){
//	
//}
//
///**46
// * */
//GridEvent.prototype.updateTotalContainer = function(var_rowdef) {
//	
//	
//}
//
///**47 A
// * This Method For Export the Data in Excel
// * Here self is this mean self and this is same Object
// * */
//GridEvent.prototype.exportGridDataInExcel = function(){
//	
//}
//
///**48 B
// * This Method For Export the Data in Excel
// * Here self is this mean self and this is same Object
// * */
//GridEvent.prototype.exportGridDataInExcelPageWise = function(){}
//
///**48 C
// * This Method For Export the Data in PDF landscape
// * Here self is this mean self and this is same Object
// * */
//GridEvent.prototype.exportGridDataInPDFLandscape = function(){}
//
///**48 D
// * This Method For Export the Data in Excel
// * Here self is this mean self and this is same Object
// * */
//GridEvent.prototype.exportGridDataInPDFPortrait = function(){}
//
///**
// * 49
// * */
//GridEvent.prototype.exportGridData = function(exportMode,typeOfExp,pageOrient){}
//
///**
// * 50
// * For Get Completed Data 
// * 
// * */
//GridEvent.prototype.getAllPageData = function(){}
//
///**
// * 50.1
// * For Get Completed Data 
// * 
// * */
//GridEvent.prototype.getAllPageData_new = function(){
//	
//}
//
//
///**
// *51 Add by girraj 
// **/
//GridEvent.prototype.rowHeightMange = function(){
//	
//}
//
///**
// * 51
// * @parm dataForColor is JSONArray like ( [{index:[1,2,3],colorCode:"#cccc"},{index:[4,5,6],colorCode:"#eeee"}] )
// * *//*
//GridEvent.prototype.mutliColorInRow = function(dataForColor){
//}*/
//
//
///**
// * 52 Method for go to last page 
// * */
//GridEvent.prototype.goLastPageInGrid = function(){}
//

//
///**
// * 54 For Get Cuurent Page
// * */
//GridEvent.prototype.getCurrentPageNo = function(){}
//
///**
// * 55 For Get Cuurent Page
// * */
//GridEvent.prototype.scrollLock = null;
//GridEvent.prototype.manageScroll = function(var_pram){}
//
//
///**
// * 56 For get Row Unique Id for Futhure USe  
// */
//GridEvent.prototype.getSelectedRowGridId = function (){}
//
///**
// * 57 This Method is Called For Selected Row Using Row id 
// * */
//GridEvent.prototype.setRowSelectedUsingRowId  = function(rowid){}
//
//
///**
// * 58 This Method is column add for hide column show hide   
// * */
//
//GridEvent.prototype.hideShowColum = function(){}
//
//
///**
// * 59 This Method is keydown for left, right, up and down   
// * */
//var currentColumn = 0;
//	
//GridEvent.prototype.fun_table = function(e) {}
//
///**
// * 60 This Method is select Data for allWise and PageWise  
// * */
//
//GridEvent.prototype.allPagewiseDataSelect = function(e,getHeaderTable){}
//
///**
// * This function is checked column grouping case is enabled or not if
// * enabled then its return true otherwise it will return false
// */
//GridEvent.prototype.checkColumnArrayForColumnGroupping = function (columnArrayJson){}
//
//
///**
// * get checkbox data from grid according to checkbox start
// */
//GridEvent.prototype.enableCheckboxPageWise = function(){}
//

///**
// * Disabled Enabled Key event
// * */
//GridEvent.prototype.enableKeyBoard = function(flag){}
//	
//
