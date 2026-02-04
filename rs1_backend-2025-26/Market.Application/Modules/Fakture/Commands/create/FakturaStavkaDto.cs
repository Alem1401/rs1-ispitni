using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Fakture.Commands.create
{
    public class FakturaStavkaDto
    {
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public int Quantity { get; set; }

    }
}
