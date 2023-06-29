using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_e_CAPES
{
    public class JudgeAssignmentDistributionRule
    {
        public int? RuleNumber { get; set;}

        public string? JudgeId  { get; set;}

        public string? JudgeName { get; set;}

        public int? AssignmentPercentage { get; set;}

        public int? AssignmentPriority { get; set;}

        public DateTime? DateLastModified { get; set;}

        public string? ModifiedByUserId { get; set;}

        public int JudgeAssignmentDistributionRuleCount { get; set; }

         public JudgeAssignmentDistributionRule()
        {
            RuleNumber = null;
            JudgeId = null;
            JudgeName = null;
            AssignmentPercentage = null;
            AssignmentPriority = null;
            DateLastModified = null;
            ModifiedByUserId = null;

        }
        public JudgeAssignmentDistributionRule( int ruleNumber, string judgeId, string judgeName , int assignmentPercentage, int assignmentPriority, DateTime? dateLastModified, string modifiedByUserId )
        {
            RuleNumber = ruleNumber;
            JudgeId = judgeId;
            JudgeName = judgeName;
            AssignmentPercentage = assignmentPercentage;
            AssignmentPriority = assignmentPriority;
            DateLastModified = dateLastModified;
            ModifiedByUserId = modifiedByUserId;
        }

        public JudgeAssignmentDistributionRule( int ruleNumber,  string judgeId, int assignmentPercentage, int assignmentPriority, DateTime? dateLastModified, string modifiedByUserId )
        {
            RuleNumber = ruleNumber;
            JudgeId = judgeId;
            AssignmentPercentage = assignmentPercentage;
            AssignmentPriority = assignmentPriority;
            DateLastModified = dateLastModified;
            ModifiedByUserId = modifiedByUserId;
        }

        public static List<JudgeAssignmentDistributionRule> GetJudgeAssignmentDistributionRules(SqlConnection sqlConnection, int ruleNumberGet)
        {
            List<JudgeAssignmentDistributionRule> judgeAssignmentDistributionRules = new List<JudgeAssignmentDistributionRule>();
            
            string sqlSelect = "SELECT J.RuleNumber, J.JudgeId,	P.PersonFirstName + ' ' + P.PersonLastName AS JudgeName, J.AssignmentPercentage,	J.AssignmentPriority, J.DateLastModified, J.ModifiedByUserId, count(*) over () as JudgeAssignmentDistributionRuleCount ";
            string sqlFrom = "FROM Court_Case_Management.dbo.JudgeAssignmentDistribution J ";
            string sqlJoinCircuitJudge = "JOIN Court_Case_Management.dbo.CircuitJudge C ON C.JudgeId = J.JudgeId ";
            string sqlJoinAttorney ="JOIN Court_Case_Management.dbo.Attorney A ON A.AttorneyId = C.AttorneyId ";
            string sqlJoinPerson = "JOIN Court_Case_Management.dbo.Person P ON P.PersonIdNumber = A.PersonIdNumber ";
            string sqlWhere = "where J.RuleNumber = @RuleNumber ;";
            
            string sql = sqlSelect + sqlFrom + sqlJoinCircuitJudge + sqlJoinAttorney + sqlJoinPerson + sqlWhere;
            
            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlParameter paramRuleNumberGet = new SqlParameter("@RuleNumber", ruleNumberGet);

            paramRuleNumberGet.DbType = System.Data.DbType.Int32;

            sqlCommand.Parameters.Add(paramRuleNumberGet);

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {   
                JudgeAssignmentDistributionRule judgeAssignmentDistributionRule = new JudgeAssignmentDistributionRule();

                judgeAssignmentDistributionRule.RuleNumber = Convert.ToInt32(sqlDataReader["RuleNumber"].ToString());
                judgeAssignmentDistributionRule.JudgeId = sqlDataReader["JudgeId"].ToString();
                judgeAssignmentDistributionRule.JudgeName = sqlDataReader["JudgeName"].ToString();
                judgeAssignmentDistributionRule.AssignmentPercentage = Convert.ToInt32(sqlDataReader["AssignmentPercentage"].ToString());
                judgeAssignmentDistributionRule.AssignmentPriority = Convert.ToInt32(sqlDataReader["AssignmentPriority"].ToString());
                judgeAssignmentDistributionRule.DateLastModified = Convert.ToDateTime((sqlDataReader["DateLastModified"].ToString()));
                judgeAssignmentDistributionRule.ModifiedByUserId = sqlDataReader["ModifiedByUserId"].ToString();
                judgeAssignmentDistributionRule.JudgeAssignmentDistributionRuleCount = Convert.ToInt32(sqlDataReader["JudgeAssignmentDistributionRuleCount"].ToString());

                judgeAssignmentDistributionRules.Add(judgeAssignmentDistributionRule);
            }
            return judgeAssignmentDistributionRules;
        }

        public static int InsertJudgeAssignmentDistributionRule(JudgeAssignmentDistributionRule judgeAssignmentDistributionRule, SqlConnection sqlConnection)
        {
            string sqlInsert = "insert into Court_Case_Management.dbo.JudgeAssignmentDistribution (RuleNumber, JudgeId, AssignmentPercentage, AssignmentPriority, DateLastModified, ModifiedByUserId) ";
            string sqlValues = "values ( @RuleNumber, @JudgeId, @AssignmentPercentage, @AssignmentPriority, @DateLastModified , @ModifiedByUserId );";
            string sql = sqlInsert + sqlValues;

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlParameter paramRuleNumber = new SqlParameter("@RuleNumber", judgeAssignmentDistributionRule.RuleNumber);
            SqlParameter paramJudgeId = new SqlParameter("@JudgeId", judgeAssignmentDistributionRule.JudgeId); 
            SqlParameter paramAssignmentPercentage = new SqlParameter("@AssignmentPercentage", judgeAssignmentDistributionRule.AssignmentPercentage);
            SqlParameter paramAssignmentPriority = new SqlParameter("@AssignmentPriority", judgeAssignmentDistributionRule.AssignmentPriority);
            SqlParameter paramDateLastModified = new SqlParameter("@DateLastModified", judgeAssignmentDistributionRule.DateLastModified == null ? DateTime.Now : judgeAssignmentDistributionRule.DateLastModified);
            SqlParameter paramModifiedByUserId = new SqlParameter("@ModifiedByUserId", judgeAssignmentDistributionRule.ModifiedByUserId);

            paramRuleNumber.DbType = System.Data.DbType.Int32;
            paramJudgeId.DbType = System.Data.DbType.String;
            paramAssignmentPercentage.DbType = System.Data.DbType.Int32;
            paramAssignmentPriority.DbType = System.Data.DbType.Int32;
            paramDateLastModified.DbType = System.Data.DbType.DateTime2;
            paramModifiedByUserId.DbType = System.Data.DbType.String;

            sqlCommand.Parameters.Add(paramRuleNumber);
            sqlCommand.Parameters.Add(paramJudgeId);
            sqlCommand.Parameters.Add(paramAssignmentPercentage);
            sqlCommand.Parameters.Add(paramAssignmentPriority);
            sqlCommand.Parameters.Add(paramDateLastModified);
            sqlCommand.Parameters.Add(paramModifiedByUserId);

            int rowsAffected = sqlCommand.ExecuteNonQuery();

            return rowsAffected;
        }

        public static int UpdateJudgeAssignmentRule(JudgeAssignmentDistributionRule judgeAssignmentDistributionRule, SqlConnection sqlConnection)
        {
            string sqlUpdate = "update Court_Case_Management.dbo.JudgeAssignmentDistribution ";
            string sqlSet = "set AssignmentPercentage = @AssignmentPercentage, AssignmentPriority = @AssignmentPriority, DateLastModified = @DateLastModified, ModifiedByUserId = @ModifiedByUserId ";
            string sqlWhere = "where RuleNumber = @RuleNumber and JudgeId = @JudgeId;";
            string sql = sqlUpdate + sqlSet + sqlWhere;


            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlParameter paramRuleNumber = new SqlParameter("@RuleNumber", judgeAssignmentDistributionRule.RuleNumber);
            SqlParameter paramJudgeId = new SqlParameter("@JudgeId", judgeAssignmentDistributionRule.JudgeId); 
            SqlParameter paramAssignmentPercentage = new SqlParameter("@AssignmentPercentage", judgeAssignmentDistributionRule.AssignmentPercentage);
            SqlParameter paramAssignmentPriority = new SqlParameter("@AssignmentPriority", judgeAssignmentDistributionRule.AssignmentPriority);
            SqlParameter paramDateLastModified = new SqlParameter("@DateLastModified", judgeAssignmentDistributionRule.DateLastModified == null ? DateTime.Now : judgeAssignmentDistributionRule.DateLastModified);
            SqlParameter paramModifiedByUserId = new SqlParameter("@ModifiedByUserId", judgeAssignmentDistributionRule.ModifiedByUserId);

            paramRuleNumber.DbType = System.Data.DbType.Int32;
            paramJudgeId.DbType = System.Data.DbType.String;
            paramAssignmentPercentage.DbType = System.Data.DbType.Int32;
            paramAssignmentPriority.DbType = System.Data.DbType.Int32;
            paramDateLastModified.DbType = System.Data.DbType.DateTime2;
            paramModifiedByUserId.DbType = System.Data.DbType.String;

            sqlCommand.Parameters.Add(paramRuleNumber);
            sqlCommand.Parameters.Add(paramJudgeId);
            sqlCommand.Parameters.Add(paramAssignmentPercentage);
            sqlCommand.Parameters.Add(paramAssignmentPriority);
            sqlCommand.Parameters.Add(paramDateLastModified);
            sqlCommand.Parameters.Add(paramModifiedByUserId);

            int rowsAffected = sqlCommand.ExecuteNonQuery();
            return rowsAffected;
        }

        public static int DeleteJudgeAssignmentDistributionRule(int ruleNumber, string judgeId, SqlConnection sqlConnection)
        {
            string sqlDelete = "delete from Court_Case_Management.dbo.JudgeAssignmentDistribution ";
            string sqlWhere = "where RuleNumber = @RuleNumber and JudgeId = @JudgeId;";
            string sql = sqlDelete + sqlWhere;

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlParameter paramRuleNumber = new SqlParameter("@RuleNumber", ruleNumber);
            SqlParameter paramJudgeId = new SqlParameter("@JudgeId", judgeId); 
            
            paramRuleNumber.DbType = System.Data.DbType.Int32;
            paramJudgeId.DbType = System.Data.DbType.String;

            sqlCommand.Parameters.Add(paramRuleNumber);
            sqlCommand.Parameters.Add(paramJudgeId);

            int rowsAffected = sqlCommand.ExecuteNonQuery();
            return rowsAffected;
        }

    } 
}