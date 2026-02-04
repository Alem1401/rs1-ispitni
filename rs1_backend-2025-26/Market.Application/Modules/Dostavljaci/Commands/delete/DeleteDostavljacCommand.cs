using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Commands.delete
{
    public class DeleteDostavljacCommand : IRequest<Unit>
    {
        public int Id {  get; set; }
    }
}
