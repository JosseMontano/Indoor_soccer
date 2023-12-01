using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Context;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TeamController : ControllerBase
    {
        private DBCont _dbCont;
        public TeamController(DBCont dbCont)
        {
            _dbCont = dbCont;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var teams = _dbCont.Team;
            return Ok(teams);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var team = _dbCont.Team.Find(id);
            return Ok(team);
        }


        [HttpPost]
        public IActionResult Post([FromBody] Team team)
        {
            var teamExist = _dbCont.Team.Any(e => e.Name == team.Name);
            if (teamExist)
            {
                return Ok(new { Message = "El equipo ya existe" });
            }

            _dbCont.Add(team);
            _dbCont.SaveChanges();

            return Ok(new { Message = "Se creo el equipo" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //GetById
            var team = _dbCont.Team.Find(id);
            if (team == null)
            {
                return NotFound(new
                {
                    Message = "Equipo No encontrado"
                });
            }

            _dbCont.Team.Remove(team);
            _dbCont.SaveChanges();
            return Ok(new { Message = " Equipo eliminado" });

        }


    }
}
