using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LostAndFound.Migrations
{
    /// <inheritdoc />
    public partial class addingListings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Listings",
                columns: table => new
                {
                    ListinId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.ListinId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Listings");
        }
    }
}
