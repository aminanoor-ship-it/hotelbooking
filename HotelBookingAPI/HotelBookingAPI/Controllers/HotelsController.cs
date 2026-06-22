using HotelBookingAPI.Data;
using HotelBookingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HotelBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HotelsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var hotels = await _context.Hotels
                .Include(h => h.Rooms)
                .ToListAsync();
            return Ok(hotels);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var hotel = await _context.Hotels
                .Include(h => h.Rooms)
                .FirstOrDefaultAsync(h => h.Id == id);
            if (hotel == null) return NotFound(new { message = "Hotel not found" });
            return Ok(hotel);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(Hotel hotel)
        {
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Hotel created", hotelId = hotel.Id });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, Hotel hotel)
        {
            var existing = await _context.Hotels.FindAsync(id);
            if (existing == null) return NotFound(new { message = "Hotel not found" });

            existing.Name = hotel.Name;
            existing.Location = hotel.Location;
            existing.Description = hotel.Description;
            existing.ImageUrl = hotel.ImageUrl;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Hotel updated" });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var hotel = await _context.Hotels
                .Include(h => h.Rooms)
                .ThenInclude(r => r.Bookings)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (hotel == null) return NotFound(new { message = "Hotel not found" });

            var activeBookings = hotel.Rooms
                .SelectMany(r => r.Bookings)
                .Where(b => b.Status == "Pending" || b.Status == "Confirmed")
                .Count();

            if (activeBookings > 0)
                return BadRequest(new { message = "Cannot delete. Active bookings exist." });

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Hotel deleted" });
        }
    }
}