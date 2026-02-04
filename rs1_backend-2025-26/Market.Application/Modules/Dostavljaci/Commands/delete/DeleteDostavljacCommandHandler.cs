using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Commands.delete
{
    public class DeleteDostavljacCommandHandler(IAppDbContext ctx) : IRequestHandler<DeleteDostavljacCommand, Unit>
    {
        public async Task<Unit> Handle(DeleteDostavljacCommand request, CancellationToken cancellationToken)
        {
            var toDelete = await ctx.Dostavljaci.FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);
            if (toDelete != null) {
                ctx.Dostavljaci.Remove(toDelete);
                await ctx.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
            else
            {
                return Unit.Value;
            }
        }
    }
}
