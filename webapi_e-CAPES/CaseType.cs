using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_e_CAPES
{
    public class CaseType
    {
        public string CaseTypeCode { get; set; }
        public string CaseTypeDescription { get; set; }
        public int CaseTypeCount { get; set; }

        public CaseType()
        {

        }

        public CaseType(string caseTypeCode, string caseTypeDescription, int caseTypeCount)
        {
            CaseTypeCode = caseTypeCode;
            CaseTypeDescription = caseTypeDescription;
            CaseTypeCount = caseTypeCount;
        }

        public static List<CaseType> GetCaseTypes(SqlConnection sqlConnection)
        {
            List<CaseType> caseTypes = new List<CaseType>();
            string sql = "select CaseTypeCode, CaseTypeDescription, count(*) over () as CaseTypeCount from Court_Case_Management.dbo.CaseType;";

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {
                CaseType caseType = new CaseType();

                caseType.CaseTypeCode = sqlDataReader["CaseTypeCode"].ToString();
                caseType.CaseTypeDescription = sqlDataReader["CaseTypeDescription"].ToString();
                caseType.CaseTypeCount = Convert.ToInt32(sqlDataReader["CaseTypeCount"].ToString());
               
                caseTypes.Add(caseType);
            }
            return caseTypes;
        }
    }
}