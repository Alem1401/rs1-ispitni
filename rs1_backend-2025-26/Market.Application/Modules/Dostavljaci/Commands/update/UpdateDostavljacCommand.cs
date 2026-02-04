using Market.Domain.Entities.Dostavljaci;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Commands.update
{
    public class UpdateDostavljacCommand : IRequest<Unit>
    {
        [JsonIgnore]

        public int Id { get; set; }

        [MaxLength(3)]
        public string Kod { get; set; }

        public TipDostavljaca Tip { get; set; }

        public string Naziv { get; set; }
        public bool Aktivan { get; set; }
    }
}
