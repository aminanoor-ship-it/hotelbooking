using HotelBookingAPI.Data;
using HotelBookingAPI.Models;
using HotelBookingAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HotelBookingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create(BookingDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (dto.CheckOutDate <= dto.CheckInDate)
                return BadRequest(new { message = "Check-out date must be after check-in date" });

            var room = await _context.Rooms.FindAsync(dto.RoomId);
            if (room == null) return NotFound(new { message = "Room not found" });

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var overlap = await _context.Bookings
                    .Where(b => b.RoomId == dto.RoomId)
                    .Where(b => b.Status != "Cancelled")
                    .Where(b => dto.CheckInDate < b.CheckOutDate && dto.CheckOutDate > b.CheckInDate)
                    .AnyAsync();

                if (overlap)
                {
                    await transaction.RollbackAsync();
                    return BadRequest(new { message = "Room is not available for the selected dates" });
                }

                var nights = (dto.CheckOutDate - dto.CheckInDate).Days;
                var totalPrice = room.PricePerNight * nights;

                var booking = new Booking
                {
                    UserId = userId!,
                    HotelId = room.HotelId,
                    RoomId = dto.RoomId,
                    CheckInDate = dto.CheckInDate,
                    CheckOutDate = dto.CheckOutDate,
                    TotalPrice = totalPrice,
                    Status = "Pending"
                };

                _context.Bookings.Add(booking);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new { message = "Booking created", bookingId = booking.Id });
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyBookings()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var bookings = await _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Hotel)
                .Include(b => b.Room)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
            return Ok(bookings);
        }

        [HttpPut("{id}/cancel")]
        public async Task<IActionResult> Cancel(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null) return NotFound();
            if (booking.UserId != userId) return Forbid();
            if (booking.Status != "Pending") return BadRequest(new { message = "Only pending bookings can be cancelled" });

            booking.Status = "Cancelled";
            await _context.SaveChangesAsync();
            return Ok(new { message = "Booking cancelled" });
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Hotel)
                .Include(b => b.Room)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
            return Ok(bookings);
        }

        [HttpPut("{id}/confirm")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Confirm(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) return NotFound();
            booking.Status = "Confirmed";
            await _context.SaveChangesAsync();
            return Ok(new { message = "Booking confirmed" });
        }

        [HttpPut("{id}/reject")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Reject(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) return NotFound();
            booking.Status = "Cancelled";
            await _context.SaveChangesAsync();
            return Ok(new { message = "Booking rejected" });
        }
    }
}