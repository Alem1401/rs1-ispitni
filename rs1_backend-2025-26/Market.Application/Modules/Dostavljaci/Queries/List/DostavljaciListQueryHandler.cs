using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Queries.List
{
    public  class DostavljaciListQueryHandler (IAppDbContext ctx) : IRequestHandler<DostavljaciListQuery, PageResult<DostavljaciListDto>>
    {
        public async Task<PageResult<DostavljaciListDto>> Handle(DostavljaciListQuery request, CancellationToken cancellationToken)
        {
            var q = ctx.Dostavljaci.Select(x => new DostavljaciListDto { Id = x.Id, Aktivan = x.Aktivan, Kod = x.Kod, Naziv = x.Naziv, Tip = x.Tip });
            if(request.Search != null)
            {
                q = q.Where(n => n.Naziv.ToLower().Trim().Contains(request.Search.ToLower().Trim()));
            }
            return await PageResult<DostavljaciListDto>.FromQueryableAsync(q,request.Paging,cancellationToken);
        }
    }
}
