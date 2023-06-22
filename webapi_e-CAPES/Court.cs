using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_e_CAPES
{
    public class Court
    {
        public string CourtCode { get; set;}
        public string CourtDescription { get; set;}
        public int CourtCount { get; set;}

        public Court()
        {

        }

        public Court(string courtCode, string courtDescription, int courtCount)
        {
            CourtCode = courtCode;
            CourtDescription = courtDescription;
            CourtCount = courtCount;
        }

        public static List<Court> GetCourts(SqlConnection sqlConnection)
        {
            List<Court> courts = new List<Court>();
            string sql = "select CourtCode, CourtDescription, count(*) over () as CourtCount from Court_Case_Management.dbo.Court;";

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {
                Court court = new Court();

                court.CourtCode = sqlDataReader["CourtCode"].ToString();
                court.CourtDescription = sqlDataReader["CourtDescription"].ToString();
                court.CourtCount = Convert.ToInt32(sqlDataReader["CourtCount"].ToString());
               
                courts.Add(court);
            }
            return courts;
        }
    }
}