using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Queries.list
{
    public class ListDostavljacQueryHandler(IAppDbContext ctx) : IRequestHandler<ListDostavljacQuery, PageResult<ListDostavljacDto>>
    {
        public async Task<PageResult<ListDostavljacDto>> Handle(ListDostavljacQuery request, CancellationToken cancellationToken)
        {
            var q = ctx.Dostavljaci.Select(

                x => new ListDostavljacDto
                {
                    Id = x.Id,
                    Naziv = x.Naziv,
                    isAktivan = x.isAktivan,
                    Tip = x.Tip,
                    Kod = x.Kod
                });
            if (request.Search != null)
            {
                q = q.Where(r => r.Naziv.ToLower().Contains(request.Search.ToLower()));
            }

            return await PageResult<ListDostavljacDto>.FromQueryableAsync(q,request.Paging,cancellationToken);
        }
    }
}
