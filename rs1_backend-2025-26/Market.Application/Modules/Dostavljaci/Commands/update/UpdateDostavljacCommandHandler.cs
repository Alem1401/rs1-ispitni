using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Commands.update
{
    public class UpdateDostavljacCommandHandler(IAppDbContext ctx) : IRequestHandler<UpdateDostavljacCommand, Unit>
    {
        public async Task<Unit> Handle(UpdateDostavljacCommand request, CancellationToken cancellationToken)
        {
           var toUpdate = await ctx.Dostavljaci.FirstOrDefaultAsync(r => r.Id == request.Id);
            if (toUpdate != null) { 
            toUpdate.Naziv = request.Naziv;
            toUpdate.isAktivan = request.isAktivan;
             toUpdate.Kod = request.Kod;
             toUpdate.Tip = request.Tip;
                ctx.Dostavljaci.Update(toUpdate);
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
