using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Queries.getById
{
    public class DostavljacByIdQueryHandler(IAppDbContext ctx) : IRequestHandler<DostavljacByIdQuery, DostavljacByIdDto>
    {
        public async Task<DostavljacByIdDto> Handle(DostavljacByIdQuery request, CancellationToken cancellationToken)
        {
           var dostavljac =await ctx.Dostavljaci.FirstOrDefaultAsync(r =>  r.Id == request.Id);
            if (dostavljac == null) {
                throw new Exception("not found");
            }
            else
            {
                var response = new DostavljacByIdDto
                {
                    Id = dostavljac.Id,
                    isAktivan = dostavljac.isAktivan,
                    Kod = dostavljac.Kod,
                    Naziv = dostavljac.Naziv,
                    Tip = dostavljac.Tip,
                };
                return response;
            }
        }
    }
}
