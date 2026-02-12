using Market.Domain.Entities.Dostavljaci;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Commands.update
{
    public class UpdateDostavljacCommand : IRequest<Unit>
    {
        [JsonIgnore]

        public int Id {  get; set; }
        public string Naziv { get; set; }
        public string Kod { get; set; }

        public TipDostavljaca Tip { get; set; }

        public bool isAktivan { get; set; }
    }
}
