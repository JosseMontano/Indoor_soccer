using backend.Models;
using backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using System;
using System.Diagnostics;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {

        private IConfiguration _config;
        public static User user = new User();
        // ====== CONNECTION ======
        private DBCont _dbCont;
  
        public UserController(IConfiguration config, DBCont dbCont)
        {
            _config = config;
            _dbCont = dbCont;
        }


        [HttpPost("register")]
        public ActionResult<User> Register(UserDto req)
        {
          
            var userExist = _dbCont.User.Any(v => v.UserName == req.Username);
            if (userExist)
            {
                return Ok(new { Message = "Ya existe este nombre de usuario" });
            }

            Guid myUUId = Guid.NewGuid();
            string convertedUUID = myUUId.ToString();
            user.Id = convertedUUID;
            user.UserName = req.Username;
            user.Password = BCrypt.Net.BCrypt.HashPassword(req.Password);

            _dbCont.Add(user);
            _dbCont.SaveChanges();

            return Ok(new { Message = "Se registro con exito el usuario" });


        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDto req)

        {
            var user = _dbCont.User.FirstOrDefault(v => v.UserName == req.Username);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (!BCrypt.Net.BCrypt.Verify(req.Password, user.Password))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user.UserName);

            return Ok(token);
        }


        private string CreateToken(string userName)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Role, "User"),
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _config.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

           

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }

}

