using Market.Application.Modules.Dostavljaci.Commands.create;
using Market.Application.Modules.Dostavljaci.Commands.delete;
using Market.Application.Modules.Dostavljaci.Commands.update;
using Market.Application.Modules.Dostavljaci.Queries.GetById;
using Market.Application.Modules.Dostavljaci.Queries.List;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Market.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DostavljaciController(ISender sender) : ControllerBase
    {
        [HttpPost]

        public async Task<ActionResult<int>> create([FromBody] CreateDostavljacCommand cmd, CancellationToken ct)
        {
            var response = await sender.Send(cmd, ct);
            return response;
        }

        [HttpPut("{id}")]

        public async Task<ActionResult<Unit>> update([FromBody] UpdateDostavljacCommand cmd, int id, CancellationToken ct)
        {
            cmd.Id = id;
            var response =await sender.Send(cmd, ct);
            return response;
        }

        [HttpDelete("{id}")]
        
        public async Task<ActionResult<Unit>> delete(int id,CancellationToken ct)
        {
            var response =await sender.Send(new DeleteDostavljacCommand { Id = id}, ct);
            return response;
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<DostavljacByIdDto>> getById(int id, CancellationToken ct)
        {
            var response =await sender.Send(new GetDostavljacByIdQuery { Id = id}, ct);
            return response;
        }

        [HttpGet]


        public async Task<ActionResult<PageResult<DostavljaciListDto>>> getList([FromQuery] DostavljaciListQuery q, CancellationToken ct)
        {
            var response = await sender.Send(q,ct);
            return response;
        }
    }
}
