using System.ComponentModel.DataAnnotations;
namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(25)]
        public string UserName { get; set; }
        [Required]
        [StringLength(250)]
        public string Password { get; set; }
    }
}
