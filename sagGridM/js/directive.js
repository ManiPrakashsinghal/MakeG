//directive html 
 /*App.directive('sagGrid', function ($compile) {
    var linker = function(scope, element, attrs){
    	let gridObj = new SagGridM(element[0],scope.content);
    	gridObj.getSagGrid();
        $compile(element.contents())(scope);
    };
    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            content:'=content'
        }
    };
});


//calling
$scope.gridData = gridData;
var htm = '<sag-grid content="gridData"></sag-grid>';
var elm = $("#GridSourceDiv").append(htm);
$compile(elm)($scope);


*//**
 * Safe apply to prevent error "$apply is already running " using angular js method
 *//*
$scope.safeApply = function(fn) {
	  var phase = this.$root.$$phase;
	  if(phase == '$apply' || phase == '$digest') {
	    if(fn && (typeof(fn) === 'function')) {
	      fn();
	    }
	  } else {
	    this.$apply(fn);
	  }
};

//calling
$scope.safeApply(function() {
	  alert('Now Im wrapped for protection!');
});

*//**
 * Safe apply to prevent error "$apply is already running" using angularJS directive 
 *  
 *//*

App.factory('safeApply', [function($rootScope) {
    return function($scope, fn) {
        var phase = $scope.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if (fn) {
                $scope.$eval(fn);
            }
        } else {
            if (fn) {
                $scope.$apply(fn);
            } else {
                $scope.$apply();
            }
        }
    }
}]);

//calling
App.controller('MyCtrl', ['$scope,','safeApply', function($scope, safeApply) {
    safeApply($scope);                     // no function passed in
    safeApply($scope, function() {   // passing a function in
    });
}]);*/

 
//DONE WORK 
/**
 * scrolling
 * searching
 * sorting
 * freezing
 * Dragging
 * check box
 * Resizing column
 * Footer Import/Export
 * Filter
 * component
 * total
 * element editable by component
 * IE run 
 **/

//Work on Process
/**
 * 
 */


//Remaining
/**
 * Grouping
 * pagination
 * Resizing Row (particular/All)
 * Auto Resizing
 * Hide/Show column
 * world wrap
 * for multiple grid
 * row Add
 * row delete
 * KeyBoard event
 * total update 
 * row wise total 
 * */
