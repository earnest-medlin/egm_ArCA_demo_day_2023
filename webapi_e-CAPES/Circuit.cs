using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_e_CAPES
{
    public class Circuit
    {
        public int CircuitId { get; set;}

        public string CircuitCode  { get; set;}

        public string CircuitDescription { get; set; }

        public int CircuitCount { get; set; }

        public Circuit()
        {

        }

        public Circuit(int circuitId, string circuitCode, string circuitDescription, int circuitCount)
        {
            CircuitId = circuitId;
            CircuitCode = circuitCode;
            CircuitDescription = circuitDescription;
            CircuitCount = circuitCount;
        }

        public static List<Circuit> GetCircuits(SqlConnection sqlConnection)
        {
            List<Circuit> circuits = new List<Circuit>();
            string sql = "select CircuitId, CircuitCode, CircuitDescription, count(*) over () as CircuitCount from Court_Case_Management.dbo.Circuit;";

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            while (sqlDataReader.Read())
            {
                Circuit circuit = new Circuit();

                circuit.CircuitId = Convert.ToInt32(sqlDataReader["CircuitId"].ToString());
                circuit.CircuitCode = sqlDataReader["CircuitCode"].ToString();
                circuit.CircuitDescription = sqlDataReader["CircuitDescription"].ToString();
                circuit.CircuitCount = Convert.ToInt32(sqlDataReader["CircuitId"].ToString());

                circuits.Add(circuit);
            }
            return circuits;
        }

    }
}