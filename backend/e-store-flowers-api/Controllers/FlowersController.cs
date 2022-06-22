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
    public class FlowersController : ControllerBase
    {
        private readonly flower_etrade_dbContext _context;

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Flower>>> Search(string flowerNameSearch)
        {
            IQueryable<Flower> query = _context.Flowers;

            if(!string.IsNullOrEmpty(flowerNameSearch))
            {
                query = query.Where(e => e.FlowerName.Contains(flowerNameSearch));
            }
            return await query.ToListAsync();
        }

        [HttpGet("detailFlower")]
        public async Task<ActionResult<IEnumerable<Flower>>> DetailFlower(string detailFlowerName)
        {
            IQueryable<Flower> query = _context.Flowers;

            if (!string.IsNullOrEmpty(detailFlowerName))
            {
                query = query.Where(e => e.FlowerName.Contains(detailFlowerName));
            }
            return await query.ToListAsync();
        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Flower>>> FilterCategory(int categoryNo)
        {
            IQueryable<Flower> query = _context.Flowers;

            if (categoryNo > 0)
            {
                query = query.Where(e => e.CategoryNo == categoryNo);
            }
            return await query.ToListAsync();
        }




        public FlowersController(flower_etrade_dbContext context)
        {
            _context = context;
        }

        // GET: api/Flowers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flower>>> GetFlowers()
        {
          if (_context.Flowers == null)
          {
              return NotFound();
          }
            return await _context.Flowers.ToListAsync();
        }

        // GET: api/Flowers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flower>> GetFlower(Guid id)
        {
          if (_context.Flowers == null)
          {
              return NotFound();
          }
            var flower = await _context.Flowers.FindAsync(id);

            if (flower == null)
            {
                return NotFound();
            }

            return flower;
        }


        /*  [HttpGet("get/{CategoryNo}")]
          public async Task<ActionResult<Flower>> GetFlowerByCategoryId(int CategoryNo)
          {
              if (_context.Flowers == null)
              {
                  return NotFound();
              }
              var flower = await _context.Flowers.FindAsync(CategoryNo);


              if (flower == null)
              {
                  return NotFound();
              }

              if(flower.CategoryNo == CategoryNo)
              {
                  return flower;
              }

              return NotFound();
          }*/


        // PUT: api/Flowers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlower(Guid id, Flower flower)
        {
            if (id != flower.FlowerId)
            {
                return BadRequest();
            }

            _context.Entry(flower).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlowerExists(id))
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

        // POST: api/Flowers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Flower>> PostFlower(Flower flower)
        {
          if (_context.Flowers == null)
          {
              return Problem("Entity set 'flower_etrade_dbContext.Flowers'  is null.");
          }
            _context.Flowers.Add(flower);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlower", new { id = flower.FlowerId }, flower);
        }

        // DELETE: api/Flowers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlower(Guid id)
        {
            if (_context.Flowers == null)
            {
                return NotFound();
            }
            var flower = await _context.Flowers.FindAsync(id);
            if (flower == null)
            {
                return NotFound();
            }

            _context.Flowers.Remove(flower);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlowerExists(Guid id)
        {
            return (_context.Flowers?.Any(e => e.FlowerId == id)).GetValueOrDefault();
        }
    }
}
