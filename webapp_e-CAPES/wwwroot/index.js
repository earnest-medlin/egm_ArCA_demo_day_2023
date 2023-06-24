function webapp_e_CAPES(){
//Get elements

/*search parameters*/
var circuitParameter = document.getElementById("circuit-search-parameter");
var countyParameter = document.getElementById("county-search-parameter");
var courtParameter = document.getElementById("court-search-parameter");
var caseTypeParameter = document.getElementById("case-type-search-parameter");

/*buttons & check boxes*/
var buttonSearch = document.getElementById("button-search");

//Add event listeners
buttonSearch.addEventListener("click", searchCaseAssignmentRules);


//Functions

function searchCaseAssignmentRules() {

    var url = "http://localhost:5296/SearchCaseAssignmentRules?circuitIdSearch=" + circuitParameter.value + "&countyIdSearch=" + countyParameter.value + "&courtCodeSearch=" + courtParameter.value + "&caseTypeCodeSearch=" + caseTypeParameter.value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = doAfterSearchEmployees;
    xhr.open("GET", url);
    xhr.send(null);

    function doAfterSearchEmployees() {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    //showSearchResultsMessage(response.employees);
                    //showEmployees(response.employees);
                    alert(response.message);
                } else {
                    alert("API Error: " + response.message);
                }
            } else {
                alert("Server Error: " + xhr.status + " " + xhr.statusText);
            }
        }
    }
}

function showSearchResultsMessage(employees) {

    var searchResultsCount = 0;
    if (employees.length > 0) {
        searchResultsCount = employees[0].employeeCount;
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

function showEmployees(employees) {
    var employeeTableText = "<table class='table table-striped table-sm'><thead><tr><th scope='col'>Empoyee ID</th><th scope='col'>First Name</th><th scope='col'>Last Name</th><th scope='col'>Salary</th><th class='button-column'></th></tr></thead><tbody>";

    for (var i = 0; i < employees.length; i++) {
        var employee = employees[i];

        var employeeSalary = (employee.salary === null) ? "" : employee.salary;

        employeeTableText = employeeTableText + "<tr><th scope='row'>" + employee.employeeId + "</th><td id='emp-" + employee.employeeId + "-first-name'>" + employee.firstName + "</td><td id='emp-" + employee.employeeId + "-last-name'>" + employee.lastName + "</td><td id='emp-" + employee.employeeId + "-salary'>" + employeeSalary + "</td><td><div class='row g-2'><div class='col-auto'><button type='button' data-employee-id='" + employee.employeeId + "' class='btn btn-outline-primary btn-sm btn-employee-table-update'>Update</button></div><div class='col-auto'><button id='' type='button' data-employee-id='" + employee.employeeId + "' class='btn btn-outline-primary btn-sm btn-employee-table-delete'>Delete</button></div></div></td></tr>";
    }

    employeeTableText = employeeTableText + "</tbody></table>";

    employeeTable.innerHTML = employeeTableText;

    var updateButtons = document.getElementsByClassName("btn-employee-table-update");

    for (var i = 0; i < updateButtons.length; i++) {
        var updateButton = updateButtons[i];
        updateButton.addEventListener("click", handleEmployeeTableUpdateClick);
    }

    var deleteButtons = document.getElementsByClassName("btn-employee-table-delete");

    for (var i = 0; i < deleteButtons.length; i++) {
        var deleteButton = deleteButtons[i];
        deleteButton.addEventListener("click", handleEmployeeTableDeleteClick);
    }
}

}

webapp_e_CAPES();