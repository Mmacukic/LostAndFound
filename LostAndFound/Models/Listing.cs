using System.ComponentModel.DataAnnotations;

namespace LostAndFound.Models;

public class Listing
{
    [Key]
    public Guid ListingId { get; set; }
    public string ItemType { get; set; }
    public string Address { get; set; }
    public string PostedBy { get; set; }
    public string Message { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}