
using LostAndFound.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LostAndFound.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private static Message _message = new Message();
        private readonly LostAndFoundContext _context;

        [HttpPost("sendMessage/{listingId:guid}")]
        [Authorize]
        public async Task<IActionResult> SendMessage( Guid listingId,MessageDto messageDto)
        {
            var sentBy = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            var sentTo = _context.Listings.Find(listingId);
            _message.SentBy = sentBy;
            _message.Content = messageDto.message;
            _message.ListingId = listingId;
            _message.SentOn = DateTime.Now;
            _message.RecievedBy = sentTo.PostedBy;
            _context.Messages.Add(_message);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
