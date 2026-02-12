using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Fakture.Commands
{
    public class FakturaStavkaDto
    {
        public int ProductCategoryId { get; set; }
        public string Name { get; set; }

        public int Quantity {  get; set; }
    }
}
