using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LostAndFound.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LostAndFound.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        [Route("GetUnAuthorized")]
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetUnAuthorized()
        {
            return Ok("GetUnAuthorized");
        }
        
        [Route("GetAuthorized")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAuthorized()
        {
            return Ok("GetAuthorized");
        }
        
        [Route("CheckLogin")]
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> CheckLogin(UserModel model)
        {
            if (model.LoginID == "admin" && model.Password == "password")
            {
                model.UserMessage = "Login successful";
            }
            else
            {
                model.UserMessage = "Login failed";
            }
            return Ok(model);
        }
    }
}
