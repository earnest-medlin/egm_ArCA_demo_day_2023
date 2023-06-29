using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace webapi_e_CAPES.Controllers;

[ApiController]
[Route("[controller]")]
public class JudgeAssignmentDistributionRuleController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public JudgeAssignmentDistributionRuleController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("/GetJudgeAssignmentDistributionRules")]

    public Response GetJudgeAssignmentDistributionRules(string ruleNumberGet)
    {
        Response response = new Response();
        try
        {
            List<JudgeAssignmentDistributionRule> judgeAssignmentDistributionRules = new List<JudgeAssignmentDistributionRule>();
            string connectionString = GetConnectionString();
            using(SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                judgeAssignmentDistributionRules = JudgeAssignmentDistributionRule.GetJudgeAssignmentDistributionRules(sqlConnection,Convert.ToInt32(ruleNumberGet));
            }

            string message = "";
            //int judgeAssignmentDistributionRuleRuleNumber = judgeAssignmentDistributionRules[0].RuleNumber;
            int judgeAssignmentDistributionRuleRuleNumber = Convert.ToInt32(ruleNumberGet);

            if(judgeAssignmentDistributionRules.Count() > 0)
            {
                int judgeAssignmentDistributionRuleRuleCount = judgeAssignmentDistributionRules[0].JudgeAssignmentDistributionRuleCount;
                message = $"Found {judgeAssignmentDistributionRuleRuleCount} judge distribution rules for rule number {judgeAssignmentDistributionRuleRuleNumber}.";
            }
            else
            {
                message = $"No judge distribution rules exist for rule number {judgeAssignmentDistributionRuleRuleNumber}.";
            }

            response.Result = "success";
            response.Message = message;
            response.JudgeAssignmentDistributionRules = judgeAssignmentDistributionRules;
        }
        catch (Exception e)
        {
            response.Result = "failure";
            string message = "";
            message = "No Judge Distribution Assignments exists for Rule Number: " + ruleNumberGet;
            response.Message = message;
            List<JudgeAssignmentDistributionRule> nullJudgeAssignmentDistributionRules = new List<JudgeAssignmentDistributionRule>();
            response.JudgeAssignmentDistributionRules = nullJudgeAssignmentDistributionRules;
            //Create a null Distribution Rule add to dist rule list and send that maybe???
        }
        return response;
    }

    [HttpPost]
    [Route("/InsertJudgeAssignmentDistributionRule")]

     public Response InsertCaseAssignmentRule(string ruleNumber, string judgeId, string assignmentPercentage, string assignmentPriority, string? dateLastModified, string modifiedByUserId)
     {
        Response response = new Response();
        try
        {
            List<JudgeAssignmentDistributionRule> judgeAssignmentDistributionRules = new List<JudgeAssignmentDistributionRule>();
            
            DateTime? editDate = dateLastModified == null ? null : Convert.ToDateTime(dateLastModified);

            JudgeAssignmentDistributionRule judgeAssignmentDistributionRule = new JudgeAssignmentDistributionRule(Convert.ToInt32(ruleNumber), judgeId, Convert.ToInt32(assignmentPercentage), Convert.ToInt32(assignmentPriority), editDate, modifiedByUserId);

            int rowsAffected = 0;

            string connectionString = GetConnectionString();
            using(SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                rowsAffected = JudgeAssignmentDistributionRule.InsertJudgeAssignmentDistributionRule(judgeAssignmentDistributionRule, sqlConnection);
                //TO-DO
                //judgeAssignmentDistributionRules = JudgeAssignmentDistributionRule.GetJudgeAssignmentDistributionRules(sqlConnection);
            }

            response.Result = (rowsAffected == 1) ? "success" : "failure";
            response.Message = $"{rowsAffected} rows affected.";

        }
        catch (Exception e)
        {
            response.Result = "failure";
            response.Message = e.Message;
        }

        return response;
     }

    [HttpPut]
    [Route("/UpdateJudgeAssignmentDistributionRule")]

    public Response UpdateJudgeAssignmentDistributionRule(string ruleNumber, string judgeId, string assignmentPercentage, string assignmentPriority, string? dateLastModified, string modifiedByUserId)
    {
        Response response = new Response();
        try
        {
            List<JudgeAssignmentDistributionRule> judgeAssignmentDistributionRules = new List<JudgeAssignmentDistributionRule>();

            DateTime? editDate = dateLastModified == null ? null : Convert.ToDateTime(dateLastModified);

            JudgeAssignmentDistributionRule judgeAssignmentDistributionRule = new JudgeAssignmentDistributionRule(Convert.ToInt32(ruleNumber), judgeId, Convert.ToInt32(assignmentPercentage), Convert.ToInt32(assignmentPriority), editDate, modifiedByUserId);

            int rowsAffected = 0;

            string connectionString = GetConnectionString();
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                rowsAffected = JudgeAssignmentDistributionRule.UpdateJudgeAssignmentRule(judgeAssignmentDistributionRule, sqlConnection);
                //TO-DO
                //judgeAssignmentDistributionRules = JudgeAssignmentDistributionRule.GetJudgeAssignmentDistributionRules(sqlConnection);
            }

            response.Result = (rowsAffected == 1) ? "success" : "failure";
            response.Message = $"{rowsAffected} rows affected.";
        }
        catch(Exception e)
        {
            response.Result = "failure";
            response.Message = e.Message;   
        }
        return response;
    }

    [HttpDelete]
    [Route("/DeleteJudgeAssignmentDistributionRule")]
    public Response DeleteJudgeAssignmentDistributionRule(string ruleNumber, string judgeId)
    {
        Response response = new Response();
        try
        {
            List<JudgeAssignmentDistributionRule> judgeAssignmentDistributionRules = new List<JudgeAssignmentDistributionRule>();
            
            JudgeAssignmentDistributionRule judgeAssignmentDistributionRule = new JudgeAssignmentDistributionRule();

             int rowsAffected = 0;

            string connectionString = GetConnectionString();
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                rowsAffected = JudgeAssignmentDistributionRule.DeleteJudgeAssignmentDistributionRule(Convert.ToInt32(ruleNumber), judgeId, sqlConnection);
            }
            
            response.Result = (rowsAffected == 1) ? "success" : "failure";
            response.Message = $"{rowsAffected} rows affected.";
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
        string connectionString = $"data source={serverName}; database={databaseName}; Integrated Security=true;";
        return connectionString;
    }
}