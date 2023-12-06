using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Player
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(25)]
        public string Names { get; set; }

        [Required]
        [StringLength(25)]
        public string LastNames { get; set; }

        public int TeamId { get; set; }
       
    }



   

}
