using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class games3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Game_TeamLocalId",
                table: "Game");

            migrationBuilder.CreateIndex(
                name: "IX_Game_TeamLocalId",
                table: "Game",
                column: "TeamLocalId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Game_TeamLocalId",
                table: "Game");

            migrationBuilder.CreateIndex(
                name: "IX_Game_TeamLocalId",
                table: "Game",
                column: "TeamLocalId");
        }
    }
}
