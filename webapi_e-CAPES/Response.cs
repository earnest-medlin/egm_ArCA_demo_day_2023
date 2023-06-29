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
        public List<JudgeAssignmentDistributionRule>? JudgeAssignmentDistributionRules { get; set; }
        public List<Circuit> Circuits { get; set;}
        public List<County> Counties { get; set; }
        public List<Court> Courts { get; set;}
        public List<CaseType> CaseTypes { get; set; }
    }
}