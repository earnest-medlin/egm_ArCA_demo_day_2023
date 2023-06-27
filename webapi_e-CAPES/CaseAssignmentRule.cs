using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_e_CAPES
{
    public class CaseAssignmentRule
    {
        public int RuleNumber { get; set;}

        public int CircuitId { get; set;}

        public string CircuitDescription { get; set;}

        public string CountyId  { get; set;}

        public string CountyName  { get; set;}

        public string CourtCode { get; set;}

        public string CourtDescription { get; set;}

        public string CaseTypeCode { get; set;}

        public string CaseTypeDescription { get; set;}

        public string AssignmentMethod { get; set;}

        public DateTime RuleBeginDate { get; set;}

        public DateTime? RuleEndDate { get; set;}

        public DateTime? DateLastModified { get; set;}

        public string ModifiedByUserId { get; set;}

        public int CaseAssignmentRuleCount { get; set; }  

        public CaseAssignmentRule()
        {

        }
        public CaseAssignmentRule (int ruleNumber, int circuitId, string countyId, string courtCode, string caseTypeCode, string assignmentMedthod, DateTime ruleBeginDate, DateTime? ruleEndDate, DateTime? dateLastModified, string modifiedByUserId )
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
        public CaseAssignmentRule (int circuitId, string countyId, string courtCode, string caseTypeCode, string assignmentMedthod, DateTime ruleBeginDate, DateTime? dateLastModified, string modifiedByUserId )
        {
            CircuitId = circuitId;
            CountyId = countyId;
            CourtCode = courtCode;
            CaseTypeCode = caseTypeCode;
            AssignmentMethod = assignmentMedthod;
            RuleBeginDate = ruleBeginDate;
            //RuleEndDate = ruleEndDate;
            DateLastModified = dateLastModified;
            ModifiedByUserId = modifiedByUserId;
        }
        //public static List<CaseAssignmentRule> SearchCaseAssignmentRules(SqlConnection sqlConnection, string search = "")
        public static List<CaseAssignmentRule> SearchCaseAssignmentRules(SqlConnection sqlConnection,int pageSize = 10, int pageNumber = 1, int? circuitIdSearch = null, string? countyIdSearch = null,string? courtCodeSearch = null, string? caseTypeCodeSearch = null )
        {
            List<CaseAssignmentRule> caseAssignmentRules = new List<CaseAssignmentRule>();
            
            //string sqlSelect = "Select RuleNumber, CircuitId, CountyId, CourtCode, CaseTypeCode, AssignmentMethod, RuleBeginDate, RuleEndDate, DateLastModified, ModifiedByUserId, count(*) over () as CaseAssignmentRuleCount FROM Court_Case_Management.dbo.CaseAssignmentRule "; 
            //string sqlWhere = "where CircuitId like '%' + @CircuitId + '%' and CountyId like '%'+ @CountyId + '%' and CourtCode like '%' + @CourtCode + '%' and CaseTypeCode like '%' + @CaseTypeCode + '%';";
            //string sql = sqlSelect + sqlWhere;

            string sqlSelect = "Select r.RuleNumber, r.CircuitId, circ.CircuitDescription, r.CountyId, cnty.CountyName, r.CourtCode, cort.CourtDescription, r.CaseTypeCode, ct.CaseTypeDescription, r.AssignmentMethod, r.RuleBeginDate, r.RuleEndDate, r.DateLastModified, r.ModifiedByUserId, i.[Count] ";
            string sqlFrom = "FROM (Select RuleNumber, count(*) over () AS [Count] from Court_Case_Management.dbo.CaseAssignmentRule where CircuitId like '%' + @CircuitId + '%' and CountyId like '%'+ @CountyId + '%' and CourtCode like '%' + @CourtCode + '%' and CaseTypeCode like '%' + @CaseTypeCode + '%' order by RuleNumber offset @PageSize * (@PageNumber - 1) rows fetch next @PageSize rows only) i ";
            string sqlJoinRuleNumber = "join Court_Case_Management.dbo.CaseAssignmentRule r on r.RuleNumber = i.RuleNumber ";
            string sqlJoinCircuit = "join Court_Case_Management.dbo.Circuit circ on circ.CircuitId = r. CircuitId ";
            string sqlJoinCounty = "join Court_Case_Management.dbo.County cnty on cnty.CountyId = r.CountyId ";
            string sqlJoinCourt = "join Court_Case_Management.dbo.Court cort on cort.CourtCode = r.CourtCode ";
            string sqlJoinCaseType = "join Court_Case_Management.dbo.CaseType ct on ct.CaseTypeCode = r.CaseTypeCode Order by 1;";

            string sql = sqlSelect + sqlFrom + sqlJoinRuleNumber + sqlJoinCircuit + sqlJoinCounty + sqlJoinCourt + sqlJoinCaseType;


            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlParameter paramPageSize = new SqlParameter("@PageSize", pageSize);
            SqlParameter paramPageNumber = new SqlParameter("@PageNumber", pageNumber);
            SqlParameter paramCircuitIdSearch = new SqlParameter("@CircuitId", circuitIdSearch == 0 ? "" : circuitIdSearch.ToString());
            SqlParameter paramCountyIdSearch = new SqlParameter("@CountyId", countyIdSearch);
            SqlParameter paramCourtCodeSearch = new SqlParameter("@CourtCode", courtCodeSearch);
            SqlParameter paramCaseTypeCodeSearch = new SqlParameter("@CaseTypeCode", caseTypeCodeSearch);

            paramPageSize.DbType = System.Data.DbType.Int32;
            paramPageNumber.DbType = System.Data.DbType.Int32;
            paramCircuitIdSearch.DbType = System.Data.DbType.String;
            paramCountyIdSearch.DbType = System.Data.DbType.String;
            paramCourtCodeSearch.DbType = System.Data.DbType.String;
            paramCaseTypeCodeSearch.DbType = System.Data.DbType.String;

            sqlCommand.Parameters.Add(paramPageSize);
            sqlCommand.Parameters.Add(paramPageNumber);
            sqlCommand.Parameters.Add(paramCircuitIdSearch);
            sqlCommand.Parameters.Add(paramCountyIdSearch);
            sqlCommand.Parameters.Add(paramCourtCodeSearch);
            sqlCommand.Parameters.Add(paramCaseTypeCodeSearch);
           
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {   
                CaseAssignmentRule caseAssignmentRule = new CaseAssignmentRule();
                
                caseAssignmentRule.RuleNumber = Convert.ToInt32(sqlDataReader["RuleNumber"].ToString());
                caseAssignmentRule.CircuitId = Convert.ToInt32(sqlDataReader["CircuitId"].ToString());
                //Circuit Desc
                caseAssignmentRule.CircuitDescription = sqlDataReader["CircuitDescription"].ToString();
                caseAssignmentRule.CountyId = sqlDataReader["CountyId"].ToString();
                //County Name
                caseAssignmentRule.CountyName = sqlDataReader["CountyName"].ToString();
                caseAssignmentRule.CourtCode = sqlDataReader["CourtCode"].ToString();
                //Court Desc
                caseAssignmentRule.CourtDescription = sqlDataReader["CourtDescription"].ToString();
                caseAssignmentRule.CaseTypeCode = sqlDataReader["CaseTypeCode"].ToString();
                //Case Type Desc
                caseAssignmentRule.CaseTypeDescription = sqlDataReader["CaseTypeDescription"].ToString();
                caseAssignmentRule.AssignmentMethod = sqlDataReader["AssignmentMethod"].ToString();
                caseAssignmentRule.RuleBeginDate = Convert.ToDateTime((sqlDataReader["RuleBeginDate"].ToString()));
                caseAssignmentRule.RuleEndDate = (sqlDataReader["RuleEndDate"] == DBNull.Value) ? null : Convert.ToDateTime((sqlDataReader["RuleEndDate"].ToString()));
                caseAssignmentRule.DateLastModified = Convert.ToDateTime((sqlDataReader["DateLastModified"].ToString()));
                caseAssignmentRule.ModifiedByUserId = sqlDataReader["ModifiedByUserId"].ToString();
                caseAssignmentRule.CaseAssignmentRuleCount = Convert.ToInt32(sqlDataReader["Count"].ToString());

                caseAssignmentRules.Add(caseAssignmentRule);
            }
            return caseAssignmentRules;
        }
        
        public static int InsertCaseAssignmentRule(CaseAssignmentRule caseAssignmentRule, SqlConnection sqlConnection)
        {
            //string sqlInsert = "insert into CaseAssignmentRule (CircuitId, CountyId, CourtCode, CaseTypeCode, AssignmentMethod, RuleBeginDate, RuleEndDate, DateLastModified, ModifiedByUserId) ";
            //string sqlValues = "values ( @CircuitId , @CountyId , @CourtCode , @CaseTypeCode , @AssignmentMethod , @RuleBeginDate , @RuleEndDate , @DateLastModified , @ModifiedByUserId );";
            //string sql = sqlInsert + sqlValues;

            string sqlInsert = "insert into Court_Case_Management.dbo.CaseAssignmentRule (CircuitId, CountyId, CourtCode, CaseTypeCode, AssignmentMethod, RuleBeginDate, DateLastModified, ModifiedByUserId) ";
            string sqlValues = "values ( @CircuitId , @CountyId , @CourtCode , @CaseTypeCode , @AssignmentMethod , @RuleBeginDate , @DateLastModified , @ModifiedByUserId );";
            string sql = sqlInsert + sqlValues;

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;
            
            SqlParameter paramCircuitId = new SqlParameter("@CircuitId", caseAssignmentRule.CircuitId);
            SqlParameter paramCountyId = new SqlParameter("@CountyId", caseAssignmentRule.CountyId);
            SqlParameter paramCourtCode = new SqlParameter("@CourtCode", caseAssignmentRule.CourtCode);
            SqlParameter paramCaseTypeCode = new SqlParameter("@CaseTypeCode", caseAssignmentRule.CaseTypeCode);
            SqlParameter paramAssignmentMethod = new SqlParameter("@AssignmentMethod", caseAssignmentRule.AssignmentMethod);
            SqlParameter paramRuleBeginDate = new SqlParameter("@RuleBeginDate", caseAssignmentRule.RuleBeginDate);
            //SqlParameter paramRuleEndDate = new SqlParameter("@RuleEndDate", caseAssignmentRule.RuleEndDate == null ? DBNull.Value : caseAssignmentRule.RuleEndDate);
            SqlParameter paramDateLastModified = new SqlParameter("@DateLastModified", caseAssignmentRule.DateLastModified == null ? DateTime.Now : caseAssignmentRule.DateLastModified);
            SqlParameter paramModifiedByUserId = new SqlParameter("@ModifiedByUserId", caseAssignmentRule.ModifiedByUserId);
            
            paramCircuitId.DbType = System.Data.DbType.Int32;
            paramCountyId.DbType = System.Data.DbType.String;
            paramCourtCode.DbType = System.Data.DbType.String;
            paramCaseTypeCode.DbType = System.Data.DbType.String;
            paramAssignmentMethod.DbType = System.Data.DbType.String;
            paramRuleBeginDate.DbType = System.Data.DbType.DateTime;
            //paramRuleEndDate.DbType = System.Data.DbType.DateTime2;
            paramDateLastModified.DbType = System.Data.DbType.DateTime2;
            paramModifiedByUserId.DbType = System.Data.DbType.String;

            sqlCommand.Parameters.Add(paramCircuitId);
            sqlCommand.Parameters.Add(paramCountyId);
            sqlCommand.Parameters.Add(paramCourtCode);
            sqlCommand.Parameters.Add(paramCaseTypeCode);
            sqlCommand.Parameters.Add(paramAssignmentMethod);
            sqlCommand.Parameters.Add(paramRuleBeginDate);
            //sqlCommand.Parameters.Add(paramRuleEndDate);
            sqlCommand.Parameters.Add(paramDateLastModified);
            sqlCommand.Parameters.Add(paramModifiedByUserId);

            int rowsAffected = sqlCommand.ExecuteNonQuery();

            return rowsAffected;
        }

        public static int DeleteCaseAssignmentRule(int ruleNumber, SqlConnection sqlConnection)
        {
            string sqlDelete = "delete from Court_Case_Management.dbo.CaseAssignmentRule ";
            string sqlWhere = "where RuleNumber = @RuleNumber;";
            string sql = sqlDelete + sqlWhere;

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlParameter paramRuleNumber = new SqlParameter("@RuleNumber", ruleNumber);
            paramRuleNumber.DbType = System.Data.DbType.Int32;
            sqlCommand.Parameters.Add(paramRuleNumber);

            int rowsAffected = sqlCommand.ExecuteNonQuery();
            return rowsAffected;
        }

        public static int UpdateCaseAssignmentRule(CaseAssignmentRule caseAssignmentRule, SqlConnection sqlConnection)
        {
            string sqlUpdate = "update Court_Case_Management.dbo.CaseAssignmentRule ";
            string sqlSet = "set CircuitId = @CircuitId, CountyId = @CountyId, CourtCode = @CourtCode, CaseTypeCode = @CaseTypeCode, AssignmentMethod = @AssignmentMethod, RuleBeginDate = @RuleBeginDate, RuleEndDate = @RuleEndDate, DateLastModified = @DateLastModified, ModifiedByUserId = @ModifiedByUserId ";
            string sqlWhere = "where RuleNumber = @RuleNumber;";
            string sql = sqlUpdate + sqlSet + sqlWhere;

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlParameter paramRuleNumber = new SqlParameter("@RuleNumber", caseAssignmentRule.RuleNumber);
            SqlParameter paramCircuitId = new SqlParameter("@CircuitId", caseAssignmentRule.CircuitId);
            SqlParameter paramCountyId = new SqlParameter("@CountyId", caseAssignmentRule.CountyId);
            SqlParameter paramCourtCode = new SqlParameter("@CourtCode", caseAssignmentRule.CourtCode);
            SqlParameter paramCaseTypeCode = new SqlParameter("@CaseTypeCode", caseAssignmentRule.CaseTypeCode);
            SqlParameter paramAssignmentMethod = new SqlParameter("@AssignmentMethod", caseAssignmentRule.AssignmentMethod);
            SqlParameter paramRuleBeginDate = new SqlParameter("@RuleBeginDate", caseAssignmentRule.RuleBeginDate);
            SqlParameter paramRuleEndDate = new SqlParameter("@RuleEndDate", caseAssignmentRule.RuleEndDate == null ? (object)DBNull.Value : caseAssignmentRule.RuleEndDate);
            SqlParameter paramDateLastModified = new SqlParameter("@DateLastModified", caseAssignmentRule.DateLastModified == null ? DateTime.Now : caseAssignmentRule.DateLastModified);
            SqlParameter paramModifiedByUserId = new SqlParameter("@ModifiedByUserId", caseAssignmentRule.ModifiedByUserId);

            paramRuleNumber.DbType = System.Data.DbType.Int32;
            paramCircuitId.DbType = System.Data.DbType.Int32;
            paramCountyId.DbType = System.Data.DbType.String;
            paramCourtCode.DbType = System.Data.DbType.String;
            paramCaseTypeCode.DbType = System.Data.DbType.String;
            paramAssignmentMethod.DbType = System.Data.DbType.String;
            paramRuleBeginDate.DbType = System.Data.DbType.DateTime;
            paramRuleEndDate.DbType = System.Data.DbType.DateTime2;
            paramDateLastModified.DbType = System.Data.DbType.DateTime2;
            paramModifiedByUserId.DbType = System.Data.DbType.String;

            sqlCommand.Parameters.Add(paramRuleNumber);
            sqlCommand.Parameters.Add(paramCircuitId);
            sqlCommand.Parameters.Add(paramCountyId);
            sqlCommand.Parameters.Add(paramCourtCode);
            sqlCommand.Parameters.Add(paramCaseTypeCode);
            sqlCommand.Parameters.Add(paramAssignmentMethod);
            sqlCommand.Parameters.Add(paramRuleBeginDate);
            sqlCommand.Parameters.Add(paramRuleEndDate);
            sqlCommand.Parameters.Add(paramDateLastModified);
            sqlCommand.Parameters.Add(paramModifiedByUserId);

            int rowsAffected = sqlCommand.ExecuteNonQuery();
            return rowsAffected;
        }
    }
}