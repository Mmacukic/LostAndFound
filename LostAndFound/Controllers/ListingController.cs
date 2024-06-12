using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LostAndFound.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LostAndFound.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly LostAndFoundContext _context;
        private static Listing _listing = new Listing();

        public ListingController(LostAndFoundContext context)
        {
            _context = context;
        }

        [HttpPost("makepost")]
        [Authorize]
        public async Task<ActionResult<Listing>> MakePost(ListingDto request)
        {
            var username = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
            _listing.PostedBy = username;
            _listing.Address = request.Address;
            _listing.Message = request.Message;
            _listing.Latitude = request.Latitude;
            _listing.Longitude = request.Longitude;
            _listing.ListingId = Guid.NewGuid();
            _listing.ItemType = request.ItemType;
            _context.Listings.Add(_listing);
            await _context.SaveChangesAsync();
            return Ok(_listing);
        }

        [HttpGet("getall")]
        [Authorize]
        public async Task<ActionResult<List<Listing>>> GetAllListings()
        {
            var listings = await _context.Listings.ToListAsync();
            return Ok(listings);
        }
        
        [HttpDelete("deleteListing/{listingId:guid}")]
        [Authorize]
        public async Task<IActionResult> DeleteListing(Guid listingId)
        {
            var username = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")?.Value;
    
            // Find the listing by listingId
            Listing listing = await _context.Listings.FindAsync(listingId);
    
            // Check if the listing exists
            if (listing == null)
            {
                return NotFound("Listing not found!");
            }

            // Check ownership
            if (listing.PostedBy != username)
            {
                return Forbid("You do not have permission to delete this listing.");
            }

            // Remove the listing
            _context.Listings.Remove(listing);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
