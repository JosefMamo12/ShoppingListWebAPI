using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ShoppingListWebAPI.Server.Data;
using System.Text.Json.Serialization;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        // SQL SERVER WITH THE RIGHT CONNECTION STRING AS A SECRET.

        builder.Services.AddDbContext<ShoppingListContext>
            (options => options.UseSqlServer(builder.Configuration.GetConnectionString("ShoppingList")));
        // .LogTo((msg) => Console.WriteLine(msg), LogLevel.Information));

        builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        builder.Services.AddDatabaseDeveloperPageExceptionFilter();
        builder.Services.AddScoped<ICategoryRepo, CategoryRepo>();
        builder.Services.AddScoped<IProductRepo, ProductRepo>();
        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.WriteIndented = true;
        }
        );
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(p => p.AddPolicy("corspolicy",
             build =>
             {
                 build.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
             }
             ));
        var app = builder.Build();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors("corspolicy");

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.MapFallbackToFile("/index.html");

        app.Run();
    }
}