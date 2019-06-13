
	function GridHeader(sagGridObj){
        
        this.sagGridObj = sagGridObj;
		this.colData = sagGridObj.colData;
        this.colLen = sagGridObj.colLen;
        this.frezzManagerFlag  = sagGridObj.frezzManagerFlag;
		this.headerHtml = '';
		this.searchHtml = '';
        this.headerHtmlObj = {};

        this.headerLeft= '';
        this.headerRight = '';
        this.headerCenter = '';

        this.styleLeft = 0;
     

	 }
		
		GridHeader.prototype.getHeaderHtml = function(){
            
            let headerHtmlCenter = '';
            let headerHtmlRight = '';
            let headerHtmlLeft = '';

            let searchHtmlLeft = '';
            let searchHtmlRight =  '';
            let searchHtmlCenter = '';
            
            let totalFooterLeft = '';
            let totalFooterRight = '';
            let totalFooterCenter = '';
            
            let leftStyleL = 0;
            let leftStyleR = 0;
            let leftStyleC = 0;

			for(let i=0;i<this.colLen;i++){



                let field = this.colData[i].field;
                 let styleWidth = this.colData[i].width; 
                if(this.sagGridObj.frezzManager.hasOwnProperty(field)){
                    let val = this.sagGridObj.frezzManager[field];
                    if(val =='left'){
                        headerHtmlLeft += this.createHeader(i,leftStyleL,"left");
                        searchHtmlLeft += this.createHeaderSearch(i,leftStyleL);
                        
                        totalFooterLeft += this.createTotalFooter(i,leftStyleL,"left");
         
                         leftStyleL +=  Number(styleWidth.replace("px", ""));
                         this.sagGridObj.leftTableWidth = leftStyleL;
                    }else if(val == 'right'){
                          headerHtmlRight += this.createHeader(i,leftStyleR,"right");
                          searchHtmlRight += this.createHeaderSearch(i,leftStyleR);
                          
                          totalFooterRight += this.createTotalFooter(i,leftStyleR,"right");
                          
                           leftStyleR +=  Number(styleWidth.replace("px", ""));
                            this.sagGridObj.rightTableWidth = leftStyleR;
                    }else{
                        headerHtmlCenter += this.createHeader(i,leftStyleC,"center");
                        searchHtmlCenter += this.createHeaderSearch(i,leftStyleC);
                        
                        totalFooterCenter += this.createTotalFooter(i,leftStyleC,"center");
                        
                        leftStyleC +=  Number(styleWidth.replace("px", ""));
                         this.sagGridObj.centerTableWidth = leftStyleC;
                    }
                }else{
                      headerHtmlCenter += this.createHeader(i,leftStyleC,"center");
                      searchHtmlCenter += this.createHeaderSearch(i,leftStyleC);
                      
                      totalFooterCenter += this.createTotalFooter(i,leftStyleC,"center");
                      
                      leftStyleC +=  Number(styleWidth.replace("px", ""));
                       this.sagGridObj.centerTableWidth = leftStyleC;
                }
                 
            }

            let leftHeader = ' <div class="left-tbl-header superParent" parent="left" style ="width:'+this.sagGridObj.leftTableWidth+'px"> '+
                        '<div class="header_div" >'+
                  
                    '<div class="child_header">'+
						'<div class="header_row" >'+headerHtmlLeft+'</div>'+
					'</div>'+
					'<div class="child_header">'+
					    '<div class="header_row">'+searchHtmlLeft+'</div>'+
					'</div>'+
                '</div>'+
                '</div>';

            let rightHeader = '<div class="right-tbl-header superParent" parent="right" style ="width:'+this.sagGridObj.rightTableWidth+'px"> '+
                   ' <div class="header_div">'+
                   ' <div class="child_header">'+
                   ' <div class="header_row" >'+headerHtmlRight+'</div>'+
                   ' </div>'+
                   ' <div class="child_header">'+
                   '  <div class="header_row" >'+searchHtmlRight+'</div>'+
            ' </div>'+
            ' </div>'+
            ' </div>';

                let centerHeader = '<div class="center-tbl-header superParent" parent="center"  style ="width:'+this.sagGridObj.centerTableWidth+'px"> '+
                '<div class="header_div" >'+
                   '<div class="child_header">'+
						'<div class="header_row" >'+headerHtmlCenter+'</div>'+
					'</div>'+
					'<div class="child_header">'+
					   ' <div class="header_row">'+searchHtmlCenter+'</div>'+
					'</div>'+
               ' </div>'+
               ' </div>';
                
           /** 
            * Footer 
            */     
            
            let leftFooter = '<div class="leftTotalFooter left-tbl-header" parent="left" style ="width:'+this.sagGridObj.leftTableWidth+'px">'+
            					'<div class="header_div">'+
                                 ' <div class="child_header">'+
						           ' <div class="header_row">'+  
		                               ' <div class="leftTotalRowFooter footer_cell"> '+totalFooterLeft+'</div>'+
						   		   ' </div>'+
						   		  '</div>'+
						   	   '</div>'+		
				   			'</div>';
   			
            let centerFooter = '<div class="centerTotalFooter center-tbl-header" parent="center" style ="width:'+this.sagGridObj.centerTableWidth+'px">'+
            					  '<div class="header_div">'+
                                    '<div class="child_header">'+
						              '<div class="header_row">  '+          
		                               ' <div class="centerTotalRowFooter footer_cell" >'+totalFooterCenter+'</div>'+
						   				'</div>  '+
						   			'</div>	  '+ 
						   	   ' </div>'+
				   			'</div>';
   			
            let rightFooter = '<div class="rightTotalFooter right-tbl-header" parent="right" style ="width:'+this.sagGridObj.rightTableWidth+'px">'+
                                '<div class="header_div">'+
                                   ' <div class="child_header">'+
						            ' <div class="header_row">'+                    
		                                ' <div class="rightTotalRowFooter footer_cell" >'+totalFooterRight+'</div>'+	
						   			  ' </div> '+
						   			 ' </div>'+
						   			'</div>'+ 
				   			'</div>';
           
            this.headerHtmlObj["center"] = centerHeader;    
            this.headerHtmlObj["left"] =   leftHeader;    
            this.headerHtmlObj["right"] =  rightHeader;
            
            this.headerHtmlObj["centerFooter"] = centerFooter;    
            this.headerHtmlObj["leftFooter"] =   leftFooter;    
            this.headerHtmlObj["rightFooter"] =  rightFooter;
            
			return this.headerHtmlObj;
        }

		
        GridHeader.prototype.createHeader = function(i,styleLeft,pos){
        	
        	let text = "";
        	let field = "";
        	let header ="";
       
        	let sortIcon = '';
        	
        	let colmnData = this.colData[i];
        	let colClass = 'col'+i;
        	
        	
        	 text = colmnData.header;
             field = colmnData.field;
             
             if(text == undefined){
            	 text = "";
             }
             
             if(colmnData.hasOwnProperty("sort")){
            	 if(colmnData.hasOwnProperty("columnType")){
            		 let colType =  colmnData["columnType"];
            		 sortIcon = '<img class="sortIcon" type="sortIcon"  field='+field+' columnType='+colType+' style="height: 25px;" src="sagGridM/images/sort.png">';
            	 }else{
            	   sortIcon = ' <img class="sortIcon" type="sortIcon"  field='+field+' style="height: 25px;" src="sagGridM/images/sort.png">';
            	 }
             }
             
             //enable hide show 
             if(this.sagGridObj.enableColHide){
                    this.enableShowHideCol(colmnData,colClass,pos);
             }else{
            	 let ul  = (this.sagGridObj.gridEle).querySelector('#showHideColmn');
            	 ul.style.display = "none";
             }
             
      
        	if(colmnData.hasOwnProperty("colType")){
        		if(colmnData.colType == "checkBox"){
        			   let cls = Property.fontAwsmClass.unChecked;
                       header = '<span class= "fa '+cls+' sag-AllCheckBox  sag-AllCheckboxCls" ></span>';
                    
	                   this.sagGridObj.colIdArray[pos].push(colClass);
	                   let styleWidth = colmnData.width;   // this.styleWidth*(i+1);  
	   				   let headerHtml = '<div class="header_cell '+colClass+' sag_colDrag" colId='+colClass+' colPos='+pos+' colfield='+field+' style="width:'+styleWidth+'; left:'+styleLeft+'px; text-align:center; justify-content: center; ">'+header+'</div>';
	   				   return headerHtml;
        		}else{
        			 header = '<span class="sag_colDrag">'+text+'</span>';
   
	                 this.sagGridObj.colIdArray[pos].push(colClass);
	                 let styleWidth = colmnData.width;   // this.styleWidth*(i+1);  
	   				 let headerHtml = '<div class="header_cell '+colClass+' sag_colDrag" colId='+colClass+' colPos='+pos+' colfield='+field+' style="width:'+styleWidth+'; left:'+styleLeft+'px; text-align:center; justify-content: center; ">'+header+'</div>';
	   				 return headerHtml;
        		}
        	}else{       		  
                   if(field == 'sno'){
                	   header = '<span>'+text+'</span> ';
                	   
	                   this.sagGridObj.colIdArray[pos].push(colClass);
	                   let styleWidth = colmnData.width;   // this.styleWidth*(i+1);  
	   				   let headerHtml = '<div class="header_cell '+colClass+' sag_colDrag" colId='+colClass+' colPos='+pos+' colfield='+field+' style="width:'+styleWidth+'; left:'+styleLeft+'px; text-align:center; justify-content: center; ">'+header+'</div>';
	   				   return headerHtml;
	   				   
                   }else if(field == 'checkbox'){
                	   header = '<span>'+text+'</span>';
                
	                   this.sagGridObj.colIdArray[pos].push(colClass);
	                   let styleWidth = colmnData.width;   // this.styleWidth*(i+1);  
	   				   let headerHtml = '<div class="header_cell '+colClass+' sag_colDrag" colId='+colClass+' colPos='+pos+' colfield='+field+' style="width:'+styleWidth+'; left:'+styleLeft+'px; text-align:center; justify-content: center; ">'+header+'</div>';
	   				   return headerHtml;
	   				   
                   }else{       
	                   header = sortIcon+'<span class="sml_header_text" >'+text+'</span> <span field='+field+' class="float-right sagGridFilter filterDropdown"><i class="fa fa-align-justify"></i></span> <span class="float-right sagGridResize"><i class="fa fa-arrows-v"></i></span> ';
	                   let colClass = 'col'+i; 
	                   this.sagGridObj.colIdArray[pos].push(colClass);
	                   let styleWidth = colmnData.width;   // this.styleWidth*(i+1);  
	   				   let headerHtml = '<div class="header_cell '+colClass+' sag_colDrag" colId='+colClass+' colPos='+pos+' colfield='+field+' style="width:'+styleWidth+'; left:'+styleLeft+'px; text-align:center; ">'+header+'</div>';
	   				   return headerHtml;
                   }
        	}
       
             /*   let colClass = 'col'+i; 
                this.sagGridObj.colIdArray[pos].push(colClass);
                let styleWidth = colmnData.width;   // this.styleWidth*(i+1);  
				let headerHtml = `<div class="header_cell ${colClass} sag_colDrag" colId=${colClass} colPos=${pos} colfield=${field} style="width:${styleWidth}; left:${styleLeft}px; text-align:center; ">${header}</div>`;
				return headerHtml;*/
                	
        }

        GridHeader.prototype.createHeaderSearch = function(i,styleLeft){

        	   field = this.colData[i].field;
        
                let colClass = 'col'+i; 
                let styleWidth = this.colData[i].width
                var obj = this.colData[i];
                let el= document.createElement("div");
                var para = document.createElement("div");
                para.classList.add('header_cell');
                para.classList.add(colClass);
                para.setAttribute('colId', colClass);
                para.style.width = styleWidth;
                para.style.left = styleLeft+'px';
              
                
                if(this.colData[i].search == true){
					var searchInput = document.createElement("INPUT");
					searchInput.setAttribute("type", "text");
	                searchInput.setAttribute("field",obj.field);
	                para.appendChild(searchInput);	
                }
             
                el.appendChild(para);	
                return el.innerHTML;
        }

        
        
        
        GridHeader.prototype.createHeaderFilterDiv= function(){
        	
        	
      	  var dropdownMenuDiv = document.createElement('div');  
      	      dropdownMenuDiv.className = 'dropdown-menu dropdoenMenu p-2 ';
      	  var dropdownMenuDivInput = document.createElement('input');
		    	  dropdownMenuDivInput.className = 'form-control mb-1 popup-filetr-search';
		    	  dropdownMenuDivInput.id = 'myInput';
		    	  dropdownMenuDivInput.type = 'text';
		    	  dropdownMenuDivInput.placeholder = 'Search..';
      	  var dropdownMenuDivSelect = document.createElement('select');
		    	  dropdownMenuDivSelect.className = 'form-control mb-1 selectFilter';
		    	  dropdownMenuDivSelect.id = 'selectFilter';
		    	  dropdownMenuDiv.appendChild(dropdownMenuDivSelect);
		      var option1 = document.createElement("option");
		      var option2 = document.createElement("option");
		      var option3 = document.createElement("option");
		      var option4 = document.createElement("option");
		      var option5 = document.createElement("option");
		    	  option1.text = 'StartWith'; 		    
		    	  option2.text = 'EndWith'; 
		    	  option3.text = 'Contains'; 
		    	  option4.text = 'Equals'; 
		    	  option5.text = 'NotEquals'; 
		     	  option1.value = 'StartWith'; 
		    	  option2.value = 'EndWith'; 
		    	  option3.value = 'Contains'; 
		    	  option4.value = 'Equals'; 
		    	  option5.value = 'NotEquals';
      	      dropdownMenuDivSelect.appendChild(option1);
      	      dropdownMenuDivSelect.appendChild(option2);
      	      dropdownMenuDivSelect.appendChild(option3);
      	      dropdownMenuDivSelect.appendChild(option4);
      	      dropdownMenuDivSelect.appendChild(option5);
         	  var divTabLList = document.createElement('div');
             	  divTabLList.className = 'tabLList';
             	 divTabLList.id = 'tabLList';
      	  var blockDiv = document.createElement('div');
      	      blockDiv.className = 'blockDiv';
      	  var floatLeftDiv = document.createElement('div');
      	      floatLeftDiv.className = 'pull-left';      	  
      	  var formCheckDiv = document.createElement('div');
      	      formCheckDiv.className = 'form-check';
      	  var formCheckInput = document.createElement('input');
	        	  formCheckInput.className = 'form-check-input allCheckbox checked_all';
	        	  formCheckInput.id = 'checkAll';
	        	  formCheckInput.name = 'checkme[]';
	        	  formCheckInput.value = 'option1';
	        	  formCheckInput.setAttribute("checked",'true');	  
	        	  formCheckInput.type = 'checkbox';
      	  var formCheckLable = document.createElement('label');
	        	  formCheckLable.className = 'form-check-label';
	        	  formCheckLable.setAttribute("for",'exampleRadios1');	        
	        	  formCheckLable.innerHTML  = 'ALL';
	        	  formCheckDiv.appendChild(formCheckInput);
	        	  formCheckDiv.appendChild(formCheckLable);
	        	  floatLeftDiv.appendChild(formCheckDiv);
	        	  blockDiv.appendChild(floatLeftDiv);
      	  var floatRightDiv = document.createElement('div');
      	      floatRightDiv.className = 'pull-right';
      	  var floatRightButtonOk = document.createElement('button');
	        	  floatRightButtonOk.className = 'btn btn-primary sagGridFilter btnFilter mr-1';
	        	  floatRightButtonOk.innerHTML  = 'OK';
	        	  floatRightDiv.appendChild(floatRightButtonOk);
      	  var floatRightButtonCancel = document.createElement('button');
	        	  floatRightButtonCancel.className = 'btn btn-danger sagGridFilter';
	        	  floatRightButtonCancel.innerHTML  = 'Cancel';
	        	  floatRightDiv.appendChild(floatRightButtonCancel);
	        	  blockDiv.appendChild(floatRightDiv);
	        	  dropdownMenuDiv.appendChild(dropdownMenuDivInput);
	          	  dropdownMenuDiv.appendChild(dropdownMenuDivSelect);
	          	  dropdownMenuDiv.appendChild(divTabLList);
	              dropdownMenuDiv.appendChild(blockDiv);	   

      	  $(".main").append(dropdownMenuDiv);
      }
        

        GridHeader.prototype.createTotalFooter = function(i,styleLeft,pos){
	        	
	        	let text = "";
	        	let field = "";
	        	let footer ="";
	        	
	        	if (this.colData[i].hasOwnProperty("colType")) {
	        		if(this.colData[i].colType == "checkBox"){
	                       footer =  ""; //`<span> Total C </span>`;
	        		}
	        	}else{
	        		   text = this.colData[i].header;
	                   field = this.colData[i].field;	                   
	                 
	                   footer =  "";  //`${text}`;               
	        	}
	       
	                let colClass = 'col'+i; 
	                let styleWidth = this.colData[i].width;  
	                let footerHtml = '<div class="totalField '+colClass+'" sag_g_key='+field+' colId='+colClass+' colPos='+pos+' style="width:'+styleWidth+'; left:'+styleLeft+'px" >'+footer+'</div>';
					return footerHtml;
	        }
        
        GridHeader.prototype.enableShowHideCol = function(colmnData,colClass,pos){
        	
        	 let field = colmnData.header;
        	
        	 let self = this;
        	 let ul  = (self.sagGridObj.gridEle).querySelector('#showHideColUl');
        	 
        	 let hideShowObj = self.sagGridObj.hideShowCol;
        	 
        	
        	 let li = document.createElement('li');
        	 let aTag = document.createElement('a')
        	 aTag.classList.add("small");
        	 let checkbox = document.createElement('input'); 
        	 checkbox.type = "checkbox"; 
        	 checkbox.checked = true;
        	 checkbox.setAttribute("colClass",colClass);
        	 checkbox.setAttribute("colPos",pos);
        	 
        	 checkbox.addEventListener("click", function(){
        		 hideShowObj.hideShowFn(this,colmnData);
        	 });
        	 
        	 let textNode = document.createTextNode(field);
        	 
        	 aTag.appendChild(checkbox);
        	 aTag.appendChild(textNode);
        	 li.appendChild(aTag);
        	 ul.appendChild(li);
        	
        }


