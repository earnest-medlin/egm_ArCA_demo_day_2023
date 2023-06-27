using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace webapi_e_CAPES.Controllers;

[ApiController]
[Route("[controller]")]
public class CaseAssignmentRuleController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public CaseAssignmentRuleController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("/SearchCaseAssignmentRules")]

    public Response SearchCaseAssignmentRules(string pageSize = "10", string pageNumber = "1", string? circuitIdSearch = null, string? countyIdSearch = "",string? courtCodeSearch = "", string? caseTypeCodeSearch = "")
    {
        Response response = new Response();
        try
        {
            List<CaseAssignmentRule> caseAssignmentRules = new List<CaseAssignmentRule>();
            string connectionString = GetConnectionString();
            using(SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                caseAssignmentRules = CaseAssignmentRule.SearchCaseAssignmentRules(sqlConnection,Convert.ToInt32(pageSize), Convert.ToInt32(pageNumber), Convert.ToInt32(circuitIdSearch),countyIdSearch,courtCodeSearch,caseTypeCodeSearch);
            }

            string message = "";

            if(caseAssignmentRules.Count() > 0)
            {
                int caseAssignmentRuleCount = caseAssignmentRules[0].CaseAssignmentRuleCount;
                message = $"Found {caseAssignmentRuleCount} case assignment rules.";
            }
            else
            {
                message = "No case assignment rules met your search criteria.";
            }

            response.Result = "success";
            response.Message = message;
            response.CaseAssignmentRules = caseAssignmentRules;
        }
        catch (Exception e)
        {
            response.Result = "failure";
            response.Message = e.Message;
        }
        return response;
    }

    [HttpPost]
    [Route("/InsertCaseAssignmentRule")]
    public Response InsertCaseAssignmentRule(string circuitId, string countyId, string courtCode, string caseTypeCode, string assignmentMethod, string ruleBeginDate, string? dateLastModified, string modifiedByUserId)
    {
        //string? ruleEndDate
        Response response = new Response();
        try
        {
            List<CaseAssignmentRule> caseAssignmentRules = new List<CaseAssignmentRule>();

            DateTime? editDate = dateLastModified == null ? null : Convert.ToDateTime(dateLastModified);

            CaseAssignmentRule caseAssignmentRule = new CaseAssignmentRule(Convert.ToInt32(circuitId), countyId, courtCode, caseTypeCode, assignmentMethod, Convert.ToDateTime(ruleBeginDate), editDate, modifiedByUserId);

            int rowsAffected = 0;

            string connectionString = GetConnectionString();
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                rowsAffected = CaseAssignmentRule.InsertCaseAssignmentRule(caseAssignmentRule,sqlConnection);
                //TO-DO
                //caseAssignmentRules = CaseAssignmentRule.SearchCaseAssignmentRules(sqlConnection);
            }

            response.Result = (rowsAffected == 1) ? "success" : "failure";
            response.Message = $"{rowsAffected} rows affected.";
            //TO-DO
            //response.CaseAssignmentRules = caseAssignmentRules;
        }
        catch (Exception e)
        {
            response.Result = "failure";
            response.Message = e.Message;
        }

        return response;
    }

    [HttpPut]
    [Route("/UpdateCaseAssignmentRule")]
    public Response UpdateCaseAssignmentRule(string ruleNumber, string circuitId, string countyId, string courtCode, string caseTypeCode, string assignmentMethod, string ruleBeginDate, string? ruleEndDate, string? dateLastModified, string modifiedByUserId)
    {
        Response response = new Response();
        try
        {
            List<CaseAssignmentRule> caseAssignmentRules = new List<CaseAssignmentRule>();

            DateTime? endDate = ruleEndDate == null ? null : Convert.ToDateTime(ruleEndDate);
            DateTime? editDate = dateLastModified == null ? null : Convert.ToDateTime(dateLastModified);

            CaseAssignmentRule caseAssignmentRule = new CaseAssignmentRule(Convert.ToInt32(ruleNumber), Convert.ToInt32(circuitId), countyId, courtCode, caseTypeCode, assignmentMethod, Convert.ToDateTime(ruleBeginDate), endDate, editDate, modifiedByUserId);
            
            int rowsAffected = 0;

            string connectionString = GetConnectionString();
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                rowsAffected = CaseAssignmentRule.UpdateCaseAssignmentRule(caseAssignmentRule,sqlConnection);
                //TO-DO
                //caseAssignmentRules = CaseAssignmentRule.SearchCaseAssignmentRules(sqlConnection);
            }

            response.Result = (rowsAffected == 1) ? "success" : "failure";
            response.Message = $"{rowsAffected} rows affected.";
            //TO-DO
            //response.CaseAssignmentRules = caseAssignmentRules;
        }
        catch (Exception e)
        {
            response.Result = "failure";
            response.Message = e.Message;
        }
        return response;
    }

    [HttpDelete]
    [Route("/DeleteCaseAssignmentRule")]
    public Response DeleteCaseAssignmentRule(string ruleNumber)
    {
        Response response = new Response();
        try
        {
            List<CaseAssignmentRule> caseAssignmentRules = new List<CaseAssignmentRule>();
            
            CaseAssignmentRule caseAssignmentRule = new CaseAssignmentRule();

            int rowsAffected = 0;

            string connectionString = GetConnectionString();
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                rowsAffected = CaseAssignmentRule.DeleteCaseAssignmentRule(Convert.ToInt32(ruleNumber),sqlConnection);
                //TO-DO
                //caseAssignmentRules = CaseAssignmentRule.SearchCaseAssignmentRules(sqlConnection);
            }

            response.Result = (rowsAffected == 1) ? "success" : "failure";
            response.Message = $"{rowsAffected} rows affected.";
            //TO-DO
            //response.CaseAssignmentRules = caseAssignmentRules;
        }
        catch (Exception e)
        {
            response.Result = "failure";
            response.Message = e.Message;
        }
        return response;
    }
    
    static string GetConnectionString()
    {
        string serverName = @"AO-EGM-LA-2999\SQLEXPRESS"; //Change to the "Server Name" you see when you launch SQL Server Management Studio.
        string databaseName = "Court_Case_Management"; //Change to the database where you created your Employee table.
        string connectionString = $"data source={serverName}; database={databaseName}; Integrated Security=true;";
        return connectionString;
    }
}