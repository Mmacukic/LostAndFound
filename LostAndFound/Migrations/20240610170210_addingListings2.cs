using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LostAndFound.Migrations
{
    /// <inheritdoc />
    public partial class addingListings2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ListinId",
                table: "Listings",
                newName: "ListingId");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Listings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Listings");

            migrationBuilder.RenameColumn(
                name: "ListingId",
                table: "Listings",
                newName: "ListinId");
        }
    }
}
