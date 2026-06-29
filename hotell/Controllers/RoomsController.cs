using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace hotell.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RoomsController(AppDbContext context)
        {
            _context = context;
        }

        // 🔒 Protected endpoint
        [Authorize]
        [HttpGet]
        public IActionResult GetRooms()
        {
            return Ok(_context.Rooms.ToList());
        }
    }
}