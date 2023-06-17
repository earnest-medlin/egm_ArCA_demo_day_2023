using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_e_CAPES
{
    public class CaseAssignmentRule
    {
        public int RuleNumber { get; set;}

        public int CircuitId { get; set;}

        public string CountyId  { get; set;}

        public string CourtCode { get; set;}

        public string CaseTypeCode { get; set;}

        public string AssignmentMethod { get; set;}

        public DateOnly RuleBeginDate { get; set;}

        public DateOnly? RuleEndDate { get; set;}

        public DateTime DateLastModified { get; set;}

        public string ModifiedByUserId { get; set;}
        public int CaseAssignmentRuleCount { get; set; }  

        public CaseAssignmentRule()
        {

        }
        public CaseAssignmentRule (int ruleNumber, int circuitId, string countyId, string courtCode, string caseTypeCode, string assignmentMedthod, DateOnly ruleBeginDate, DateOnly? ruleEndDate, DateTime dateLastModified, string modifiedByUserId   )
        {
            RuleNumber = ruleNumber;
            CircuitId = circuitId;
            CountyId = countyId;
            CourtCode = courtCode;
            CaseTypeCode = caseTypeCode;
            AssignmentMethod = assignmentMedthod;
            RuleBeginDate = ruleBeginDate;
            RuleEndDate = ruleEndDate;
            DateLastModified = dateLastModified;
            ModifiedByUserId = modifiedByUserId;
        }
        //public static List<CaseAssignmentRule> SearchCaseAssignmentRules(SqlConnection sqlConnection, string search = "")
        public static List<CaseAssignmentRule> SearchCaseAssignmentRules(SqlConnection sqlConnection)
        {
            List<CaseAssignmentRule> caseAssignmentRules = new List<CaseAssignmentRule>();
            //TO DO: Search on multiple parameters, not just a single paramter or no parameter
            string sql = "Select RuleNumber, CircuitId, CountyId, CourtCode, CaseTypeCode, AssignmentMethod, RuleBeginDate, RuleEndDate, DateLastModified, ModifiedByUserId, count(*) over () as CaseAssignmentRuleCount FROM Court_Case_Management.dbo.CaseAssignmentRule;";
            
            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            //SqlParameter paramSearch = new SqlParameter("@Search", search);
            //paramSearch.DbType = System.Data.DbType.String;
            //sqlCommand.Parameters.Add(paramSearch);
            
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {   
                CaseAssignmentRule caseAssignmentRule = new CaseAssignmentRule();
                
                caseAssignmentRule.RuleNumber = Convert.ToInt32(sqlDataReader["RuleNumber"].ToString());
                caseAssignmentRule.CircuitId = Convert.ToInt32(sqlDataReader["CircuitId"].ToString());
                caseAssignmentRule.CountyId = sqlDataReader["CountyId"].ToString();
                caseAssignmentRule.CourtCode = sqlDataReader["CourtCode"].ToString();
                caseAssignmentRule.CaseTypeCode = sqlDataReader["CaseTypeCode"].ToString();
                caseAssignmentRule.AssignmentMethod = sqlDataReader["AssignmentMethod"].ToString();
                caseAssignmentRule.RuleBeginDate = DateOnly.FromDateTime(Convert.ToDateTime((sqlDataReader["RuleBeginDate"].ToString())));
                //caseAssignmentRule.RuleEndDate = DateOnly.FromDateTime(Convert.ToDateTime((sqlDataReader["RuleEndDate"].ToString())));
                caseAssignmentRule.RuleEndDate = (sqlDataReader["RuleEndDate"] == DBNull.Value) ? null : DateOnly.FromDateTime(Convert.ToDateTime((sqlDataReader["RuleEndDate"].ToString())));
                //employee.Salary = (sqlDataReader["Salary"] == DBNull.Value) ? null : Convert.ToDecimal(sqlDataReader["Salary"].ToString());
                caseAssignmentRule.DateLastModified = Convert.ToDateTime((sqlDataReader["DateLastModified"].ToString()));
                caseAssignmentRule.ModifiedByUserId = sqlDataReader["ModifiedByUserId"].ToString();
                caseAssignmentRule.CaseAssignmentRuleCount = Convert.ToInt32(sqlDataReader["CaseAssignmentRuleCount"].ToString());

                caseAssignmentRules.Add(caseAssignmentRule);
            }
            return caseAssignmentRules;
        }
    }
}