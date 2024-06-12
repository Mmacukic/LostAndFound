using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LostAndFound.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace LostAndFound.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase

    {
        private readonly LostAndFoundContext _context;
        
        private static UserModel _user = new UserModel();
        private readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration, 
            LostAndFoundContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet("getuser"), Authorize]
        public async Task<ActionResult<UserModel>> GetUser()
        {
            var username = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;

            UserModel user = _context.Users.Find(username);

            return Ok(new { user.UserName, user.FirstName, user.LastName, user.Email });
        }
        
        [HttpGet]
        public async Task<ActionResult<List<UserModel>>> GetUsers()
        {
            
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("adduser")]
        public async Task<ActionResult<UserModel>> AddUser(UserModel user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("register")]
        public ActionResult<UserModel> Register(UserDtoRegister request)
        {
            ActionResult<List<UserModel>> actionResult = GetUsers().GetAwaiter().GetResult();
            if (actionResult.Value != null)
            {
                List<UserModel> users = actionResult.Value;
                foreach (UserModel eachUser in users)
                {

                    if (eachUser.UserName == request.UserName)
                    {
                        return BadRequest("User already exists");
                    }
                }
            }
            
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            _user.FirstName = request.FirstName;
            _user.LastName = request.LastName;
            _user.Email = request.Email;
            _user.UserName = request.UserName;
            _user.PasswordHash = passwordHash;
            this.AddUser(_user).GetAwaiter();
            return Ok(_user);
        }

        [HttpDelete("deleteUser")]
        [Authorize]
        public async Task<ActionResult> DeleteUser(UserDto request)
        {
            var username = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            UserModel user = _context.Users.Find(username);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
            else
            {
                return BadRequest("User not found!");
            }
            return Ok();
        }
        [HttpPost("login")]
        public ActionResult<UserModel> LogIn(UserDto request)
        {
            
            UserModel user = _context.Users.Find(request.UserName);
            if (user == null)
            {
                return BadRequest("user not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Log in failed!");
            }

            _user = user;
            string token = CreateToken(_user);
            return Ok(token);
        }

        private string CreateToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: cred,
                    issuer: _configuration.GetSection("Authentication:ValidIssuer").Value,
                    audience: _configuration.GetSection("Authentication:ValidAudiences[1]").Value
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        
    }
    
}
