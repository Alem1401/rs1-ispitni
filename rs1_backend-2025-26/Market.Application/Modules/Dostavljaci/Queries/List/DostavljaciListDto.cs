using Market.Domain.Entities.Dostavljaci;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Queries.List
{
    public class DostavljaciListDto
    {
      

        public int Id { get; set; }

     
        public string Kod { get; set; }

        public TipDostavljaca Tip { get; set; }

        public string Naziv { get; set; }
        public bool Aktivan { get; set; }
    }
}
