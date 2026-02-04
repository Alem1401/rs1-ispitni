using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Queries.GetById
{
    public class GetDostavljacByIdQueryHandler(IAppDbContext ctx) : IRequestHandler<GetDostavljacByIdQuery, DostavljacByIdDto>
    {
        public async Task<DostavljacByIdDto> Handle(GetDostavljacByIdQuery request, CancellationToken cancellationToken)
        {
           var toReturn =await ctx.Dostavljaci.FirstOrDefaultAsync(r => r.Id == request.Id,cancellationToken);
            var dto = new DostavljacByIdDto
            {
                Id = toReturn.Id,
                Aktivan = toReturn.Aktivan,
                Naziv = toReturn.Naziv,
                Kod = toReturn.Kod,
                Tip = toReturn.Tip,
            };
            return dto;
        }
    }
}
