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
            CircuitId = circuitId; //Search on this field.
            CountyId = countyId; //Search on this field.
            CourtCode = courtCode; //Search on this field.
            CaseTypeCode = caseTypeCode; //Search on this field.
            AssignmentMethod = assignmentMedthod;
            RuleBeginDate = ruleBeginDate;
            RuleEndDate = ruleEndDate;
            DateLastModified = dateLastModified;
            ModifiedByUserId = modifiedByUserId;
        }
        //public static List<CaseAssignmentRule> SearchCaseAssignmentRules(SqlConnection sqlConnection, string search = "")
        public static List<CaseAssignmentRule> SearchCaseAssignmentRules(SqlConnection sqlConnection, int? circuitIdSearch = null, string? countyIdSearch = null,string? courtCodeSearch = null, string? caseTypeCodeSearch = null )
        {
            List<CaseAssignmentRule> caseAssignmentRules = new List<CaseAssignmentRule>();
            //TO DO: Search on multiple parameters, not just a single paramter or no parameter
            string sqlSelect = "Select RuleNumber, CircuitId, CountyId, CourtCode, CaseTypeCode, AssignmentMethod, RuleBeginDate, RuleEndDate, DateLastModified, ModifiedByUserId, count(*) over () as CaseAssignmentRuleCount FROM Court_Case_Management.dbo.CaseAssignmentRule";
            string sqlWhere;
            
            if(circuitIdSearch == 0 && countyIdSearch == "" && courtCodeSearch == "" && caseTypeCodeSearch == "")
            {
                sqlWhere = ";";
            }
            else if(countyIdSearch == "" && courtCodeSearch == "" && caseTypeCodeSearch == "") //B,C,D are null
            {
                sqlWhere = " where circuitId = " + circuitIdSearch + ";";	
            }
            else if(circuitIdSearch == 0 && courtCodeSearch == "" && caseTypeCodeSearch == "") //A,C,D are null
            {
                sqlWhere = " where countyId = " + "'" + countyIdSearch + "'" + ";";
            }
            else if(circuitIdSearch == 0 && countyIdSearch == "" && caseTypeCodeSearch == "") //A,B,D are null
            {
                sqlWhere = " where courtCode = " + "'" + courtCodeSearch + "'" + ";";
            }
            else if(circuitIdSearch == 0 && countyIdSearch == "" && courtCodeSearch == "") //A,B,C are null
            {
                sqlWhere = " where caseTypeCode = " + "'" + caseTypeCodeSearch + "'" + ";";
            }
            else if(courtCodeSearch == "" && caseTypeCodeSearch == "") // C,D ARE null
            {
                sqlWhere = " where circuitId = " + circuitIdSearch + " and countyId = " + "'" + countyIdSearch + "'" + ";";	
            }
            else if(countyIdSearch == "" && caseTypeCodeSearch == "") //B,D ARE null
            {
                sqlWhere = " where circuitId = " + circuitIdSearch + " and courtCode = " + "'" + courtCodeSearch + "'" + ";";	
            }
            else if(countyIdSearch == "" && courtCodeSearch == "") //B,C ARE null
            {
                sqlWhere = " where circuitId = " + circuitIdSearch + " and caseTypeCode = " + "'" + caseTypeCodeSearch + "'" + ";";	
            }
            else if(circuitIdSearch == 0 && caseTypeCodeSearch == "") //A,D ARE null
            {
                sqlWhere = " where countyId = " + "'" + countyIdSearch + "'" + " and courtCode = " + "'" + courtCodeSearch + "'" + ";";
            }
            else if(circuitIdSearch == 0 && courtCodeSearch == "") //A,C, ARE null
            {
                sqlWhere = " where countyId = " + "'" + countyIdSearch + "'" + " and caseTypeCode = " + "'" + caseTypeCodeSearch + "'" + ";";
            }
            else if(circuitIdSearch == 0 && countyIdSearch == "") //A,B ARE null
            {
                sqlWhere = " where courtCode = " + "'" + courtCodeSearch + "'" + " and caseTypeCode = " + "'" + caseTypeCodeSearch + "'" + ";";
            }
            else if(caseTypeCodeSearch == "") //D IS null
            {
                sqlWhere = " where circuitId = " + circuitIdSearch + " and countyId = " + "'" + countyIdSearch + "'" + " and courtCode = " + "'" + courtCodeSearch + "'" + ";";
            }
            else if(courtCodeSearch == "") //C IS null
            {
                sqlWhere = " where circuitId = " + circuitIdSearch + " and countyId = " + "'" + countyIdSearch + "'" + " and caseTypeCode = " + "'" + caseTypeCodeSearch + "'" + ";";
            }
            else if(countyIdSearch == "") //B IS null
            {
                sqlWhere = " where circuitId = " + circuitIdSearch + " and courtCode = " + "'" + courtCodeSearch + "'" + " and caseTypeCode = " + "'" + caseTypeCodeSearch + "'" + ";";
            }
            else if(circuitIdSearch == 0) //A IS null
            {
                sqlWhere = " where countyId = " + "'" + countyIdSearch + "'" + " and courtCode = " + "'" + courtCodeSearch + "'" + " and caseTypeCode = " + "'" + caseTypeCodeSearch + "'" + ";";
            }
            else //NO PARAMETERS ARE null
            {
                sqlWhere = " where circuitId = " + circuitIdSearch + " and countyId = " + "'" + countyIdSearch + "'" + " and courtCode = " + "'" + courtCodeSearch + "'" + " and caseTypeCode = " + "'" + caseTypeCodeSearch + "'" + ";";
            }

            string sql = sqlSelect + sqlWhere;

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlParameter paramCircuitIdSearch = new SqlParameter("@CircuitIdSearch", circuitIdSearch);
            SqlParameter paramCountyIdSearch = new SqlParameter("@CountyIdSearch", countyIdSearch);
            SqlParameter paramCourtCodeSearch = new SqlParameter("@CourtCodeSearch", courtCodeSearch);
            SqlParameter paramCaseTypeCodeSearch = new SqlParameter("@CaseTypeCodeSearch", caseTypeCodeSearch);

            paramCircuitIdSearch.DbType = System.Data.DbType.Int32;
            paramCountyIdSearch.DbType = System.Data.DbType.String;
            paramCourtCodeSearch.DbType = System.Data.DbType.String;
            paramCaseTypeCodeSearch.DbType = System.Data.DbType.String;

            sqlCommand.Parameters.Add(paramCircuitIdSearch);
            sqlCommand.Parameters.Add(paramCountyIdSearch);
            sqlCommand.Parameters.Add(paramCourtCodeSearch);
            sqlCommand.Parameters.Add(paramCaseTypeCodeSearch);

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
                caseAssignmentRule.DateLastModified = Convert.ToDateTime((sqlDataReader["DateLastModified"].ToString()));
                caseAssignmentRule.ModifiedByUserId = sqlDataReader["ModifiedByUserId"].ToString();
                caseAssignmentRule.CaseAssignmentRuleCount = Convert.ToInt32(sqlDataReader["CaseAssignmentRuleCount"].ToString());

                caseAssignmentRules.Add(caseAssignmentRule);
            }
            return caseAssignmentRules;
        }
    }
}