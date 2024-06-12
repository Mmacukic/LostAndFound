using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.Pkcs;

namespace LostAndFound.Models;

public class Message
{

    [Key] 
    public Guid MessageId { get; set; }
    public Guid ListingId { get; set; }
    public string SentBy { get; set; }
    public string RecievedBy { get; set; }
    public string Content { get; set; }
    public DateTime SentOn { get; set; }
}