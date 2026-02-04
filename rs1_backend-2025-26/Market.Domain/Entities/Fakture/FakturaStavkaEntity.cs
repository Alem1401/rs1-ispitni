using Market.Domain.Common;
using Market.Domain.Entities.Catalog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Domain.Entities.Fakture
{
    public class FakturaStavkaEntity : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }

        public int FakturaId { get; set; }
        public FakturaEntity Faktura {  get; set; }

        public int CategoryId { get; set; }

        public ProductCategoryEntity Category { get; set; }
    }
}
