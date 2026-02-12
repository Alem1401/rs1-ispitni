using Market.Domain.Entities.Fakture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Fakture.Commands
{
    public class CreateFakturaStavkaCommandHandler(IAppDbContext ctx) : IRequestHandler<CreateFakturaCommand, int>
    {
        public async Task<int> Handle(CreateFakturaCommand request, CancellationToken cancellationToken)
        {
            var faktura = new FakturaEntity { BrojRacuna = request.BrojRacuna, Napomena = request.Napomena, Tip = request.Tip };
            var stavke = request.Stavke;
            var proizvodi = ctx.Products.ToList();
            if (faktura.Tip == FakturaTip.Ulazna)
            {
                foreach (var item in stavke)
                {

                    var nova = new FakturaStavkaEntity { Name = item.Name, ProductCategoryId = item.ProductCategoryId, Quantity = item.Quantity };
                    faktura.Stavke.Add(nova);
                    var proizvod = await ctx.Products.FirstOrDefaultAsync(p => p.Name.ToLower() == nova.Name.ToLower() && p.CategoryId == nova.ProductCategoryId, cancellationToken);
                    if (proizvod != null)
                    {
                        proizvod.StockQuantity += nova.Quantity;
                        ctx.Products.Update(proizvod);

                    }
                    else
                    {
                        proizvod = new ProductEntity { Name = nova.Name, StockQuantity = nova.Quantity, CategoryId = nova.ProductCategoryId, Description = "Kreirano u sklopu fakture", Price = 5 };
                        ctx.Products.Add(proizvod);

                    }

                }
            }
            else
            {
                foreach (var item in stavke)
                {
                    var nova = new FakturaStavkaEntity { Name = item.Name, ProductCategoryId = item.ProductCategoryId, Quantity = item.Quantity };
                    faktura.Stavke.Add(nova);
                    var proizvod = await ctx.Products.FirstOrDefaultAsync(p => p.Name.ToLower() == nova.Name.ToLower() && p.CategoryId == nova.ProductCategoryId, cancellationToken);
                    if(proizvod == null || proizvod.StockQuantity < nova.Quantity)
                    {
                        return -1;
                    }
                    else
                    {
                        proizvod.StockQuantity -= nova.Quantity;
                        if(proizvod.StockQuantity == 0)
                        {
                            proizvod.IsEnabled = false;
                        }
                        ctx.Products.Update(proizvod);
                    }
                }
            }

            faktura.BrojStavki = faktura.Stavke.Count;
            if (faktura.BrojStavki <= 0)
            {
                return -1;
            } 
            ctx.Fakture.Add(faktura);
            await ctx.SaveChangesAsync(cancellationToken);
            return faktura.Id;
        }
    }
}
