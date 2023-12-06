using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PlayerController: ControllerBase
    {
        private DBCont _dbCont;
        public PlayerController(DBCont dbCont)
        {
            _dbCont = dbCont;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var players = _dbCont.Player;
            return Ok(players);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Player player)
        {
            _dbCont.Add(player);
            _dbCont.SaveChanges();

            return Ok(new { Message = "Se guardo al jugador", Data = player });
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Player player)
        {
            if (id != player.Id)
            {
                return BadRequest();
            }

            _dbCont.Entry(player).State = EntityState.Modified;

            _dbCont.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            //GetById
            var player = _dbCont.Player.Find(id);
            if (player == null)
            {
                return NotFound(new
                {
                    Message = "Jugador No encontrado"
                });
            }

            _dbCont.Player.Remove(player);
            _dbCont.SaveChanges();
            return Ok(new { Message = " Jugar eliminado" });

        }

    }
}
