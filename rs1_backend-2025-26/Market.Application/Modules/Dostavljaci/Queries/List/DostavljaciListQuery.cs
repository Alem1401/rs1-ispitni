using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Queries.List
{
    public class DostavljaciListQuery : BasePagedQuery<DostavljaciListDto>
    {
        public string?  Search { get; set; }
    }
}
