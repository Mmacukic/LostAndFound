using System.ComponentModel.DataAnnotations;

namespace LostAndFound.Models;

public class UserModel
{
    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    [Key]
    public string UserName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

}