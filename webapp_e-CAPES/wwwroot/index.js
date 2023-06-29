function webapp_e_CAPES(){
//Get elements

/*search parameters*/
var circuitParameter = document.getElementById("circuit-search-parameter");
var countyParameter = document.getElementById("county-search-parameter");
var courtParameter = document.getElementById("court-search-parameter");
var caseTypeParameter = document.getElementById("case-type-search-parameter");

var rowsPerPage = 10;
var textPage = document.getElementById("text-page");

/*Table Placerholders*/
var caseAssignmentRuleTableDiv = document.getElementById("case-assignment-rule-table-div");
var judgeDistributionAssignmentTableDiv = document.getElementById("judge-distribution-assignment-table-div");
var supremeCourtCaseAssignmentJudgeDistributionFeedbackTableDiv = document.getElementById("sc-case-assignment-judge-distribution-feedback-table-div");

//Buttons
var buttonSearch = document.getElementById("button-search");

/* Case Assignment Rules */
var buttonCaseAssignmentRuleShowInsertForm = document.getElementById("case-assignment-rule-show-insert-form-button");
var buttonCaseAssignmentRuleInsert = document.getElementById("case-assignment-rule-insert-button");
var buttonCaseAssignmentRuleInsertCancel = document.getElementById("case-assignment-rule-cancel-insert-button");

var buttonCaseAssignmentRuleUpdate = document.getElementById("case-assignment-rule-update-button");
var buttonCaseAssignmentRuleCanelUpdate = document.getElementById("case-assignment-rule-cancel-update-button");

var buttonCaseAssignmentRuleDelete = document.getElementById("case-assignment-rule-delete-button");
var buttonCaseAssignmentRuleDeleteCancel = document.getElementById("case-assignment-rule-cancel-delete-button");

var buttonPagePrev = document.getElementById("button-page-prev");
var buttonPageNext = document.getElementById("button-page-next");
var pRowsMessage = document.getElementById("p-rows-message");

/* Judge Distribution Assignments*/
var buttonJudgeDistributionAssignmentShowInsertForm = document.getElementById("judge-distribution-assignments-show-insert-form-button");
var buttonJudgeDistributionAssignmentInsert = document.getElementById("judge-distribution-assignment-insert-button");
var buttonJudgeDistributionAssignmentInsertCancel = document.getElementById("judge-distribution-assignment-cancel-insert-button");

var buttonJudgeDistributionAssignmentUpdate = document.getElementById("judge-distribution-assignment-update-button");
var buttonJudgeDistributionAssignmentCanelUpdate = document.getElementById("judge-distribution-assignment-cancel-update-button");

var buttonJudgeDistributionAssignmentDelete = document.getElementById("judge-distribution-assignment-delete-button");
var buttonJudgeDistributionAssignmentDeleteCancel = document.getElementById("judge-distribution-assignment-cancel-delete-button");

//Event listeners
buttonSearch.addEventListener("click", searchCaseAssignmentRules);

/* Case Assignment Rules */
buttonCaseAssignmentRuleShowInsertForm.addEventListener("click", showCaseAssignmentRuleInsertForm);
buttonCaseAssignmentRuleInsert.addEventListener("click", insertCaseAssignmentRule);
buttonCaseAssignmentRuleInsertCancel.addEventListener("click", resetCaseAssignmentRuleInsertForm);

buttonCaseAssignmentRuleUpdate.addEventListener("click", updateCaseAssignmentRule);
buttonCaseAssignmentRuleCanelUpdate.addEventListener("click", resetCaseAssignmentRuleUpdateForm);

buttonCaseAssignmentRuleDelete.addEventListener("click", handleCaseAssignmentRuleButtonDeleteClick);
buttonCaseAssignmentRuleDeleteCancel.addEventListener("click", resetCaseAssignmentRuleDeleteForm);

buttonPagePrev.addEventListener("click", handleButtonPagePrevClick);
buttonPageNext.addEventListener("click", handleButtonPageNextClick);

/* Judge Distribution Assignments*/
buttonJudgeDistributionAssignmentShowInsertForm.addEventListener("click", showJudgeDistributionAssignmentInsertForm);
buttonJudgeDistributionAssignmentInsert.addEventListener("click", insertJudgeDistributionAssignment);
buttonJudgeDistributionAssignmentInsertCancel.addEventListener("click", resetJudgeDistributionAssignmentInsertForm);

buttonJudgeDistributionAssignmentUpdate.addEventListener("click", updateJudgeDistributionAssignment);
buttonJudgeDistributionAssignmentCanelUpdate.addEventListener("click", resetJudgeDistributionAssignmentUpdateForm);

buttonJudgeDistributionAssignmentDelete.addEventListener("click", handleJudgeDistributionAssignmentButtonDeleteClick);
buttonJudgeDistributionAssignmentDeleteCancel.addEventListener("click", resetJudgeDistributionAssignmentDeleteForm);

//Functions

/* Case Assignment Rules */
//-------------------------------------------------------------------------------------------------//
/* SEARCH FUNCTIONS */
function searchCaseAssignmentRules() {

    var url = "http://localhost:5296/SearchCaseAssignmentRules?pageSize=" + rowsPerPage + "&pageNumber=" + textPage.value + "&circuitIdSearch=" + circuitParameter.value + "&countyIdSearch=" + countyParameter.value + "&courtCodeSearch=" + courtParameter.value + "&caseTypeCodeSearch=" + caseTypeParameter.value;

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
                    alert(response.message);
                    showSearchResultsMessage(response.caseAssignmentRules);
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
    var caseAssignmentRuleTableHeaderText = "<table id='case-assignment-rule-table'class='table table-dark table-striped table-bordered table-sm'><thead><tr><th id='record-selector-header' scope='col' class='select-check-box'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check-square-fill' viewBox='0 0 16 16'><path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z'/></svg></th><th scope='col'>Rule #</th><th scope='col'>Circuit Code</th><th scope='col'>County Id</th><th scope='col'>Court Code</th><th scope='col'>Case Type Code</th><th scope='col'>Assignment Method</th><th scope='col'>Begin Date</th><th scope='col'>End Date</th><th id='update-delete-column-header' scope='col' class='button-column'>Update/Delete</th></tr></thead><tbody>";
    var caseAssignmentRuleTableText = caseAssignmentRuleTableHeaderText;
    
    for (var i = 0; i < caseAssignmentRules.length; i++) {
        var caseAssignmentRule = caseAssignmentRules[i];

        var endDate = (caseAssignmentRule.ruleEndDate === null) ? "" : caseAssignmentRule.ruleEndDate.split('T')[0];

        var caseAssignmentRuleTableRowCheckBox ="<tr><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-check-box'><div class='form-check'><input class='form-check-input case-assignment-rule-check-box' type='checkbox' data-rule-num='" + caseAssignmentRule.ruleNumber + "'id='rule-num-" + caseAssignmentRule.ruleNumber + "-flexCheckDefault'/><label class='form-check-label' for='rule-num-" + caseAssignmentRule.ruleNumber + "-flexCheckDefault'></label></div></td>";
        var caseAssignmentRuleTableRowDataText ="<th scope='row'>" + caseAssignmentRule.ruleNumber + "</th><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-circuit-id'>" + caseAssignmentRule.circuitId + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-county-id'>" + caseAssignmentRule.countyId + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-court-code'>" + caseAssignmentRule.courtCode + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-case-type-code'>" + caseAssignmentRule.caseTypeCode + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-assignment-method'>" + caseAssignmentRule.assignmentMethod + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-begin-date'>" + caseAssignmentRule.ruleBeginDate.split('T')[0] + "</td><td id='rule-num-" + caseAssignmentRule.ruleNumber + "-end-date'>" + endDate + "</td>";
        var caseAssignmentRuleTableRowButtons ="<td><div class='row g-2'><div class='col-auto'><button id='rule-number-" + caseAssignmentRule.ruleNumber + "-update-button' type='button' data-rule-num='" + caseAssignmentRule.ruleNumber + "' class='btn visually-hidden btn-outline-warning btn-sm btn-case-assignment-rule-table-update'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-up-square-fill' viewBox='0 0 16 16'><path d='M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z'/></svg>Update</button></div><div class='col-auto'><button id='rule-number-" + caseAssignmentRule.ruleNumber + "-delete-button' type='button' data-rule-num='" + caseAssignmentRule.ruleNumber + "' class='btn visually-hidden btn-outline-danger btn-sm  btn-case-assignment-rule-table-delete'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash3-fill' viewBox='0 0 16 16'><path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z'/></svg>Delete</button>";
        var caseAssignmentRuleTableRowClosingTags = "</div></div></td></tr>";

        var caseAssignmentRuleTableRowText = caseAssignmentRuleTableRowCheckBox + caseAssignmentRuleTableRowDataText + caseAssignmentRuleTableRowButtons + caseAssignmentRuleTableRowClosingTags;
        
        caseAssignmentRuleTableText = caseAssignmentRuleTableText + caseAssignmentRuleTableRowText;
    }

    caseAssignmentRuleTableText = caseAssignmentRuleTableText + "</tbody></table>";

    caseAssignmentRuleTableDiv.innerHTML = caseAssignmentRuleTableText;
    
    //var caseAssignmentRuleTable = document.getElementById("case-assignment-rule-table");

    //paginateTable(caseAssignmentRuleTable);
    
    var updateButtons = document.getElementsByClassName("btn-case-assignment-rule-table-update");
    var deleteButtons = document.getElementsByClassName("btn-case-assignment-rule-table-delete");

    addCaseAssignmentRuleUpdateButtonEventListener(updateButtons);
    addCaseAssignmentRuleDeleteButtonEventListener(deleteButtons);
    
    var ruleNumberCheckboxes = document.getElementsByClassName("case-assignment-rule-check-box");

    addCaseAssignmentRuleCheckboxEventListener(ruleNumberCheckboxes);
}
function handleButtonPagePrevClick(e) {
    if (Number(textPage.value) > 1) {
        textPage.value = Number(textPage.value) - 1;
        searchCaseAssignmentRules();
    }
}
function handleButtonPageNextClick(e) {
    textPage.value = Number(textPage.value) + 1;
    searchCaseAssignmentRules();
}
function showSearchResultsMessage(caseAssignmentRules) {

    var searchResultsCount = 0;
    if (caseAssignmentRules.length > 0) {
        searchResultsCount = caseAssignmentRules[0].caseAssignmentRuleCount;
    }

    var pageSize = Number(rowsPerPage);
    var pageNumber = Number(textPage.value);

    var firstNumber = pageSize * pageNumber - pageSize + 1;
    var secondNumber = firstNumber + pageSize - 1;
    if (secondNumber > searchResultsCount) {
        secondNumber = searchResultsCount;
    }

    pRowsMessage.innerHTML = "Row " + firstNumber + " through " + secondNumber + " of " + searchResultsCount;
    if (pageNumber == 1){
        buttonPagePrev.disabled = true;
    }else{
        buttonPagePrev.disabled = false;
    }
    if(secondNumber == searchResultsCount ){
        buttonPageNext.disabled = true;
    }else{
        buttonPageNext.disabled = false;
    }
}
/* UPDATE FUNCTIONS */
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

	var textRuleNumber = document.getElementById("text-update-rule-number");
	var textCircuitId = document.getElementById("text-update-circuit-id");
	var textCountyId = document.getElementById("text-update-county-id");
	var textCourtCode = document.getElementById("text-update-court-code");
	var textCaseTypeCode = document.getElementById("text-update-case-type-code");
	var textAssignmentMethod = document.getElementById("text-update-assignment-method");
	var textBeginDate = document.getElementById("text-update-begin-date");
	var textEndDate = document.getElementById("text-update-end-date");
	
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

	var url = 'http://localhost:5296/UpdateCaseAssignmentRule?ruleNumber=' + textRuleNumber.value + '&circuitId=' + textCircuitId.value + '&countyId=' + textCountyId.value+ '&courtCode=' + textCourtCode.value + '&caseTypeCode=' + textCaseTypeCode.value + '&assignmentMethod=' + textAssignmentMethod.value + '&ruleBeginDate=' + textBeginDate.value + endDate + '&modifiedByUserId=' +textModifiedByUserId;
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
/* INSERT FUNCTIONS */
function showCaseAssignmentRuleInsertForm() {
    var formInsert = document.getElementById("case-assignment-rule-insert-form");
    formInsert.classList.remove("visually-hidden");
    buttonCaseAssignmentRuleShowInsertForm.classList.add("visually-hidden"); //Hide the Add new rule button when insert bar is visible
    
    var textBeginDate = document.getElementById("text-insert-begin-date");
    textBeginDate.value = getCurrentDate();
}
function insertCaseAssignmentRule() {

    var textCircuitId = document.getElementById("text-insert-circuit-id");
	var textCountyId = document.getElementById("text-insert-county-id");
	var textCourtCode = document.getElementById("text-insert-court-code");
	var textCaseTypeCode = document.getElementById("text-insert-case-type-code");
	var textAssignmentMethod = document.getElementById("text-insert-assignment-method");
	var textBeginDate = document.getElementById("text-insert-begin-date");
	var textModifiedByUserId = "DemoDayUser1";

        var url = "http://localhost:5296/InsertCaseAssignmentRule?circuitId=" + textCircuitId.value + "&countyId=" + textCountyId.value + "&courtCode=" + textCourtCode.value + "&caseTypeCode=" + textCaseTypeCode.value + "&assignmentMethod=" + textAssignmentMethod.value + "&ruleBeginDate=" +textBeginDate.value +"&modifiedByUserId=" + textModifiedByUserId;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterInsertCaseAssignmentRule;
        xhr.open("POST", url);
        xhr.send("POST");

        function doAfterInsertCaseAssignmentRule() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
						alert(response.message)
                        //showEmployees(response.employees);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        }
		
		resetCaseAssignmentRuleInsertForm();
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
    buttonCaseAssignmentRuleShowInsertForm.classList.remove("visually-hidden");
	
	textCircuitId.value = "";
	textCountyId.value = "";
	textCourtCode.value = "";
	textCaseTypeCode.value = "";
	textAssignmentMethod.value = "";
	textBeginDate.value = "";
}
/* DELETE FUNCTIONS */
function handleCaseAssignmentRuleTableDeleteClick(e) {
    var ruleNumber = e.target.getAttribute("data-rule-num");

    //alert("you want to update employee " + employeeId);

    var rowCircuitId = document.getElementById("rule-num-" + ruleNumber + "-circuit-id");
	var rowCountyId = document.getElementById("rule-num-" + ruleNumber + "-county-id");
	var rowCourtCode = document.getElementById("rule-num-" + ruleNumber + "-court-code");
	var rowCaseTypeCode = document.getElementById("rule-num-" + ruleNumber + "-case-type-code");
	var rowAssignmentMethod = document.getElementById("rule-num-" + ruleNumber + "-assignment-method");
	var rowBegintDate = document.getElementById("rule-num-" + ruleNumber + "-begin-date");
	var rowEndDate = document.getElementById("rule-num-" + ruleNumber + "-end-date");

	var textRuleNumber = document.getElementById("text-delete-rule-number");
	var textCircuitId = document.getElementById("text-delete-circuit-id");
	var textCountyId = document.getElementById("text-delete-county-id");
	var textCourtCode = document.getElementById("text-delete-court-code");
	var textCaseTypeCode = document.getElementById("text-delete-case-type-code");
	var textAssignmentMethod = document.getElementById("text-delete-assignment-method");
	var textBeginDate = document.getElementById("text-delete-begin-date");
	var textEndDate = document.getElementById("text-delete-end-date");

	textRuleNumber.value = ruleNumber;
	textCircuitId.value = rowCircuitId.innerText;
	textCountyId.value = rowCountyId.innerText;
	textCourtCode.value = rowCourtCode.innerText;
	textCaseTypeCode.value = rowCaseTypeCode.innerText;
	textAssignmentMethod.value = rowAssignmentMethod.innerText;
	textBeginDate.value = rowBegintDate.innerText;
	textEndDate.value = rowEndDate.innerText;
	
	var caseAssignmentRuleDeleteForm = document.getElementById("case-assignment-rule-delete-form");
	caseAssignmentRuleDeleteForm.classList.remove("visually-hidden");
}
function handleCaseAssignmentRuleButtonDeleteClick() {
    var textRuleNumber = document.getElementById("text-delete-rule-number");
    deleteCaseAssignmentRule(textRuleNumber.value);
}
function deleteCaseAssignmentRule(ruleNumber) {

    var url = "http://localhost:5296/DeleteCaseAssignmentRule?ruleNumber=" + ruleNumber;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = doAfterDeleteCaseAssignmentRule;
    xhr.open("DELETE", url);
    xhr.send(null);

    function doAfterDeleteCaseAssignmentRule() {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    alert(response.message);
                    //showEmployees(response.employees);
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }

    resetCaseAssignmentRuleDeleteForm();
}
function resetCaseAssignmentRuleDeleteForm() {
	var textRuleNumber = document.getElementById("text-delete-rule-number");
	var textCircuitId = document.getElementById("text-delete-circuit-id");
	var textCountyId = document.getElementById("text-delete-county-id");
	var textCourtCode = document.getElementById("text-delete-court-code");
	var textCaseTypeCode = document.getElementById("text-delete-case-type-code");
	var textAssignmentMethod = document.getElementById("text-delete-assignment-method");
	var textBeginDate = document.getElementById("text-delete-begin-date");
	var textEndDate = document.getElementById("text-delete-end-date");
	
	var caseAssignmentRuleDeleteForm = document.getElementById("case-assignment-rule-delete-form");
	caseAssignmentRuleDeleteForm.classList.add("visually-hidden");
	
	textRuleNumber.value = "";
	textCircuitId.value = "";
	textCountyId.value = "";
	textCourtCode.value = "";
	textCaseTypeCode.value = "";
	textAssignmentMethod.value = "";
	textBeginDate.value = "";
	textEndDate.value = "";
    
}
/* EVENT FUNCTIONS */
function addCaseAssignmentRuleUpdateButtonEventListener(buttons){
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener("click", handleCaseAssignmentRuleTableUpdateClick);
    }
}
function addCaseAssignmentRuleDeleteButtonEventListener(buttons){
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener("click", handleCaseAssignmentRuleTableDeleteClick);
    }
}
function addCaseAssignmentRuleCheckboxEventListener(checkboxes){
    for (var i = 0; i < checkboxes.length; i++){
        var checkbox = checkboxes[i];
        checkbox.addEventListener("change",caseAssignmentRuleCheckboxChange);
    }
}
function caseAssignmentRuleCheckboxChange(checkboxElement){
    var ruleNumber = checkboxElement.target.getAttribute("data-rule-num");
    console.log("RuleNumber: " + ruleNumber);
    var isChecked = checkboxElement.target.checked;
    console.log("isChecked: " + isChecked);
    var updateButton = document.getElementById("rule-number-"+ ruleNumber + "-update-button");
    var deleteButton = document.getElementById("rule-number-"+ ruleNumber + "-delete-button");
    var ruleNumberCheckboxes = document.getElementsByClassName("case-assignment-rule-check-box");
    console.log("Checkbox count: " + ruleNumberCheckboxes.length);
    var judgeDistributionRules = document.getElementById("judge-distribution-rules");

    if(isChecked === true){
        alert(ruleNumber + " has been checked!");
        console.log(ruleNumber + " has been checked!"); 
        //Display Update & Delete Buttons
        updateButton.classList.remove("visually-hidden");
        deleteButton.classList.remove("visually-hidden");
		//Disable Other checkboxes
        
        for (var i = 0; i < ruleNumberCheckboxes.length; i++){
            var ruleNumberCheckbox = ruleNumberCheckboxes[i];
            console.log("Checkbox # " + (i + 1));
            console.log("Checked == " +ruleNumberCheckbox.checked);
            
            if(ruleNumberCheckbox.checked === false){
                ruleNumberCheckbox.disabled = true;
            }
        }
	    //Display S.C. Feedback
        //Display Judge Distribution Assignments Div
        judgeDistributionRules.classList.remove("visually-hidden");
	    
        //TO DO:
	    //Query judge distribution
	    //Populate Judge Distribution Assignment table
        searchJudgeDistributionAssignments(ruleNumber);
	} else{
        alert(ruleNumber + " has been un-checked!");
        console.log(ruleNumber + " has been un-checked!");
        //Hide Update & Delete Buttons
        updateButton.classList.add("visually-hidden");
        deleteButton.classList.add("visually-hidden");
		//Enable Other checkboxes
        for (var i = 0; i < ruleNumberCheckboxes.length; i++){
            var ruleNumberCheckbox = ruleNumberCheckboxes[i];
            
            if(ruleNumberCheckbox.checked === false){
                ruleNumberCheckbox.disabled = false;
            }
        }
		//Hide S.C. Feedback
        //Hide Judge Distribution Assignments Div
        judgeDistributionRules.classList.add("visually-hidden");
		
        //TO DO:
		//Reset Judge Distribution Assignment table
        judgeDistributionAssignmentTableDiv.innerHTML = "";
	}
}

//------------------------------------------------------------------------------------------------------------------------//

/* Judge Distribution Assignments*/
/* SEARCH FUNCTIONS */
function searchJudgeDistributionAssignments(ruleNumber) {

    var url = "http://localhost:5296/GetJudgeAssignmentDistributionRules?ruleNumberGet=" + ruleNumber;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = doAfterSearchJudgeDistributionRule;
    xhr.open("GET", url);
    xhr.send(null);

    function doAfterSearchJudgeDistributionRule() {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

                var response = JSON.parse(xhr.responseText); // Case Assignment Rules retrieved in the GET API Response

                if (response.result === "success") {
                    alert(response.message);
                    //showSearchResultsMessage(response.caseAssignmentRules);
                    showJudgeDistributionAssignments(response.judgeAssignmentDistributionRules);
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}
function showJudgeDistributionAssignments(judgeDistributionAssignments) {
    var judgeDistributionAssignmentsTableText = "";
    var judgeDistributionAssignmentsTableHeaderText = "";
	
    if(judgeDistributionAssignments.length > 0){
        var judgeDistributionAssignmentsTableHeaderText ="<table id='judge-distribution-assignment-table' class='table table-dark table-striped table-bordered table-sm'><thead><tr><th id='record-selector-header'class='judge-distribution-assignment-check-box-header' scope='col'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check-square-fill' viewBox='0 0 16 16'><path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z'/></svg></th><th scope='col'>Rule #</th><th scope='col'>ID</th> <th scope='col'>Name</th><th scope='col'>Assignment %</th><th scope='col'>Priority LVL</th><th id='update-delete-column-header' class='button-column' scope='col'>Update/Delete</th></tr></thead><tbody>";
	
	    judgeDistributionAssignmentsTableText = judgeDistributionAssignmentsTableText + judgeDistributionAssignmentsTableHeaderText;

        for (var i = 0; i < judgeDistributionAssignments.length; i++) {
            var judgeDistributionAssignment = judgeDistributionAssignments[i];
    
            var judgeDistributionAssignmentsTableRowCheckBox = "<tr><td><div class='form-check'><input class='form-check-input judge-distribution-assignment-check-box' type='checkbox' data-rule-num='" + judgeDistributionAssignment.ruleNumber + "'data-judge-id='" + judgeDistributionAssignment.judgeId + "'value='' id='flexCheckDefault'><label class='form-check-label' for='flexCheckDefault'></label></div></td>";
            var judgeDistributionAssignmentsTableRowDataText = "<th id='rule-num-" + judgeDistributionAssignment.ruleNumber + "-judge-id-" + judgeDistributionAssignment.judgeId + "-rule-number' scope='col'>" + judgeDistributionAssignment.ruleNumber + "</th><th id='rule-num-" + judgeDistributionAssignment.ruleNumber + "-judge-id-" + judgeDistributionAssignment.judgeId + "-judge-id' scope='col'>" + judgeDistributionAssignment.judgeId + "</th> <td id='rule-num-" + judgeDistributionAssignment.ruleNumber + "-judge-id-" + judgeDistributionAssignment.judgeId + "-judge-name'>" + judgeDistributionAssignment.judgeName + "</td><td id='rule-num-" + judgeDistributionAssignment.ruleNumber + "-judge-id-" + judgeDistributionAssignment.judgeId + "-percent'>" + judgeDistributionAssignment.assignmentPercentage + "</td><td id='rule-num-" + judgeDistributionAssignment.ruleNumber + "-judge-id-" + judgeDistributionAssignment.judgeId + "-priority'>" + judgeDistributionAssignment.assignmentPriority + "</td>";
            var judgeDistributionAssignmentsTableRowButtons = "<td><div class='row g-2'><div class='col-auto'><button id='rule-number-" + judgeDistributionAssignment.ruleNumber + "-judge-id-" + judgeDistributionAssignment.judgeId + "-update-button' type='button' data-rule-num='" + judgeDistributionAssignment.ruleNumber + "' data-judge-id='" + judgeDistributionAssignment.judgeId + "' class='btn btn-outline-warning btn-sm visually-hidden btn-judge-distribution-assignment-table-update'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-up-square-fill' viewBox='0 0 16 16'><path d='M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z'/></svg>Update</button></div><div class='col-auto'><button id='rule-number-" + judgeDistributionAssignment.ruleNumber + "-judge-id-" + judgeDistributionAssignment.judgeId + "-delete-button' type='button' data-rule-num='" + judgeDistributionAssignment.ruleNumber + "' data-judge-id='" + judgeDistributionAssignment.judgeId + "' class='btn btn-outline-danger btn-sm visually-hidden btn-judge-distribution-assignment-table-delete'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash3-fill' viewBox='0 0 16 16'><path d='M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z'/></svg>Delete</button>";
            var judgeDistributionAssignmentsTableRowClosingTags = "</div></div></td></tr>";
            
            var judgeDistributionAssignmentsTableRowText = judgeDistributionAssignmentsTableRowCheckBox + judgeDistributionAssignmentsTableRowDataText + judgeDistributionAssignmentsTableRowButtons + judgeDistributionAssignmentsTableRowClosingTags;
            
            judgeDistributionAssignmentsTableText = judgeDistributionAssignmentsTableText + judgeDistributionAssignmentsTableRowText;
        }
        
         var judgeDistributionAssignmentsTableClosingTags = "</tbody></table>";
    
        judgeDistributionAssignmentsTableText = judgeDistributionAssignmentsTableText + judgeDistributionAssignmentsTableClosingTags;
    
        judgeDistributionAssignmentTableDiv.innerHTML = judgeDistributionAssignmentsTableText ;

        var judgeDistributionAssignmentUpdateButtons = document.getElementsByClassName("btn-judge-distribution-assignment-table-update");
        var judgeDistributionAssignmentDeleteButtons = document.getElementsByClassName("btn-judge-distribution-assignment-table-delete");
    
        addJudgeDistributionAssignmentUpdateButtonEventListener(judgeDistributionAssignmentUpdateButtons);
        addJudgeDistributionAssignmentDeleteButtonEventListener(judgeDistributionAssignmentDeleteButtons);
        
        var judgeDistributionAssignmentCheckboxes = document.getElementsByClassName("judge-distribution-assignment-check-box");
    
        addJudgeDistributionAssignmentCheckboxEventListener(judgeDistributionAssignmentCheckboxes);
    }
    else{
        judgeDistributionAssignmentsTableHeaderText ="<table id='judge-distribution-assignment-table' class='table table-dark table-striped table-bordered table-sm'><thead><tr><th id='record-selector-header'class='judge-distribution-assignment-check-box-header' scope='col'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check-square-fill' viewBox='0 0 16 16'><path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z'/></svg></th><th scope='col'>Rule #</th><th scope='col'>ID</th> <th scope='col'>Name</th><th scope='col'>Assignment %</th><th scope='col'>Priority LVL</th><th id='update-delete-column-header' class='button-column' scope='col'>Update/Delete</th></tr></thead></table>"
        
        judgeDistributionAssignmentsTableText = judgeDistributionAssignmentsTableText + judgeDistributionAssignmentsTableHeaderText;

        judgeDistributionAssignmentTableDiv.innerHTML = judgeDistributionAssignmentsTableText;
    }   
}
/* UPDATE FUNCTIONS */
function handleJudgeDistributionAssignmentTableUpdateClick(e) {
    var ruleNumber = e.target.getAttribute("data-rule-num");
    var judgeId = e.target.getAttribute("data-judge-id");

    alert("Rule Number: " + ruleNumber + " & Judge Id: " + judgeId + " to be updated.");
    console.log("Rule Number: " + ruleNumber + " & Judge Id: " + judgeId + " to be updated.");
   
    var rowRuleNumber = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-rule-number");
    console.log("RowRuleNumber inner text: " + rowRuleNumber.innerText);
    var rowJudgeId = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-judge-id");
    console.log("RowJudgeId inner text: " + rowJudgeId.innerText);
    var rowAssignmentPercentage = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-percent");
    console.log("RowAssignmentPercent inner text: " + rowAssignmentPercentage.innerText);
    var rowAssignmentPriority = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-priority");
    console.log("RowAssignmentPriority inner text: " + rowAssignmentPriority.innerText);
    /*
    var rowRuleNumber = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-rule-number");
    var rowJudgeId = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-judge-id");
    var rowAssignmentPercentage = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-percent");
    var rowAssignmentPriority = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-priority");
    */

    var textRuleNumber = document.getElementById("text-update-judge-distibution-rule-number");
    var textJudgeId = document.getElementById("text-update-judge-distibution-judge-id");
    var textAssignmentPercentage = document.getElementById("text-update-judge-distibution-assignment-percent");
    var textAssignmentPriority = document.getElementById("text-update-judge-distibution-priority-level");

    textRuleNumber.value = rowRuleNumber.innerText;
    textJudgeId.value = rowJudgeId.innerText;
    textAssignmentPercentage.value = rowAssignmentPercentage.innerText;
    textAssignmentPriority.value = rowAssignmentPriority.innerText;
	
	var judgeDistributionAssignmentRuleUpdateForm = document.getElementById("judge-distribution-assignment-update-form");
	judgeDistributionAssignmentRuleUpdateForm.classList.remove("visually-hidden");
}
function updateJudgeDistributionAssignment() {

	var textRuleNumber = document.getElementById("text-update-judge-distibution-rule-number");
    var textJudgeId = document.getElementById("text-update-judge-distibution-judge-id");
    var textAssignmentPercentage = document.getElementById("text-update-judge-distibution-assignment-percent");
    var textAssignmentPriority = document.getElementById("text-update-judge-distibution-priority-level");
	var textModifiedByUserId = "DemoDayUser1";

	var url = 'http://localhost:5296/UpdateJudgeAssignmentDistributionRule?ruleNumber=' + textRuleNumber.value + '&judgeId=' + textJudgeId.value + '&assignmentPercentage=' + textAssignmentPercentage.value + '&assignmentPriority=' + textAssignmentPriority.value + '&modifiedByUserId=' +textModifiedByUserId;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = doAfterUpdateJudgeAssignmentDistributionRule;
	xhr.open("PUT", url);
	xhr.send(null);
	
	 function doAfterUpdateJudgeAssignmentDistributionRule() {
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
		
        resetJudgeDistributionAssignmentUpdateForm();
		
  
}
function resetJudgeDistributionAssignmentUpdateForm(){
	
    var textRuleNumber = document.getElementById("text-update-judge-distibution-rule-number");
    var textJudgeId = document.getElementById("text-update-judge-distibution-judge-id");
    var textAssignmentPercentage = document.getElementById("text-update-judge-distibution-assignment-percent");
    var textAssignmentPriority = document.getElementById("text-update-judge-distibution-priority-level");

    var judgeDistributionAssignmentRuleUpdateForm = document.getElementById("judge-distribution-assignment-update-form");
    judgeDistributionAssignmentRuleUpdateForm.classList.add("visually-hidden");
    
    textRuleNumber.value = "";
    textJudgeId.value = "";
    textAssignmentPercentage.value = "";
    textAssignmentPriority.value = "";	
}
/* INSERT FUNCTIONS */
function showJudgeDistributionAssignmentInsertForm() {
    var formInsert = document.getElementById("judge-distribution-assignment-insert-form");
    formInsert.classList.remove("visually-hidden");
    buttonJudgeDistributionAssignmentShowInsertForm.classList.add("visually-hidden"); //Hide the Add new rule button when insert bar is visible

    var insertRuleNumberField = document.getElementById("text-insert-judge-distibution-rule-number");
    var ruleNumber;
    //find clicked rule number
    ruleNumber = getCheckedRuleNumber();
    
    insertRuleNumberField.value = ruleNumber;
    insertRuleNumberField.disabled = true;
}
function insertJudgeDistributionAssignment(){


    var textRuleNumber = document.getElementById("text-insert-judge-distibution-rule-number");
    var textJudgeId = document.getElementById("text-insert-judge-distibution-judge-id");
	var textAssignmentPercentage = document.getElementById("text-insert-judge-distibution-assignment-percent");
	var textAssignmentPriority = document.getElementById("text-insert-judge-distibution-priority-level");
	var textModifiedByUserId = "DemoDayUser1";

        var url = "http://localhost:5296/InsertJudgeAssignmentDistributionRule?ruleNumber=" + textRuleNumber.value + "&judgeId=" + textJudgeId.value + "&assignmentPercentage=" + textAssignmentPercentage.value + "&assignmentPriority=" + textAssignmentPriority.value +"&modifiedByUserId=" + textModifiedByUserId;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterInsertJudgeDistributionAssignmentRule;
        xhr.open("POST", url);
        xhr.send("POST");

        function doAfterInsertJudgeDistributionAssignmentRule() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
						alert(response.message)
                        //showEmployees(response.employees);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        }
		
		resetJudgeDistributionAssignmentInsertForm();
}
function resetJudgeDistributionAssignmentInsertForm(){
    var textRuleNumber = document.getElementById("text-insert-judge-distibution-rule-number");
    var textJudgeId = document.getElementById("text-insert-judge-distibution-judge-id");
	var textAssignmentPercentage = document.getElementById("text-insert-judge-distibution-assignment-percent");
	var textAssignmentPriority = document.getElementById("text-insert-judge-distibution-priority-level");

    textRuleNumber.value = "";
	textJudgeId.value = "";
	textAssignmentPercentage.value = "";
	textAssignmentPriority.value = "";

	var judgeDistributionAssignmentInsertForm = document.getElementById("judge-distribution-assignment-insert-form");
	judgeDistributionAssignmentInsertForm.classList.add("visually-hidden");
    buttonJudgeDistributionAssignmentShowInsertForm.classList.remove("visually-hidden");
}
/* DELETE FUNCTIONS */
function handleJudgeDistributionAssignmentTableDeleteClick(e) {
    var ruleNumber = e.target.getAttribute("data-rule-num");
    var judgeId = e.target.getAttribute("data-judge-id");

    alert("Rule Number: " + ruleNumber + " & Judge Id: " + judgeId + " to be deleted.");
    console.log("Rule Number: " + ruleNumber + " & Judge Id: " + judgeId + " to be deleted.");

    //alert("you want to update employee " + employeeId);
  
    var rowRuleNumber = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-rule-number");
    console.log("RowRuleNumber inner text: " + rowRuleNumber.innerText);
    var rowJudgeId = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-judge-id");
    console.log("RowJudgeId inner text: " + rowJudgeId.innerText);
    var rowAssignmentPercentage = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-percent");
    console.log("RowAssignmentPercent inner text: " + rowAssignmentPercentage.innerText);
    var rowAssignmentPriority = document.getElementById("rule-num-" + ruleNumber + "-judge-id-" + judgeId + "-priority");
    console.log("RowAssignmentPriority inner text: " + rowAssignmentPriority.innerText);

    var textRuleNumber = document.getElementById("text-delete-judge-distibution-rule-number");
    var textJudgeId = document.getElementById("text-delete-judge-distibution-judge-id");
    var textAssignmentPercentage = document.getElementById("text-delete-judge-distibution-assignment-percent");
    var textAssignmentPriority = document.getElementById("text-delete-judge-distibution-priority-level");

    textRuleNumber.value = rowRuleNumber.innerText;
    textJudgeId.value = rowJudgeId.innerText;
    textAssignmentPercentage.value = rowAssignmentPercentage.innerText;
    textAssignmentPriority.value = rowAssignmentPriority.innerText;
	
	var judgeDistributionAssignmentDeleteForm = document.getElementById("judge-distribution-assignment-delete-form");
	judgeDistributionAssignmentDeleteForm.classList.remove("visually-hidden");
}
function handleJudgeDistributionAssignmentButtonDeleteClick() {
    var textRuleNumber = document.getElementById("text-delete-judge-distibution-rule-number");
    var textJudgeId = document.getElementById("text-delete-judge-distibution-judge-id");
    
    deleteJudgeDistributionAssignment(textRuleNumber.value, textJudgeId.value);
}
function deleteJudgeDistributionAssignment(ruleNumber,judgeId) {

    var url = "http://localhost:5296/DeleteJudgeAssignmentDistributionRule?ruleNumber=" + ruleNumber + "&judgeId=" + judgeId;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = doAfterDeleteJudgeAssignmentDistributionRule;
    xhr.open("DELETE", url);
    xhr.send(null);

    function doAfterDeleteJudgeAssignmentDistributionRule() {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    alert(response.message);
                    //showEmployees(response.employees);
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }

    resetJudgeDistributionAssignmentDeleteForm();
}
function resetJudgeDistributionAssignmentDeleteForm() {
    var textRuleNumber = document.getElementById("text-delete-judge-distibution-rule-number");
    var textJudgeId = document.getElementById("text-delete-judge-distibution-judge-id");
    var textAssignmentPercentage = document.getElementById("text-delete-judge-distibution-assignment-percent");
    var textAssignmentPriority = document.getElementById("text-delete-judge-distibution-priority-level");

    var judgeDistributionAssignmentDeleteForm = document.getElementById("judge-distribution-assignment-delete-form");
	judgeDistributionAssignmentDeleteForm.classList.add("visually-hidden");

    textRuleNumber.value = "";
    textJudgeId.value = "";
    textAssignmentPercentage.value = "";
    textAssignmentPriority.value = "";  
}
/* EVENT FUNCTIONS */
function addJudgeDistributionAssignmentUpdateButtonEventListener(buttons){
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener("click", handleJudgeDistributionAssignmentTableUpdateClick);
    }
}
function addJudgeDistributionAssignmentDeleteButtonEventListener(buttons){
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener("click", handleJudgeDistributionAssignmentTableDeleteClick);
    }
}
function addJudgeDistributionAssignmentCheckboxEventListener(checkboxes){
    for (var i = 0; i < checkboxes.length; i++){
        var checkbox = checkboxes[i];
        checkbox.addEventListener("change",JudgeDistributionAssignmentCheckboxChange);
    }
}
function JudgeDistributionAssignmentCheckboxChange(checkboxElement){
    var ruleNumber = checkboxElement.target.getAttribute("data-rule-num");
    var judgeId = checkboxElement.target.getAttribute("data-judge-id");

    console.log("RuleNumber: " + ruleNumber);
    console.log("JudgeId: " + judgeId);

    var isChecked = checkboxElement.target.checked;
    
    console.log("isChecked: " + isChecked);
    
    var updateButton = document.getElementById("rule-number-"+ ruleNumber + "-judge-id-" + judgeId + "-update-button");
    var deleteButton = document.getElementById("rule-number-"+ ruleNumber + "-judge-id-" + judgeId + "-delete-button");
    
    var judgeDistributionAssignmentCheckboxes = document.getElementsByClassName("judge-distribution-assignment-check-box");
    
    console.log("Checkbox count: " + judgeDistributionAssignmentCheckboxes.length);


    if(isChecked === true){
        alert("Rule #: " + ruleNumber + " & Judge Id: " + judgeId + " has been checked!");
        console.log("Rule #: " + ruleNumber + " & Judge Id: " + judgeId + " has been checked!");
        //Display Update & Delete Buttons
        updateButton.classList.remove("visually-hidden");
        deleteButton.classList.remove("visually-hidden");
		//Disable Other checkboxes
        
        for (var i = 0; i < judgeDistributionAssignmentCheckboxes.length; i++){
            var judgeDistributionAssignmentCheckbox = judgeDistributionAssignmentCheckboxes[i];
            console.log("Checkbox # " + (i + 1));
            console.log("Checked == " +judgeDistributionAssignmentCheckbox.checked);
            
            if(judgeDistributionAssignmentCheckbox.checked === false){
                judgeDistributionAssignmentCheckbox.disabled = true;
            }
        }       
	} else{
        alert("Rule #: " + ruleNumber + " & Judge Id: " + judgeId + " has been un-checked!");
        console.log("Rule #: " + ruleNumber + " & Judge Id: " + judgeId + " has been un-checked!");
        //Hide Update & Delete Buttons
        updateButton.classList.add("visually-hidden");
        deleteButton.classList.add("visually-hidden");
		//Enable Other checkboxes
        for (var i = 0; i < judgeDistributionAssignmentCheckboxes.length; i++){
            var ruleNumberCheckbox = judgeDistributionAssignmentCheckboxes[i];
            
            if(ruleNumberCheckbox.checked === false){
                ruleNumberCheckbox.disabled = false;
            }
        }     
	}
}

//-----------------------------------------------------------------------------------------------------------------------------//

/* MISC FUNCTIONS -- BEGIN*/

/* Current Date*/
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
/* Get Checked Rule Number */
function getCheckedRuleNumber(){
    var checkboxes = document.getElementsByClassName("case-assignment-rule-check-box");
    //var isChecked;
    var checkboxRuleNumber = null;
    
    for (var i = 0; i < checkboxes.length; i++){
        var checkbox = checkboxes[i];
        //Demonstration for Testing/Trouble shooting.
          /*
            console.log("Value: " + checkbox.value);
            console.log("Attribute: " + checkbox.getAttribute("data-rule-num"));
            console.log("Checked: " + checkbox.checked);
            console.log("Rule Number: " + checkboxRuleNumber);
        //  */
        if( checkbox.checked === true){
            checkboxRuleNumber = checkbox.getAttribute("data-rule-num");
        }
    }
    return checkboxRuleNumber;
}
 
/* MISC FUNCTIONS -- END*/




//TO-DO: Used for pagination
///*  

//*/

searchCaseAssignmentRules();

}

webapp_e_CAPES();