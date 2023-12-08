using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Game
    {
        [Key]
        public int Id { get; set; }

     
 
        [Required]
        public int GoalsTeamLocal { get; set; }

        [Required]
        public int GoalsTeamVisitor { get; set; }

        [Required]
        public DateTime Date { get; set; }



        public int TeamLocalId { get; set; }
        public Team TeamLocal { get; set; } = null!;
        /*public int TeamVisitorId { get; set; }
        public Team TeamVisitor { get; set; }*/

    }
}
