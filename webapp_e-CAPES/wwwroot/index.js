function webapp_e_CAPES(){
//Get elements

/*search parameters*/
var circuitParameter = document.getElementById("circuit-search-parameter");
var countyParameter = document.getElementById("county-search-parameter");
var courtParameter = document.getElementById("court-search-parameter");
var caseTypeParameter = document.getElementById("case-type-search-parameter");

/*Case Assignment Rule Table*/
var caseAssignmentRuleTable = document.getElementById("case-assignment-rule-table");

/*buttons & check boxes*/
var buttonSearch = document.getElementById("button-search");

var buttonCaseAssignmentRuleUpdate = document.getElementById("case-assignment-rule-update-button");
var buttonCaseAssignmentRuleCanelUpdate = document.getElementById("case-assignment-rule-cancel-update-button");

var buttonCaseAssignmentRuleShowInsertForm = document.getElementById("case-assignment-rule-show-insert-form-button");
//var buttonCaseAssignmentRuleInsert = document.getElementById("case-assignment-rule-insert-button");
var buttonCaseAssignmentRuleInsertCancel = document.getElementById("case-assignment-rule-cancel-insert-button");



//Add event listeners
buttonSearch.addEventListener("click", searchCaseAssignmentRules);

buttonCaseAssignmentRuleUpdate.addEventListener("click", updateCaseAssignmentRule);
buttonCaseAssignmentRuleCanelUpdate.addEventListener("click", resetCaseAssignmentRuleUpdateForm);

buttonCaseAssignmentRuleShowInsertForm.addEventListener("click", showInsertForm);
//buttonCaseAssignmentRuleInsert.addEventListener("click", insertCaseAssignmentRule);
buttonCaseAssignmentRuleInsertCancel.addEventListener("click", insertCaseAssignmentRuleCancel);

//Functions

function searchCaseAssignmentRules() {

    var url = "http://localhost:5296/SearchCaseAssignmentRules?circuitIdSearch=" + circuitParameter.value + "&countyIdSearch=" + countyParameter.value + "&courtCodeSearch=" + courtParameter.value + "&caseTypeCodeSearch=" + caseTypeParameter.value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = doAfterSearchCaseAssignmentRules;
    xhr.open("GET", url);
    xhr.send(null);

    function doAfterSearchCaseAssignmentRules() {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

                var response = JSON.parse(xhr.responseText); // Case Assignment Rules retrieved in the GET API Response

                if (response.result === "success") {
                    //showSearchResultsMessage(response.caseAssignmentRules);
                    alert(response.message);
                    showCaseAssignmentRules(response.caseAssignmentRules);
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}

function showCaseAssignmentRules(caseAssignmentRules) {
    //TABLE HEADER TEXT DONE
    var caseAssignmentRuleTableHeaderText = "<table class='table table-dark table-striped table-bordered table-sm'><thead><tr><th id='record-selector-header' scope='col' class='select-check-box'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check-square-fill' viewBox='0 0 16 16'><path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z'/></svg></th><th scope='col'>Rule #</th><th scope='col'>Circuit Code</th><th scope='col'>County Id</th><th scope='col'>Court Code</th><th scope='col'>Case Type Code</th><th scope='col'>Assignment Method</th><th scope='col'>Begin Date</th><th scope='col'>End Date</th><th id='update-delete-column-header' scope='col' class='button-column'>Update/Delete</th></tr></thead><tbody>";
    var caseAssignmentRuleTableText = caseAssignmentRuleTableHeaderText;
    
    for (var i = 0; i < caseAssignmentRules.length; i++) {
        var caseAssignmentRule = caseAssignmentRules[i];

        var endDate = (caseAssignmentRule.ruleEndDate === null) ? "" : caseAssignmentRule.ruleEndDate.split('T')[0];
        /*
        console.log(caseAssignmentRule.ruleNumber);
        console.log(caseAssignmentRule.circuitId);
        console.log(caseAssignmentRule.countyId);
        console.log(caseAssignmentRule.courtCode);
        console.log(caseAssignmentRule.caseTypeCode);
        console.log(caseAssignmentRule.assignmentMethod);
        console.log(caseAssignmentRule.ruleBeginDate);
        console.log(caseAssignmentRule.ruleEndDate);
        //*/
        var caseAssignmentRuleTableRowCheckBox ="<tr><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-check-box'><div class='form-check'><input class='form-check-input' type='checkbox' value='' id='rule-num-" + caseAssignmentRule.ruleNumber + "-flexCheckDefault'><label class='form-check-label' for='rule-num-" + caseAssignmentRule.ruleNumber + "-flexCheckDefault'></label></div></td>";
        var caseAssignmentRuleTableRowDataText ="<th scope='row'>" + caseAssignmentRule.ruleNumber + "</th><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-circuit-id'>" + caseAssignmentRule.circuitId + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-county-id'>" + caseAssignmentRule.countyId + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-court-code'>" + caseAssignmentRule.courtCode + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-case-type-code'>" + caseAssignmentRule.caseTypeCode + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-assignment-method'>" + caseAssignmentRule.assignmentMethod + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-begin-date'>" + caseAssignmentRule.ruleBeginDate.split('T')[0] + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-end-date'>" + endDate + "</td>";
        var caseAssignmentRuleTableRowButtons ="<td><div class='row g-2'><div class='col-auto'><button type='button' data-rule-num='" + caseAssignmentRule.ruleNumber + "' class='btn btn-outline-warning btn-sm btn-case-assignment-rule-table-update'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-up-square-fill' viewBox='0 0 16 16'><path d='M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z'/></svg>Update</button></div><div class='col-auto'><button type='button' data-rule-num='" + caseAssignmentRule.ruleNumber + "' class='btn btn-outline-danger btn-sm btn-case-assignment-rule-table-delete'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash3-fill' viewBox='0 0 16 16'><path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z'/></svg>Delete</button>";
        var caseAssignmentRuleTableRowClosingTags = "</div></div></td></tr>";

        var caseAssignmentRuleTableRowText = caseAssignmentRuleTableRowCheckBox + caseAssignmentRuleTableRowDataText + caseAssignmentRuleTableRowButtons + caseAssignmentRuleTableRowClosingTags;
        
        caseAssignmentRuleTableText = caseAssignmentRuleTableText + caseAssignmentRuleTableRowText;
    }

    caseAssignmentRuleTableText = caseAssignmentRuleTableText + "</tbody></table>";

    caseAssignmentRuleTable.innerHTML = caseAssignmentRuleTableText;
    
    //TO-DO Activate Update & Delete buttons
    
    var updateButtons = document.getElementsByClassName("btn-case-assignment-rule-table-update");

    for (let i = 0; i < updateButtons.length; i++) {
        //console.log(i);
        var updateButton = updateButtons[i];
        updateButton.addEventListener("click", handleCaseAssignmentRuleTableUpdateClick);
    }
    /*
    var deleteButtons = document.getElementsByClassName("btn-caseAssignmentRule-table-delete");

    for (var i = 0; i < deleteButtons.length; i++) {
        var deleteButton = deleteButtons[i];
        deleteButton.addEventListener("click", handleEmployeeTableDeleteClick);
    }
    */
}

/* UPDATE FUNCTIONS -- BEGIN*/
function handleCaseAssignmentRuleTableUpdateClick(e) {
    var ruleNumber = e.target.getAttribute("data-rule-num");

    //alert("you want to update employee " + employeeId);

    var rowCircuitId = document.getElementById("rule-num-" + ruleNumber + "-circuit-id");
	var rowCountyId = document.getElementById("rule-num-" + ruleNumber + "-county-id");
	var rowCourtCode = document.getElementById("rule-num-" + ruleNumber + "-court-code");
	var rowCaseTypeCode = document.getElementById("rule-num-" + ruleNumber + "-case-type-code");
	var rowAssignmentMethod = document.getElementById("rule-num-" + ruleNumber + "-assignment-method");
	var rowBegintDate = document.getElementById("rule-num-" + ruleNumber + "-begin-date");
	var rowEndDate = document.getElementById("rule-num-" + ruleNumber + "-end-date");

    /*
    console.log(ruleNumber);
    console.log(rowCircuitId.innerText);
    console.log(rowCountyId.innerText);
    console.log(rowCourtCode.innerText);
    console.log(rowCaseTypeCode.innerText);
    console.log(rowAssignmentMethod.innerText);
    console.log(rowBegintDate.innerText);
    console.log(rowEndDate.innerText);
    //*/
	var textRuleNumber = document.getElementById("text-update-rule-number");
	var textCircuitId = document.getElementById("text-update-circuit-id");
	var textCountyId = document.getElementById("text-update-county-id");
	var textCourtCode = document.getElementById("text-update-court-code");
	var textCaseTypeCode = document.getElementById("text-update-case-type-code");
	var textAssignmentMethod = document.getElementById("text-update-assignment-method");
	var textBeginDate = document.getElementById("text-update-begin-date");
	var textEndDate = document.getElementById("text-update-end-date");
	
    /*
    console.log(textRuleNumber.value);
	console.log(textCircuitId.value);
    console.log(textCountyId);
	console.log(textCourtCode.value);
	console.log(textCaseTypeCode.value);
	console.log(textAssignmentMethod.value);
	console.log(textBeginDate.value);
	console.log(textEndDate.value);
    //*/

	textRuleNumber.value = ruleNumber;
	textCircuitId.value = rowCircuitId.innerText;
	textCountyId.value = rowCountyId.innerText;
	textCourtCode.value = rowCourtCode.innerText;
	textCaseTypeCode.value = rowCaseTypeCode.innerText;
	textAssignmentMethod.value = rowAssignmentMethod.innerText;
	textBeginDate.value = rowBegintDate.innerText;
	textEndDate.value = rowEndDate.innerText;
	
	var caseAssignmentRuleUpdateForm = document.getElementById("case-assignment-rule-update-form");
	caseAssignmentRuleUpdateForm.classList.remove("visually-hidden");
}

function updateCaseAssignmentRule() {

	var textRuleNumber = document.getElementById("text-update-rule-number");
	var textCircuitId = document.getElementById("text-update-circuit-id");
	var textCountyId = document.getElementById("text-update-county-id");
	var textCourtCode = document.getElementById("text-update-court-code");
	var textCaseTypeCode = document.getElementById("text-update-case-type-code");
	var textAssignmentMethod = document.getElementById("text-update-assignment-method");
	var textBeginDate = document.getElementById("text-update-begin-date");
	var textEndDate = document.getElementById("text-update-end-date");
	//var textDateLastModified = "";
	var textModifiedByUserId = "DemoDayUser1";

    if(textEndDate.value != "" && textEndDate.value != null ){
        var endDate = '&ruleEndDate=' + textEndDate.value 
    }
    else{
        var endDate = ""; 
    }

	//var url = "http://localhost:5296/UpdateCaseAssignmentRule?ruleNumber=" + textRuleNumber.value + "&circuitId=" + textCircuitId.value + "&countyId=" + textCountyId.value+ "&courtCode=" + textCourtCode.value + "&caseTypeCode=" + textCaseTypeCode.value + "&assignmentMedthod=" + textAssignmentMethod.value + "&ruleBeginDate=" + textBeginDate.value + "&modifiedByUserId=" +textModifiedByUserId;
    var url = 'http://localhost:5296/UpdateCaseAssignmentRule?ruleNumber=' + textRuleNumber.value + '&circuitId=' + textCircuitId.value + '&countyId=' + textCountyId.value+ '&courtCode=' + textCourtCode.value + '&caseTypeCode=' + textCaseTypeCode.value + '&assignmentMedthod=' + textAssignmentMethod.value + '&ruleBeginDate=' + textBeginDate.value + endDate + '&modifiedByUserId=' +textModifiedByUserId;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = doAfterUpdateCaseAssignmentRule;
	xhr.open("PUT", url);
	xhr.send(null);
	
	 function doAfterUpdateCaseAssignmentRule() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
						alert(response.message);
                        //showCaseAssignmentRules(response.caseAssignmentRules);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        }
		
        resetCaseAssignmentRuleUpdateForm();
		/*
        var caseAssignmentRuleUpdateForm = document.getElementById("case-assignment-rule-update-form");
        caseAssignmentRuleUpdateForm.classList.add("visually-hidden");
		
		textRuleNumber.value = "";
		textCircuitId.value = "";
		textCountyId.value = "";
		textCourtCode.value = "";
		textCaseTypeCode.value = "";
		textAssignmentMethod.value = "";
		textBeginDate.value = "";
		textEndDate.value = "";
        */
		
}

function resetCaseAssignmentRuleUpdateForm(){
	
	var textRuleNumber = document.getElementById("text-update-rule-number");
	var textCircuitId = document.getElementById("text-update-circuit-id");
	var textCountyId = document.getElementById("text-update-county-id");
	var textCourtCode = document.getElementById("text-update-court-code");
	var textCaseTypeCode = document.getElementById("text-update-case-type-code");
	var textAssignmentMethod = document.getElementById("text-update-assignment-method");
	var textBeginDate = document.getElementById("text-update-begin-date");
	var textEndDate = document.getElementById("text-update-end-date");
	
	var caseAssignmentRuleUpdateForm = document.getElementById("case-assignment-rule-update-form");
	caseAssignmentRuleUpdateForm.classList.add("visually-hidden");
	
	textRuleNumber.value = "";
	textCircuitId.value = "";
	textCountyId.value = "";
	textCourtCode.value = "";
	textCaseTypeCode.value = "";
	textAssignmentMethod.value = "";
	textBeginDate.value = "";
	textEndDate.value = "";
}
/* UPDATE FUNCTIONS -- END*/

/* INSERT FUNCTIONS -- BEGIN*/
function showInsertForm() {
    var formInsert = document.getElementById("case-assignment-rule-insert-form");
    formInsert.classList.remove("visually-hidden");
    buttonCaseAssignmentRuleShowInsertForm.classList.add("visually-hidden"); //Hide the Add new rule button when insert bar is visible
    
    var textBeginDate = document.getElementById("text-insert-begin-date");
    textBeginDate.value = getCurrentDate();
}

function insertCaseAssignmentRuleCancel() {
    resetCaseAssignmentRuleInsertForm();
    
    buttonCaseAssignmentRuleShowInsertForm.classList.remove("visually-hidden");
}

function resetCaseAssignmentRuleInsertForm(){
	var textCircuitId = document.getElementById("text-insert-circuit-id");
	var textCountyId = document.getElementById("text-insert-county-id");
	var textCourtCode = document.getElementById("text-insert-court-code");
	var textCaseTypeCode = document.getElementById("text-insert-case-type-code");
	var textAssignmentMethod = document.getElementById("text-insert-assignment-method");
	var textBeginDate = document.getElementById("text-insert-begin-date");
	
	var caseAssignmentRuleInsertForm = document.getElementById("case-assignment-rule-insert-form");
	caseAssignmentRuleInsertForm.classList.add("visually-hidden");
	
	textCircuitId.value = "";
	textCountyId.value = "";
	textCourtCode.value = "";
	textCaseTypeCode.value = "";
	textAssignmentMethod.value = "";
	textBeginDate.value = "";
}
/* UPDATE FUNCTIONS -- END*/

/* MISC FUNCTIONS -- BEGIN  */
function getCurrentDate(){
    const currentDate = new Date();
    
    let year = (currentDate.getFullYear()).toString();
    let month = (currentDate.getMonth()+1).toString();
    let day = (currentDate.getDate()).toString();

    if(month.length === 1){
        month = '0' + month;
    }
    if(day.length === 1){
        day = '0' + day;
    }

    var today = year + '-' + month + '-' + day;
    return today;
}
/* MISC FUNCTIONS -- BEGIN  */




//TO-DO: Used for pagination
/*  
function showSearchResultsMessage(caseAssignmentRules) {

    var searchResultsCount = 0;
    if (caseAssignmentRules.length > 0) {
        searchResultsCount = caseAssignmentRules[0].caseAssignmentRuleCount;
    }

    var pageSize = Number(selectRowsPerPage.value);
    var pageNumber = Number(textPage.value);

    var firstNumber = pageSize * pageNumber - pageSize + 1;
    var secondNumber = firstNumber + pageSize - 1;
    if (secondNumber > searchResultsCount) {
        secondNumber = searchResultsCount;
    }

    pRowsMessage.innerHTML = "Row " + firstNumber + " through " + secondNumber + " of " + searchResultsCount;
}
*/

searchCaseAssignmentRules();

}

webapp_e_CAPES();