using Market.Domain.Entities.Dostavljaci;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Commands.create
{
    public class CreateDostavljacCommand : IRequest<int>
    {
        [MaxLength(3)]
        public string Kod { get; set; }

        public TipDostavljaca Tip { get; set; }

        public string Naziv { get; set; }
        public bool Aktivan { get; set; }
    }
}
