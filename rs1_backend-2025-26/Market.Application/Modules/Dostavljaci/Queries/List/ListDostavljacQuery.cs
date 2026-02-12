using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Queries.list
{
    public class ListDostavljacQuery : BasePagedQuery<ListDostavljacDto>
    {
        public string? Search { get; set; }
    }
}
