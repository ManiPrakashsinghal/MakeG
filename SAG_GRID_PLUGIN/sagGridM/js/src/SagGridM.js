//class for start grid 
//class SagGrid{
function SagGridMP(sourceDiv,gridData, compile, scope){
	// detect container height
	 var totalHeight = headerHeight = pageHeaderHeaight = pageHeaderHeaight =  bottomLineHeight  =  sagButtonLine  =  tableGridHeaderFirst =  tableGridHeaderSecond  = footerGridHeight = tableGridTotalHeight = calculateHeight = sagFieldSecHeight =  sagtabsSectionNav = sagtabsSection2Nav = null;
	 totalHeight = $(window).outerHeight(true);
	 var outerHeight = 0;
	 headerHeight = $('.site-header').outerHeight();
	 pageHeaderHeaight = $('.page-content-header').outerHeight();
	 sagFieldSecHeight = $('.sagFieldSec').outerHeight();
	 sagtabsSectionNav = $('.tabs-section-nav').outerHeight();
	 sagtabsSection2Nav = $('.tabs-section-nav-2').outerHeight();
	 bottomLineHeight = $('.bottomline').outerHeight();
	 sagButtonLine = $('.sagbootom-Line').outerHeight();
	 outerHeight = headerHeight + pageHeaderHeaight + sagFieldSecHeight + sagtabsSectionNav + bottomLineHeight + sagButtonLine + sagtabsSection2Nav;

	 calculateHeight = totalHeight - outerHeight ;
	 $(sourceDiv).parents(".masterdiv").height(calculateHeight); 
// end detect container height
	 
	 //generating grid
	let obj  = new SagGridM(sourceDiv,gridData, compile, scope);
	 obj.getSagGrid(function(res){
		stopLoader();
		//GridNavigation();
     });

	 return obj.gridEventObj;
	 //end generating grid	 
	
	
}


  
	// creating grid
  function SagGridM(sourceDiv,gridData, compile, scope){
    

	    this.sourceDivId = null;
        this.gridRowObj;
        
        this.compile = compile;
        this.scope = scope;
        
        let self = this;

        //for determine in freezing  And TotalColumn 
        this.totalFooterCol = {};
        this.originalColData = gridData.columnDef.map(function(x,index) {
			 x["sagColClass"]="col"+index;
			 //Save entry for total
			 if(x.hasOwnProperty("field")){
				 if(x.columnType == 'numeric'){
					 self.totalFooterCol[x.field] = 0;
				 }
			 }
			 //check if width not exist apply 50px default width 
			 if(!x.hasOwnProperty("width")){
				 x["width"]= '50px';
			 }	
			 return x;
		}); 
        
        //for row span
        
        this.rowSpan = false;
		this.inDomRowSpanIndex = [];
		this.rowSpanObj = {};
		this.conditionMerzemanager = {};
		if(gridData.hasOwnProperty("conditionMerzemanager")){
			this.rowSpan = true;
			this.conditionMerzemanager = gridData.conditionMerzemanager;
		}
        this.rowObjSpanVal = null;
        this.rowObjSpanIndex = null;
        this.rowObjSpanIndexWidth = {};
        this.snoIndex = 0;
        this.rowSpanCol = null;
        if(self.rowSpan){
        	this.rowSpanCol = self.conditionMerzemanager["conditionColumn"];
        }
        
        let tempAllChecked= [];
        this.originalRowData = gridData.rowDef.map(function(x,index) {
			 x["sag_G_Index"]=index;
			 tempAllChecked.push(index);
			 
			 //for row span 
				if(self.rowSpan){
					if(x[self.rowSpanCol] == self.rowObjSpanVal){
							if(self.rowObjSpanIndexWidth.hasOwnProperty(self.rowObjSpanIndex)){
								self.rowObjSpanIndexWidth[self.rowObjSpanIndex] = {"height":self.rowObjSpanIndexWidth[self.rowObjSpanIndex]["height"] + 1};
							}else{
								self.rowObjSpanIndexWidth[self.rowObjSpanIndex] = {"height":2};
							} 
							
							if(self.rowObjSpanIndex != null){
								self.rowObjSpanIndexWidth[self.rowObjSpanIndex]["index"] = self.snoIndex;
							}
							
					}else{
						self.snoIndex = self.snoIndex +1 ;
						self.rowObjSpanVal = x[self.rowSpanCol];
						self.rowObjSpanIndex = index;
					}
				}
			
			 return x;
		});      
        
        this.AllRowIndex = Array.from(tempAllChecked);
        

       // this.originalColData = gridData.columnDef;

		this.rowData =   this.originalRowData;
		//this.rowData =   this.originalRowData.splice(1,20);
		
        this.colData =  this.originalColData;  //gridData.columnDef;
        
        
 
        this.rowLen = this.rowData.length;
        this.colLen = this.colData.length;
        this.gridEle = sourceDiv;
        this.tableBody = null;
        this.tableBodyLeft = null;
        this.tableBodyRight= null;
        this.tableBodyCenter = null;

        this.OneRowHeight = 20;
        this.totalRowShow = 0;
        
        this.leftTableWidth = 0;
        this.rightTableWidth = 0;
        this.centerTableWidth = 0;

        this.gridHeight = 0;

        //help for drag and drop column
        this.colIdArray = {"left":[],"right":[],"center":[]};
        
        //row index contain which row is in grid div
        this.gridRowIndexArray = [];
        
        //this use for contain all checked data index 
        this.checkedRowIdArray = [];
        
        //used to create column element after click in column
        this.columnElementObj = {};
 
        //event Array
        this.EventListner = [];

        //frezzeManager 
        this.frezzManagerFlag = false;
        this.frezzManager = {};
        
        /**FOR MOBILE **/
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        
        if(!this.isMobile && gridData.hasOwnProperty("frezzManager")){
        	
        	//change freegManager according to also header heading 
        	
        	let obj = gridData.frezzManager;
        	for (var key in obj) {
        		
        		for(let cd = 0;cd<this.colData.length;cd++){
        			let cdObj = this.colData[cd];
        			if(cdObj["header"] == key || cdObj["field"] == key){
        				this.frezzManager[key] = obj[key];
        			}
        		}
        	}    	
        	//if all key direct in field
            //this.frezzManager = gridData.frezzManager;
            this.frezzManagerFlag = true;
        }
        
        //CallBack methods 
        this.callBack = {};
        if(gridData.hasOwnProperty("callBack")){
        	this.callBack = gridData.callBack;
        }
        

        //Export
        this.gridExportObj = new GridExport(this);
        if(gridData.hasOwnProperty("gridExportService")){
            this.ExcelExportService = gridData.gridExportService;
        }
        if(gridData.hasOwnProperty("sheatDetails")){
            this.sheatDetails = gridData.sheatDetails;
        }
        
        if(gridData.hasOwnProperty("sheatDetailsfun")){
            this.sheatDetailsfun = gridData.sheatDetailsfun;
        }
        
        this.components = {};
        if(gridData.hasOwnProperty("components")){
            this.components = gridData.components;
        }
        
        this.enableColHide = false;
        if(gridData.hasOwnProperty("enableColHide")){
            this.enableColHide = gridData.enableColHide;
        }
        
        this.showTotal = false;
        this.columnTotal = null;
        if(gridData.hasOwnProperty("showTotal")){
            this.showTotal = gridData.showTotal;
            
            if(gridData.hasOwnProperty("columnTotal")){
            	this.columnTotal = gridData.columnTotal;
            }
        }
        
        //Apply property in single row like color 
        this.setRowPropertyObj = {};
        
        //Apply color property in multiple row 
        //syntex [{"colorCode":"","index":[]},{"colorCode":"","index":[]}]
        this.mutliColorInRow = [];
        if(gridData.hasOwnProperty("mutliColorInRow")){
        	this.mutliColorInRow = gridData.mutliColorInRow;
        	for(let mClr=0;mClr<this.mutliColorInRow.length;mClr++){
        		let clrCode = this.mutliColorInRow[mClr].colorCode;
        		let indexArr = this.mutliColorInRow[mClr].index;
        		for(let rI=0;rI < indexArr.length;rI++){
        			let rIndex = indexArr[rI];
        			this.setRowPropertyObj[rIndex] = {"backgroundColor":clrCode};
        		}
        	}
        	
        }
        
        
        //object 
        this.scrollObj = new Scroll(this);
        this.generalEvntObj = new GeneralEvent(this);
        this.gridEventObj = new GridEvent(this);
        this.bottomScrollObj = new BottomScroll(this);
        this.hideShowCol = new HideShowCol(this);
        this.sagGridEvent = new  SagGridEvent(this);        
        // this.rowGroupObj = new RowGroup(this);
 
	}
	// end creating grid
	

	SagGridM.prototype.resetGridData = function(){
		
		let self= this;
		 let tempAllChecked= [];
        this.originalRowData = this.originalRowData.map(function(x,index) {
			 x["sag_G_Index"]=index;
			 tempAllChecked.push(index);
			 return x;
		});      
        
        this.AllRowIndex = Array.from(tempAllChecked);
		this.rowData =   this.originalRowData;
		this.rowLen = this.rowData.length;
		
		//refresh total row
		let totalNoOfReocord = (this.gridEle).querySelectorAll('#totalNoOfRecord')[0];
        totalNoOfReocord.textContent = 'No. of Records: '+this.originalRowData.length;		
		
		this.scrollObj = new Scroll(this);
        this.generalEvntObj = new GeneralEvent(this);
        //this.gridEventObj = new GridEvent(this);
        this.bottomScrollObj = new BottomScroll(this);
        this.hideShowCol = new HideShowCol(this);
        this.sagGridEvent = new  SagGridEvent(this); 
		
		
	}
	
	
  SagGridM.prototype.getSagGrid = function(callBack){

	  	
            //set length again in when grid data change in search 
           this.rowLen = this.rowData.length;
   		   var self = this;
         
           this.gridRowObj = new GridRow(this);
           
		   this.gridHtml = '<div class="main">'+
                                            '<div class="sag_grid">'+

                                                //<!--Header Drag Div  start -->
                                                    '<div class="drag-div rowGroupDrop"  style="display:none;"></div>'+
                                                //<!--Header Drag Div End-->


                                          '  <div id="slm_tableMain" class="table_main">'+
                                            ' <div class="sml_headBody">  '+
                                            '	<div class="sml_innerHeadBody">'+
                                                //<!-- Header start -->
                                                 '   <div id="gridHeader" class="header_Blk">'+
   
                                               '     </div>'+
                                                  //<!-- Header End -->  
                                            
                                                //<!--main Tbody table Start -->	
                                               ' <div id="verScroll" class="mainDivTbody" >'+
                                                    
                                                  '  <div class="mainDivTbodySecond gridTHeight" style = "height:'+this.gridHeight+'px">'+
                                        
										                    //<!--main parent div left table -->
										                       ' <div id="leftGrid" class="parent_main left-tbl gridTHeight"  parent="left" style = "height:'+this.gridHeight+'px; width:'+this.leftTableWidth+'px">   '+                 
										                         '   <div id="sag_grid_table_mainL"  class="sag_grid_table_main" >'+
										                             '   <div class="first_grid_tbody">'+
										                                '   <div class="table_body gridTHeight" style = "height:'+this.gridHeight+'px">'+
										                                                
										                                  '  </div>'+
										                              '  </div>'+
										                        '    </div>'+
										                      '  </div>'+
										                  // <!--main parent div end left table-->  
										                                
										                    //<!--main parent div start center table-->
										                      '  <div id="centerGrid"  class="parent_main center-tbl gridTHeight" parent="center" style = "height:'+this.gridHeight+'px;  width:${this.centerTableWidth}px"">  '+                   
										                          '  <div id="sag_grid_table_mainC" class="sag_grid_table_main" >'+
										                            '    <div class="first_grid_tbody">'+
										                             '   <div class="table_body gridTHeight"  style = "height:'+this.gridHeight+'px">'+
										                                
										                                '    </div>'+
										                               ' </div>'+
										                          '  </div>'+
										                      '  </div>'+
										                    // <!--main parent div end center table -->
										
										                   // <!--main parent div start right table-->
										                      '  <div id="rightGrid" class="parent_main right-tbl gridTHeight" parent="right" style = "height:'+this.gridHeight+'px; width:'+this.rightTableWidth+'px">'+
										                        '  <div id="sag_grid_table_mainR"  class="sag_grid_table_main" >'+
										                        '        <div class="first_grid_tbody">'+
										                        '            <div class="table_body gridTHeight" style = "height:'+this.gridHeight+'px">'+
										                                        
										                        '            </div>'+
										                       '         </div>'+
										                      '      </div>'+
										                     '   </div>'+
										                   // <!--main parent div end right table-->
										                    
										          '   </div>'+
                    
                                             '   </div>'+
                                           '  </div> '+
                                        '  </div>'+
                                                
                                                
                                         //<!-- start Footer -->     
                                           
                                         '  <div class="footerGrid">'+
                                           
                                           		'<div id="totalFooter" class="totalFooter">'+
                                           			
                                           			
                                           	'	</div>'+
                                           		
                                           	'	<div id="BottomScrollBar" class="scrollBar">'+

                                       				'<div id="secondLeftScroll" parent="left" class="gridLeftScroll">'+
                                       				'	<div  class="secondLeftScroll"></div>'+
                                       			'	</div>'+
                                       			
                                       			'	<div  id="secondCenterScroll" class="gridCenterScroll">'+
                                       				'	<div  parent="center"  class="secondCenterScroll"></div>'+
                                       				'</div>'+
                                       			
                                       			'	<div id="secondRightScroll" parent="right" class="gridRightScroll">'+
                                       				'	<div class="secondRightScroll"></div>'+
                                       			'	</div>'+
                                       			
                                           			
                                           		'</div>'+
                                           		
                                           		'<div class="paginationBlk" > '+
                                           			
                                           			'<nav role="navigation"  style="display:none;">'+
	                                           		'	<ul class="cd-pagination animated-buttons custom-icons pull-left">'+
	                                           			'	<li class="button"><a href="#0"><i class="fa fa-arrow-left" aria-hidden="true" alt="right.png"></i></a></li>'+
	                                           			'	<li class="active"><a href="#0">1</a></li>'+
	                                           			'	<li><a href="#0">2</a></li>'+
	                                           			'	<li><a class="current" href="#0">3</a></li>'+
	                                           			'	<li><a href="#0">4</a></li>'+
	                                           			'	<li><span>...</span></li>'+
	                                           			'	<li><a href="#0">7</a> <span id="totalNoOfRecord_none" class="sml_totalRecord_none"> No. of Records </span></li>'+
	                                           			'	<li class="button"><a href="#0"><i class="fa fa-arrow-right" aria-hidden="true" alt="left.png"></i></a></li>'+
	                                           			'</ul>'+
	                                           		'</nav>'+
                                           			
                                           			
                                           		'	<span id="totalNoOfRecord" class="sml_totalRecord pull-left"> No. of Records </span>'+
                                           			
                                           		'	<ul class="pagination pagination-sm m-0" style="display:none;">'+
												'	    <li class="page-item disabled">'+
												'	      <a class="page-link" href="#">&laquo;</a>'+
												'	    </li>'+
												'	    <li class="page-item active">'+
												'	      <a class="page-link" href="#">1</a>'+
												'	    </li>'+
												'	    <li class="page-item">'+
												'	      <a class="page-link" href="#">2</a>'+
												'	    </li>'+
												'	    <li class="page-item">'+
												'	      <a class="page-link" href="#">3</a>'+
												'	    </li>'+
												'	    <li class="page-item">'+
												'	      <a class="page-link" href="#">4</a>'+
												'	    </li>'+
												'	    <li class="page-item">'+
												'	      <a class="page-link" href="#">5</a>'+
												'	    </li>'+
												'	    <li class="page-item">'+
												'	      <a class="page-link" href="#">&raquo;</a>'+
												'	    </li>'+
												'	  </ul>'+
													  	  
											'	<div class="pull-right" style="display: flex; flex-direction: row;">'+
													  
											'		 <div id="showHideColmn" class="button-group dropup multiDropDown" style="margin-right: 5px">'+
											'		    <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown"><i class="fa fa-arrow-up" aria-hidden="true"></i> <span>Columns</span></button>'+
											'			<ul id="showHideColUl" class="dropdown-menu">'+
														 									
											'			</ul>	'+
											'		  </div>'+
													  
											'		  <div class="btn-group btn-group-toggle pull-right" data-toggle="buttons">'+
													  
											'			  <label class="btn btn-outline-primary btn-sm mr-1 allPageExport" export-type="exportBtnPage">'+
											'			    <i title="All Page Export" class="fa fa-file-excel-o" aria-hidden="true"></i>'+
											'			  </label>'+
											'			   <label class="btn btn-outline-primary btn-sm mr-1 allPageExport" export-type="exportBtnAll">'+
											'			    <i title="All Page Export" class="fa fa-file-excel-o" aria-hidden="true"></i>'+
											'			  </label>'+
											'			  <label class="btn btn-outline-primary btn-sm mr-1 allPageExport" export-type="exportBtnForPDFPortrait">'+
											'			   <i title="PDF Portrait" class="fa fa-file-pdf-o" aria-hidden="true" style="color:red"></i>'+
											'			  </label>'+
											'			  <label class="btn btn-outline-primary btn-sm mr-1 allPageExport" export-type="exportBtnForPDFLandscape">'+
											'			   <i title="PDF Landscape" class="fa fa-file-pdf-o" aria-hidden="true" style="transform: rotate(90deg);color:red"></i>'+
											'			  </label>'+
														  
														 
											'			  <label class="btn btn-outline-primary btn-sm mr-1">'+
											'			   <i class="fa fa-eye-slash" aria-hidden="true"></i>'+
											'			  </label>'+
											'			  <label id="sml_expandGrid" class="btn btn-outline-primary btn-sm addExpandClick">'+
											'			   <i class="fa fa-expand" aria-hidden="true"></i>'+
											'			  </label>'+
														  
														
											'			</div>'+
											'		</div>  '+
                                           	'	</div>   '+             		
                                           '</div>   '+  
                                          
                                           // <!-- End Footer -->            
                                                
                                             //       <!--main Tbody table END -->	
                                            '</div>'+
                                            '</div>'+
                                        '</div>';
           
                                
                let dom = GeneralEvent.createElementFromHTML(this.gridHtml);       
               // console.log(dom);

               //self.gridEle = document.getElementById(self.sourceDivId);
                self.gridEle.innerHTML = '';
                self.gridEle.appendChild(dom);
                
                self.createGridHeader();
                self.createGridBody();
                
                this.bottomScrollObj.ceateScroll();  
                
                
              /**Because compile only row for grid using addGridRowDom function 
                
                 if(self.compile != null && self.scope != null){
                	 self.compile(self.gridEle)(self.scope);    
                }
              **/  
                

                callBack(true);
                //return this.gridHtml;  
                
          	  /**FOR MOBILE **/
          		if (this.isMobile) {
          			let centerWidth = (this.gridEle).querySelectorAll("div.center-tbl-header.superParent")[0].scrollWidth;
          			(this.gridEle).querySelectorAll(".sml_innerHeadBody")[0].style.width = centerWidth+"px";
          		}
          	  
               
   }
  
  //REmoved
  SagGridM.prototype.createColElement = function(){
	  
	  
	  for(let i=0;i<this.colData.length;i++){
		  let obj = this.colData[i];
		  if (obj.hasOwnProperty("element")) {
			  this.columnElementObj[obj.field] = obj.element;
		  }
	  }
  }
  
  
  
  SagGridM.prototype.addGridRowDom = function(gridRowHtmlTest){
	
	  if(gridRowHtmlTest.center != ''){
		  let center = gridRowHtmlTest.center;
		//  if(this.compile != null && this.scope != null)
		  //center = this.compile(GeneralEvent.createElementFromHTML(center))(this.scope);
		  $((this.gridEle).querySelectorAll('#centerGrid .sag_grid_table_main .table_body')).append(center); //querySelectorAll('#leftGrid .sag_grid_table_main .table_body');
	  }
	  
	  if(gridRowHtmlTest.right != ''){
		  let right = gridRowHtmlTest.right;
		  //if(this.compile != null && this.scope != null)
		  //right = this.compile(GeneralEvent.createElementFromHTML(right))(this.scope);
		  $((this.gridEle).querySelectorAll('#rightGrid .sag_grid_table_main .table_body')).append(right);  //.querySelectorAll('#rightGrid .sag_grid_table_main .table_body')
	  }
	  
	  if(gridRowHtmlTest.left != ''){
		  let left =  gridRowHtmlTest.left;
		 // if(this.compile != null && this.scope != null)
		  //left =  this.compile(GeneralEvent.createElementFromHTML(gridRowHtmlTest.left))(this.scope);
		  $((this.gridEle).querySelectorAll('#leftGrid .sag_grid_table_main .table_body')).append(left);  //(this.sagGridObj.gridEle).querySelectorAll('#leftGrid .sag_grid_table_main .table_body')
	  }
	  
	 // let sagGridEvent = new  SagGridEvent(this);
     // sagGridEvent.addCellClick();
	  
	  let sagGridEvent = new  SagGridEvent(this);
      sagGridEvent.addClickListner();
    //  sagGridEvent.createRowSnapping();
	 
  }
  
  
  SagGridM.prototype.createGridHeader = function(){
	  

     let HeaderEle = (this.gridEle).querySelectorAll('#gridHeader')[0];
     let gridHeaderObj = new GridHeader(this);  
	 let gridHeaderHtml =   gridHeaderObj.getHeaderHtml(); 
	                        gridHeaderObj.createHeaderFilterDiv();

	 
		  
        let htmlText = ''+gridHeaderHtml.left+gridHeaderHtml.center+gridHeaderHtml.right+'';
       // let dom = GeneralEvent.createElementFromHTML(htmlText); 
        HeaderEle.innerHTML = htmlText;      
       // HeaderEle.appendChild(dom);
        
        let totalFooterEle = (this.gridEle).querySelectorAll('#totalFooter')[0];  
        let totalFooterText = ''+gridHeaderHtml.leftFooter+gridHeaderHtml.centerFooter+gridHeaderHtml.rightFooter+'';
        totalFooterEle.innerHTML = totalFooterText;   
        
        let totalNoOfReocord = (this.gridEle).querySelectorAll('#totalNoOfRecord')[0];
        totalNoOfReocord.textContent = 'No. of Records: '+this.originalRowData.length;
        

         //seraching Event 
        let sagGridEvent = new  SagGridEvent(this);
        sagGridEvent.searchFilter();
        sagGridEvent.addSortListner();
        sagGridEvent.addCheckBoxClick();
        sagGridEvent.addExportClick();
        sagGridEvent.addCellKeyEvent();
        sagGridEvent.headerComponent();
        sagGridEvent.GridExpandClick();
    
        
        let self = this;
        

        
        $(document).ready(function(){		
    		  $(".sagGridFilter").click(function(event){	  
    			$(".dropdoenMenu").toggle();
    		  });
    		  
    		  $(".sagGridFilter").click(function(){  
    			var x = $(this).offset();
    
  			var divWidth = $(".dropdoenMenu").outerWidth();
  			var leftWidth = x.left ;
  			var totalWidth = screen.width;
  			var leftDivWidth = divWidth +  leftWidth;
  				
  				if(totalWidth < leftDivWidth ){
  						let leftShift = leftDivWidth - totalWidth;
  						    leftWidth =  leftWidth - leftShift ;
  						} 	    

  				$(".dropdoenMenu")[0].style.top = x.top +18 +'px';
    			$(".dropdoenMenu")[0].style.left =  leftWidth +'px';
    		  }); 
    		  
    		});

   }

  SagGridM.prototype.createGridBody = function(){
	  
	  		let self = this;
	    	this.scrollObj.scrollToTop();
	    	
	    
            this.gridHeight = this.rowData.length*this.OneRowHeight;
            let verScrollGrid = (this.gridEle).querySelectorAll('#verScroll')[0];
            
            $((this.gridEle).querySelectorAll(".sagRow")).remove();
            this.gridRowIndexArray = [];
            this.inDomRowSpanIndex = [];
            
            let gridHeightEle = (this.gridEle).querySelectorAll('.gridTHeight');
            $(gridHeightEle).css("height",this.gridHeight);
           // gridHeightEle.style.height = this.gridHeight+"px";
            
            let gridleftEle = (this.gridEle).querySelector('#leftGrid');
            gridleftEle.style.width  = this.leftTableWidth+"px";
            
            let gridCenterEle = (this.gridEle).querySelector('#centerGrid');
            gridCenterEle.style.width  = this.centerTableWidth+"px";
            
            let gridRightEle = (this.gridEle).querySelector('#rightGrid');
            gridRightEle.style.width  = this.rightTableWidth+"px";
            
      if(this.rowData.length > 0){        
            let ifAllChecked = true;
            this.rowData.map(function(x,index) {
            	//check for al chekBox is checked or not 
   			    let indexKey = x["sag_G_Index"];
   			    if(!self.checkedRowIdArray.includes(indexKey)){
   			    	ifAllChecked = false;
   			    }  
	   		}); 
      
          if(ifAllChecked){
        	  $((self.gridEle).querySelectorAll(".sag-AllCheckboxCls")).removeClass(Property.fontAwsmClass.unChecked);
        	  $((self.gridEle).querySelectorAll(".sag-AllCheckboxCls")).addClass(Property.fontAwsmClass.checked);
       	 }else{
	       	  $((self.gridEle).querySelectorAll(".sag-AllCheckboxCls")).removeClass(Property.fontAwsmClass.checked);
	       	  $((self.gridEle).querySelectorAll(".sag-AllCheckboxCls")).addClass(Property.fontAwsmClass.unChecked);
       	 }

            this.setEventAfterGridLoad(); 
	  }   
      
      
      this.bottomScrollObj.manageScroll();
  
      let sagGridEvent = new  SagGridEvent(this);
      sagGridEvent.showFooterSum();
      
      //self.rowGroupObj.getGroupData();
      
   }

  SagGridM.prototype.setEventAfterGridLoad = function(){

	        var self=  this;
	        
	        self.tableBodyLeft = (self.gridEle).querySelectorAll('#leftGrid .sag_grid_table_main .table_body');
	        self.tableBodyRight = (self.gridEle).querySelectorAll('#rightGrid .sag_grid_table_main .table_body');
	        self.tableBodyCenter = (self.gridEle).querySelectorAll('#centerGrid .sag_grid_table_main .table_body');
	        self.tableBody = (self.gridEle).querySelectorAll('#verScroll .mainDivTbodySecond');

        	//dragging
            let dragObj = new Dragging(self);    
            dragObj.dragDropCol();   
            
            //Row Grouping Drag
            let rowGrpObj = new RowDragging(self);
            rowGrpObj.dragForGroup();
            
            //Resize
            let resizeObj = new Resize(self);    
            resizeObj.onResize();  
            
            
            //scrolling 
            let scrollObj = new Scroll(self);
           
            let viewHeight = $((self.gridEle).querySelectorAll('#verScroll')).height();
            let totalRowInView = Math.round(viewHeight/this.OneRowHeight);
            
            let startRowLength = totalRowInView+10;
            this.totalRowShow = startRowLength;
            
            if(this.rowData.length < startRowLength){
                startRowLength = this.rowData.length;
            }
            
             
             this.gridRowIndexArray = [];
             
             //if row Grouping add all grouped row in starting
             if(self.rowSpan){
            	 for (let rwGrpI in self.rowObjSpanIndexWidth) {
            		    if (this.rowObjSpanIndexWidth.hasOwnProperty(rwGrpI)) {
            		    	scrollObj.addRowByIndex(rwGrpI);
            		    }
            		}	 
             }

             for(let i=0;i<startRowLength;i++)
	            {
	                scrollObj.addRow();
	            }	
             
          
            scrollObj.addGridScroll();	
     
   }
  
  
  SagGridM.prototype.returnRowData = function(orgArray){
	     //remove extra added key from array 
		  let rowData = orgArray.map(function(x,index) {
				 //delete x.sag_G_Index;
				 return x;
			}); 
		  return rowData;
  }
  
  

