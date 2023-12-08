using System.ComponentModel.DataAnnotations;
using System.Numerics;

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


        [Required]
        public int Age { get; set; }


        [Required]
        public DateTime Birthday { get; set; }


        [Required]
        public int Cellphone { get; set; }

        [Required]
        public string Photo { get; set; }

        public int TeamId { get; set; }

    }



   

}
