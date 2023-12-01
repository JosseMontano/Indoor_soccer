using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Context;
using backend.Models

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TeamController
    {
        private DBCont _dbCont;
        public TeamController(DBCont dbCont)
        {
            _dbCont = dbCont;
        }

        [HttpGet]
        public IActionResult Get()
        {
          /*  var teams = _dbCont.;
            return Ok(cars);*/
        }





    }
}
