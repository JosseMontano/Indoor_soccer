using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Team
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(25)]
        public string Name { get; set; }

        public List<Player> Players { get; set; }
    }
}
