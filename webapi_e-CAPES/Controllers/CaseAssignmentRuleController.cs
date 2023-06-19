using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace webapi_e_CAPES.Controllers;

[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public EmployeeController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("/SearchCaseAssignmentRules")]

    public Response SearchCaseAssignmentRules(string? circuitIdSearch = null, string? countyIdSearch = "",string? courtCodeSearch = "", string? caseTypeCodeSearch = "")
    {
        Response response = new Response();
        try
        {
            List<CaseAssignmentRule> caseAssignmentRules = new List<CaseAssignmentRule>();
            string connectionString = GetConnectionString();
            using(SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                caseAssignmentRules = CaseAssignmentRule.SearchCaseAssignmentRules(sqlConnection,Convert.ToInt32(circuitIdSearch),countyIdSearch,courtCodeSearch,caseTypeCodeSearch);
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
            response.Result = "failue";
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