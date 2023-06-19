using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_e_CAPES
{
    public class Response
    {
        public string? Result { get; set; }
        public string? Message { get; set; }
        public List<CaseAssignmentRule>? CaseAssignmentRules { get; set; }
        
        //public List<JudgeAssignmentDistributionRule> JudgeAssignmentDistributionRules { get; set; }

        //public List<Employee>? Employees { get; set; }
        
        //public List<Department>? Departments { get; set; }
    }
}