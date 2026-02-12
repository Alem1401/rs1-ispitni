using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Market.Application.Modules.Dostavljaci.Commands.create
{
    public class CreateDostavljacValidator : AbstractValidator<CreateDostavljacCommand>
    {
        public CreateDostavljacValidator() {
            RuleFor(x => x.Kod).MaximumLength(3).WithMessage("Maksimalna duzina imena je 3");
        }
    }
}
