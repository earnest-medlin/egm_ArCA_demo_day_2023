using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_e_CAPES
{
    public class County
    {
        public string CountyId { get; set; }
        public string CountyName { get; set; }
        public int CircuitId { get; set;}
        public int CountyCount { get; set; }

        public County()
        {

        }

        public County(string countyId, string countyName, int circuitId, int countyCount)
        {
            CountyId = countyId;
            CountyName = countyName;
            CircuitId = circuitId;
            CountyCount = countyCount;
        }

        public static List<County> GetCounties(SqlConnection sqlConnection)
        {
            List<County> counties = new List<County>();
            string sql = "select CountyId, CountyName, CircuitId, count(*) over () as CountyCount from Court_Case_Management.dbo.County;";

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {
                County county = new County();

                county.CountyId = sqlDataReader["CountyId"].ToString();
                county.CountyName = sqlDataReader["CountyName"].ToString();
                county.CircuitId = Convert.ToInt32(sqlDataReader["CircuitId"].ToString());
                county.CountyCount = Convert.ToInt32(sqlDataReader["CountyCount"].ToString());

                counties.Add(county);
            }
            return counties;
        }
    }
}