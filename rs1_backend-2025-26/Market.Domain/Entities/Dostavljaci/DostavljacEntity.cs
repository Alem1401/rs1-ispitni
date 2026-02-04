using Market.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Domain.Entities.Dostavljaci
{
    public class DostavljacEntity : BaseEntity
    {


        [MaxLength(3)]
        public string Kod { get; set; }

        public TipDostavljaca Tip {  get; set; }

        public string Naziv {  get; set; }
        public bool Aktivan {  get; set; } 
    }
}
