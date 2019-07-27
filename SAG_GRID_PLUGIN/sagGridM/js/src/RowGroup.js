function RowGroup(sagGridObj){
    this.sagGridObj = sagGridObj;
}

RowGroup.prototype.getGroupData = function(){
	  
	let data = this.sagGridObj.rowData;
	let grpArray = ["statusname","gstnDty"];
	let rowData = this.groupByMultiple(data, grpArray);
	console.log(rowData);
	
}

RowGroup.prototype.groupByMultiple = function(obj, values, context){
	  
	if (!values.length)
		return obj;
	var byFirst = _.groupBy(obj, values[0], context),
		rest = values.slice(1);
	for (var prop in byFirst) {
		byFirst[prop] = this.groupByMultiple(byFirst[prop], rest, context);
	}
	return byFirst;
}

RowGroup.prototype.addValToIndexArr = function(arr,obj){
	arr.splice(1, 0,obj);
	return arr;
}



