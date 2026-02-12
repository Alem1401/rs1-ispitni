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
        public FakturaEntity Faktura { get; set; }

        public int FakturaId { get; set; }

        public int Quantity { get; set; }

        public ProductCategoryEntity ProductCategory { get; set; }

        public int ProductCategoryId { get; set; }

        public string Name { get; set; }

       
        
    }
}
