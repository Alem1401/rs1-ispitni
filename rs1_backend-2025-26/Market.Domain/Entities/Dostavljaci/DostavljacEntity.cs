using Market.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Domain.Entities.Dostavljaci
{
    public class DostavljacEntity : BaseEntity
    {
        public string Naziv {  get; set; }
        public string Kod { get; set; }

        public TipDostavljaca Tip {  get; set; }

        public bool isAktivan { get; set; }
    }
}
