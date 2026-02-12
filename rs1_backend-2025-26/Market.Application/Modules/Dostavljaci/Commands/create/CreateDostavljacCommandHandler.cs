using Market.Domain.Entities.Dostavljaci;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Commands.create
{
    public class CreateDostavljacCommandHandler(IAppDbContext ctx) : IRequestHandler<CreateDostavljacCommand, int>
    {
        public async Task<int> Handle(CreateDostavljacCommand request, CancellationToken cancellationToken)
        {
            var toAdd = new DostavljacEntity
            {
                Naziv = request.Naziv,
                Tip = request.Tip,
                isAktivan = request.isAktivan,
                Kod = request.Kod,
            };
            ctx.Dostavljaci.Add(toAdd);
            await ctx.SaveChangesAsync(cancellationToken);
            return toAdd.Id;
        }
    }
}
