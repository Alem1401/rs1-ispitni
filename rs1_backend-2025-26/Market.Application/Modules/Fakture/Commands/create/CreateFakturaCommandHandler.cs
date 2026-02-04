using Market.Domain.Entities.Fakture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Fakture.Commands.create
{
    public class CreateFakturaCommandHandler(IAppDbContext ctx) : IRequestHandler<CreateFakturaCommand, int>
    {
        public async Task<int> Handle(CreateFakturaCommand request, CancellationToken cancellationToken)
        {
            var novaFaktura = new FakturaEntity { BrojRacuna = request.Broj, Napomena = request.Napomena, Tip = request.Tip, BrojStavki = 0 };
            ctx.Fakture.Add(novaFaktura);
            await ctx.SaveChangesAsync(cancellationToken);
            var stavke = request.Stavke.ToList();
            if (request.Tip == FakturaTip.Ulazna)
            {
                foreach (var item in stavke)
                {
                    var stavka = await ctx.Products.FirstOrDefaultAsync(p => p.Name.ToLower() == item.Name.ToLower() && p.CategoryId == item.CategoryId);
                    if (stavka != null)
                    {
                        stavka.StockQuantity += item.Quantity;
                        ctx.Products.Update(stavka);
                        await ctx.SaveChangesAsync(cancellationToken);

                    }
                    else
                    {
                        var noviProizvod = new ProductEntity
                        {
                            CategoryId = item.CategoryId,
                            Name = item.Name,
                            Description = "Proizvedeno u sklopu fakture",
                            IsEnabled = false,
                            StockQuantity = item.Quantity,
                            Price = 0
                        };
                        ctx.Products.Add(noviProizvod);
                        await ctx.SaveChangesAsync(cancellationToken);
                    }
                    ctx.Stavke.Add(new FakturaStavkaEntity { CategoryId = item.CategoryId, Name = item.Name, FakturaId = novaFaktura.Id, Quantity = item.Quantity });

                }
                
                novaFaktura.BrojStavki = stavke.Count;
                ctx.Fakture.Update(novaFaktura);
                await ctx.SaveChangesAsync(cancellationToken);
                return novaFaktura.Id;
            }
            else
            {
                foreach (var item in stavke)
                {
                    var provjera = await ctx.Products.FirstOrDefaultAsync(c => c.CategoryId == item.CategoryId && c.Name.ToLower() == item.Name.ToLower());
                    if(provjera == null)
                    {
                        ctx.Fakture.Remove(novaFaktura);
                       await ctx.SaveChangesAsync(cancellationToken);
                        return -1;

                    }
                    else { if (provjera.StockQuantity - item.Quantity < 0)
                        {
                            ctx.Fakture.Remove(novaFaktura);
                            await ctx.SaveChangesAsync(cancellationToken);
                            return -1;
                        }
                                }
                    

                }

                foreach(var item in stavke)
                {
                    var provjera = await ctx.Products.FirstOrDefaultAsync(c => c.CategoryId == item.CategoryId && c.Name.ToLower() == item.Name.ToLower());
                    provjera.StockQuantity -= item.Quantity;
                    if(provjera.StockQuantity == 0)
                    {
                        provjera.IsEnabled = false;
                    }
                    ctx.Products.Update(provjera);
                    await ctx.SaveChangesAsync(cancellationToken);
                    ctx.Stavke.Add(new FakturaStavkaEntity { CategoryId = item.CategoryId, Name = item.Name, FakturaId = novaFaktura.Id, Quantity = item.Quantity });
                }
                novaFaktura.BrojStavki = stavke.Count;
                ctx.Fakture.Update(novaFaktura);
                await ctx.SaveChangesAsync(cancellationToken);
                
                return novaFaktura.Id;
            }
        }
    }
}
