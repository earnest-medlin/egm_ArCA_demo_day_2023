using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace webapi_e_CAPES.Controllers;

[ApiController]
[Route("[controller]")]
public class SearchParameterDropdownController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public SearchParameterDropdownController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }
    
    [HttpGet]
    [Route("/GetSearchParameterDropdownLists")]

    public Response GetSearchParameterDropdownLists()
    {
        Response response = new Response();
        try
        {
            List<Circuit> circuits = new List<Circuit>();
            List<County> counties = new List<County>();
            List<Court> courts = new List<Court>();
            List<CaseType> caseTypes = new List<CaseType>();

            string connectionString = GetConnectionString();
            using(SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
               sqlConnection.Open();
               circuits = Circuit.GetCircuits(sqlConnection);
               counties = County.GetCounties(sqlConnection);
               courts = Court.GetCourts(sqlConnection);
               caseTypes = CaseType.GetCaseTypes(sqlConnection);               
            }

            string message = "There were ";

            int circuitCount = circuits.Count;
            int countyCount = counties.Count;
            int courtCount = courts.Count;
            int caseTypeCount = caseTypes.Count; 

            message = message + $"{circuitCount} circuits found, ";   
            message = message + $"{countyCount} counties found, "; 
            message = message + $"{courtCount} courts found, ";
            message = message + $"{caseTypeCount} case types found. ";    

            response.Result = "success";
            response.Message = message;
            response.Circuits = circuits;
            response.Counties = counties;
            response.Courts = courts;
            response.CaseTypes = caseTypes;
        }
        catch(Exception e)
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
        string connectionString = $"data source={serverName}; database={databaseName}; Integrated Security=true; MultipleActiveResultSets=True";
        return connectionString;
    }
}