using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


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

            user.UserName = req.Username;
            user.Password = BCrypt.Net.BCrypt.HashPassword(req.Password);

            _dbCont.Add(user);
            _dbCont.SaveChanges();

            return Ok(new { Message = "Se registro con exito el usuario" });


        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            if(user.UserName == "demo" && user.Password == "password")
            { 
                var token = GenerateToken(user.UserName);
            return Ok(new {token });

            }
            return Unauthorized();
        }



        private string GenerateToken(string username)
        {

            var claims = new[]
      {
            new Claim(ClaimTypes.Name, username),
            // Add more claims as needed
        };

            var key = new byte[32]; // 256 bits
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(key);
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JoseVey123"));
            var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "unifranz.com",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30), // Token expiration time
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
