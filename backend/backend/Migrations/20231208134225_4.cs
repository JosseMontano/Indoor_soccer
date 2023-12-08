using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class _4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Game_Team_TeamVisitorId",
                table: "Game");

            migrationBuilder.DropIndex(
                name: "IX_Game_TeamLocalId",
                table: "Game");

            migrationBuilder.DropIndex(
                name: "IX_Game_TeamVisitorId",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "TeamVisitorId",
                table: "Game");

            migrationBuilder.CreateIndex(
                name: "IX_Game_TeamLocalId",
                table: "Game",
                column: "TeamLocalId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Game_TeamLocalId",
                table: "Game");

            migrationBuilder.AddColumn<int>(
                name: "TeamVisitorId",
                table: "Game",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Game_TeamLocalId",
                table: "Game",
                column: "TeamLocalId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Game_TeamVisitorId",
                table: "Game",
                column: "TeamVisitorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Game_Team_TeamVisitorId",
                table: "Game",
                column: "TeamVisitorId",
                principalTable: "Team",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
