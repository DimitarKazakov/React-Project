using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopBackend.Migrations
{
    public partial class ConditionAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductWords_keyWords_KeyWordId",
                table: "ProductWords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_keyWords",
                table: "keyWords");

            migrationBuilder.RenameTable(
                name: "keyWords",
                newName: "KeyWords");

            migrationBuilder.AddColumn<int>(
                name: "ConditionId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_KeyWords",
                table: "KeyWords",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Conditions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conditions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ConditionId",
                table: "Products",
                column: "ConditionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Conditions_ConditionId",
                table: "Products",
                column: "ConditionId",
                principalTable: "Conditions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductWords_KeyWords_KeyWordId",
                table: "ProductWords",
                column: "KeyWordId",
                principalTable: "KeyWords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Conditions_ConditionId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductWords_KeyWords_KeyWordId",
                table: "ProductWords");

            migrationBuilder.DropTable(
                name: "Conditions");

            migrationBuilder.DropIndex(
                name: "IX_Products_ConditionId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KeyWords",
                table: "KeyWords");

            migrationBuilder.DropColumn(
                name: "ConditionId",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "KeyWords",
                newName: "keyWords");

            migrationBuilder.AddPrimaryKey(
                name: "PK_keyWords",
                table: "keyWords",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductWords_keyWords_KeyWordId",
                table: "ProductWords",
                column: "KeyWordId",
                principalTable: "keyWords",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
