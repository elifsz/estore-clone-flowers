using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using e_store_flowers_api.Models;

namespace e_store_flowers_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressTypesController : ControllerBase
    {
        private readonly flower_etrade_dbContext _context;

        public AddressTypesController(flower_etrade_dbContext context)
        {
            _context = context;
        }

        // GET: api/AddressTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressType>>> GetAddressTypes()
        {
          if (_context.AddressTypes == null)
          {
              return NotFound();
          }
            return await _context.AddressTypes.ToListAsync();
        }

        // GET: api/AddressTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AddressType>> GetAddressType(int id)
        {
          if (_context.AddressTypes == null)
          {
              return NotFound();
          }
            var addressType = await _context.AddressTypes.FindAsync(id);

            if (addressType == null)
            {
                return NotFound();
            }

            return addressType;
        }

        // PUT: api/AddressTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddressType(int id, AddressType addressType)
        {
            if (id != addressType.AddressTypeNo)
            {
                return BadRequest();
            }

            _context.Entry(addressType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AddressTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AddressType>> PostAddressType(AddressType addressType)
        {
          if (_context.AddressTypes == null)
          {
              return Problem("Entity set 'flower_etrade_dbContext.AddressTypes'  is null.");
          }
            _context.AddressTypes.Add(addressType);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AddressTypeExists(addressType.AddressTypeNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAddressType", new { id = addressType.AddressTypeNo }, addressType);
        }

        // DELETE: api/AddressTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddressType(int id)
        {
            if (_context.AddressTypes == null)
            {
                return NotFound();
            }
            var addressType = await _context.AddressTypes.FindAsync(id);
            if (addressType == null)
            {
                return NotFound();
            }

            _context.AddressTypes.Remove(addressType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AddressTypeExists(int id)
        {
            return (_context.AddressTypes?.Any(e => e.AddressTypeNo == id)).GetValueOrDefault();
        }
    }
}
