using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController: ControllerBase
    {
        private DBCont _dbCont;
        public GameController(DBCont dbCont)
        {
            _dbCont = dbCont;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var games = _dbCont.Game;
            return Ok(games);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Game game)
        {
            _dbCont.Add(game);
            _dbCont.SaveChanges();

            return Ok(new { Message = "Se guardo el partido", Data = game });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //GetById
            var game = _dbCont.Game.Find(id);
            if (game == null)
            {
                return NotFound(new
                {
                    Message = "Partido No encontrado"
                });
            }

            _dbCont.Game.Remove(game);
            _dbCont.SaveChanges();
            return Ok(new { Message = " Partido eliminado" });

        }
    }
}
