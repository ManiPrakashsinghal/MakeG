function RowDragging(sagGridObj){
        this.sagGridObj = sagGridObj;
        this.grpColArray = [];
        this.groupData = [];
    }


    RowDragging.prototype.dragForGroup = function(){

    	var thisObj = this;
        
    	$((this.sagGridObj.gridEle).querySelectorAll('.rowGroupDrag')).draggable({
        	  revert: "invalid",
        	  stack: ".rowGroupDrag",
        	  helper: 'clone'
        	});
    	$((this.sagGridObj.gridEle).querySelectorAll('.rowGroupDrop')).droppable({
        	  accept: ".rowGroupDrag",
        	  drop: function(event, ui) {
        	    var droppable = $(this);
        	    var draggable = ui.draggable;
        	 
        	    
        	    let colField = draggable[0].getAttribute("colfield");
        	    let headerText = draggable[0].innerText;
        	    
        	    
        	    let prNode = ` <div class="sag-column-drop-list"></div>`;
        	    
        	    let colHtml = ` 
        	    <span class="sag-column-drop-cell">
					              <span class="sag-column-drop-cell-text">${headerText}</span>					             
					            </span>`;
        	    
        	    let crossButton = ` <i class="fa fa-times-circle-o" aria-hidden="true" colField=${colField} ></i>`;
        	    
        	    let arrow = `<i class="fa fa-arrow-right crossIconRowG" aria-hidden="true"></i>`;
        	    
        	    let prNodeEle =  GeneralEvent.createElementFromHTML(prNode);
        	    
        	    let ele = GeneralEvent.createElementFromHTML(colHtml);
        	    let crossButtonEle = GeneralEvent.createElementFromHTML(crossButton); 	
        	    let arrowEle =  GeneralEvent.createElementFromHTML(arrow);
        	    
        	    
        	    ele.append(crossButtonEle);
        	    prNodeEle.append(ele);
        	    prNodeEle.append(arrowEle);
        	    
        	    
        	    
        	    crossButtonEle.addEventListener("click",function(){
        	    	colField = this.getAttribute("colField");
        	    	this.parentElement.parentElement.remove();
        	    	thisObj.onCrossButton(colField);
        	    });
        	    
        	    droppable.append(prNodeEle);
        	  
        	  
        	    thisObj.grpColArray.push(colField);
        	    if(thisObj.grpColArray.length > 0 ){
        	    	thisObj.rowGroupFn();
        	    }
        	 
        	    
        	  }
        	});
       
   
    }
    
    RowDragging.prototype.rowGroupFn = function(){
    
    	let data = this.sagGridObj.originalRowData;
    	let grpArray = this.grpColArray;
    	let rowData = this.groupByMultiple(data, grpArray);
    	this.createGrpGridUi(rowData);
    	
    }
    
    RowDragging.prototype.groupByMultiple = function(obj, values, context){
  	  
		if (!values.length)
			return obj;
		var byFirst = _.groupBy(obj, values[0], context),
			rest = values.slice(1);
		for (var prop in byFirst) {
			byFirst[prop] = this.groupByMultiple(byFirst[prop], rest, context);
		}
		return byFirst;
		
}
    
RowDragging.prototype.onCrossButton = function(colField){
    
		var index = this.grpColArray.indexOf(colField);
		if (index > -1) {
			this.grpColArray.splice(index, 1);
		}
		this.rowGroupFn();
  	
    	
    }



RowDragging.prototype.createGrpGridUi = function(rowData){

		console.log(rowData);
		let dummyObj = Object.assign({},this.sagGridObj.rowData[0]);
		
		let newObj = {};
		for (var key in dummyObj) {
			newObj[key] = ""; 
		}
		newObj["sag_G_Index"] = -1;
		
		let rowArray = [];
		if(Array.isArray(rowData)){
			rowArray = rowData;
		}else{
			for(var keyIn in rowData) {
				newObj.sag_G_Index = newObj.sag_G_Index - 1;
				newObj.RowGroupingText = keyIn;
				rowArray.push(Object.assign({},newObj));
			}
		}
		
		this.sagGridObj.rowData = Array.from(rowArray);
		this.sagGridObj.createGridBody();

}

    
    
  
    
    
