using Market.Application.Modules.Fakture.Commands;
using Market.Application.Modules.Fakture.Queries.List;

namespace Market.API.Controllers;

[ApiController]
[Route("[controller]")]
[AllowAnonymous]
public class FaktureController(ISender sender) : ControllerBase
{
    [HttpGet]
    public async Task<PageResult<ListFaktureQueryDto>> List([FromQuery] ListFaktureQuery query, CancellationToken ct)
    {
        var result = await sender.Send(query, ct);
        return result;
    }

    [HttpPost]

    public async Task<int> create([FromBody]CreateFakturaCommand cmd, CancellationToken ct)
    {
        var result = await sender.Send(cmd, ct);
        return result;
    }
}
