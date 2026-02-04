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
            var toAdd = new DostavljacEntity { Aktivan = request.Aktivan , Kod = request.Kod , Tip = request.Tip , Naziv = request.Naziv};
            ctx.Dostavljaci.Add(toAdd);
            await ctx.SaveChangesAsync(cancellationToken);
            return toAdd.Id;
        }
    }
}
