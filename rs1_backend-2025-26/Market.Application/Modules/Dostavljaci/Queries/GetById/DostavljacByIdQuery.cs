using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Queries.getById
{
    public class DostavljacByIdQuery : IRequest<DostavljacByIdDto>
    {
      public  int Id {  get; set; }
    }
}
