using Market.Application.Modules.Dostavljaci.Commands.create;
using Market.Application.Modules.Dostavljaci.Commands.delete;
using Market.Application.Modules.Dostavljaci.Commands.update;
using Market.Application.Modules.Dostavljaci.Queries.getById;
using Market.Application.Modules.Dostavljaci.Queries.list;
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

        public async Task<int> create([FromBody]CreateDostavljacCommand cmd,CancellationToken ct)
        {
            var result = await sender.Send(cmd,ct);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<Unit> update([FromBody]UpdateDostavljacCommand cmd, int id, CancellationToken cancellationToken)
        {
            cmd.Id = id;
            var response = await sender.Send(cmd,cancellationToken);
            return response;
        }

        [HttpDelete("{id}")]

        public async Task<Unit> delete(int id,CancellationToken cancellationToken)
        {
            var response =await sender.Send(new DeleteDostavljacCommand { Id = id},cancellationToken);
            return response;
        }

        [HttpGet]

        public async Task<PageResult<ListDostavljacDto>> list([FromQuery]ListDostavljacQuery q, CancellationToken cancellationToken)
        {
            var response = await sender.Send(q,cancellationToken);
            return response;
        }

        [HttpGet("{id}")]

        public async Task<DostavljacByIdDto> getById(int id, CancellationToken cancellationToken)
        {
            var response = await sender.Send(new DostavljacByIdQuery { Id = id},cancellationToken);
            return response;
        }
    }
}
