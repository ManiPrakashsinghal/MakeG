
function BottomScroll(sagGridObj){
	
	this.sagGridObj = sagGridObj;
	
}

BottomScroll.prototype.ceateScroll = function(){
	
	let thisObj = this;
	
	//plugin for detect scroll or not in element
	(function($) {
	    $.fn.hasScrollBar = function() {
	        return this.get(0).scrollWidth > this.width();
	    }
	})(jQuery);
	
	 //$((this.sagGridObj.gridEle).querySelectorAll("#BottomScrollBar")).show();
 	 var targetForScroll = ((this.sagGridObj.gridEle).querySelectorAll("#centerGrid")[0]);
	if($(targetForScroll).hasScrollBar()){
		       
				let rightWidth = $((this.sagGridObj.gridEle).querySelectorAll("#rightGrid")).width();
			 	let leftWidth = $((this.sagGridObj.gridEle).querySelectorAll("#leftGrid")).width();
			 	
			 	let fullWidth = $((this.sagGridObj.gridEle).querySelectorAll("#verScroll")).width();
			 	
			 	let centerWidth = fullWidth - rightWidth - leftWidth - 17;
			 	

			 	let centerScrollWidth = ((this.sagGridObj.gridEle).querySelectorAll("#centerGrid")[0]).scrollWidth;
			 	
			 	$((this.sagGridObj.gridEle).querySelectorAll(".secondCenterScroll")).width(centerScrollWidth);
			 	
		
			 	$((this.sagGridObj.gridEle).querySelectorAll("#secondLeftScroll")).width(leftWidth);
			 	$((this.sagGridObj.gridEle).querySelectorAll(".gridCenterScroll")).width(centerWidth);
			 	
			 	$((this.sagGridObj.gridEle).querySelectorAll("#secondRightScroll")).width(rightWidth);
			 	
			 	$((this.sagGridObj.gridEle).querySelector("#secondCenterScroll")).scroll(function() {  
			    	 $(targetForScroll).prop("scrollLeft", this.scrollLeft);  
			    	 $((thisObj.sagGridObj.gridEle).querySelectorAll(".center-tbl-header")).prop("scrollLeft", this.scrollLeft);  	 
			    });
			
		}else{
			//$((this.sagGridObj.gridEle).querySelectorAll("#BottomScrollBar")).hide();
		}
}

//manage scroll for searching 
BottomScroll.prototype.manageScroll = function(){
	
	
		 //plugin for detect scroll or not in element
		(function($) {
		    $.fn.hasScrollBar = function() {
		        return this.get(0).scrollWidth > this.width();
		    }
		})(jQuery);
	
		let thisObj = this;
	
		var targetForScroll = ((thisObj.sagGridObj.gridEle).querySelector("#secondCenterScroll"));
		if($(targetForScroll).hasScrollBar()){
			let bottomScroll = targetForScroll.scrollLeft;
			$((this.sagGridObj.gridEle).querySelectorAll("#centerGrid")).prop("scrollLeft", bottomScroll); 
			$((thisObj.sagGridObj.gridEle).querySelectorAll(".center-tbl-header")).prop("scrollLeft", bottomScroll); 
			
			
			$((thisObj.sagGridObj.gridEle).querySelector("#secondCenterScroll")).scroll(function() {  
		    	 $(targetForScroll).prop("scrollLeft", this.scrollLeft);  
		    	 $((thisObj.sagGridObj.gridEle).querySelectorAll(".center-tbl-header")).prop("scrollLeft", this.scrollLeft);  
		    	 $((thisObj.sagGridObj.gridEle).querySelectorAll("#centerGrid")).prop("scrollLeft", this.scrollLeft); 
		    	 targetForScroll.setAttribute("onScrollEvent",true);
		    });
			
		}		
}

// applyScrollOnChange on resize
BottomScroll.prototype.applyScrollOnChange = function(){
	
	 //plugin for detect scroll or not in element
	(function($) {
	    $.fn.hasScrollBar = function() {
	        return this.get(0).scrollWidth > this.width();
	    }
	})(jQuery);
	
	function onScrollEvent(){  
   	 $(targetForScroll).prop("scrollLeft", this.scrollLeft);  
	 $((thisObj.sagGridObj.gridEle).querySelectorAll(".center-tbl-header")).prop("scrollLeft", this.scrollLeft);  
	 $((thisObj.sagGridObj.gridEle).querySelectorAll("#centerGrid")).prop("scrollLeft", this.scrollLeft); 
  }
	
	let thisObj = this;
	var targetForScroll = ((thisObj.sagGridObj.gridEle).querySelector("#secondCenterScroll"));
	 
	if($(targetForScroll).hasScrollBar()){
		if(targetForScroll.getAttribute("onScrollEvent")){
			
		}else{
			targetForScroll.addEventListener("scroll",onScrollEvent);
			targetForScroll.setAttribute("onScrollEvent",true);
		}
	}		
	
}




