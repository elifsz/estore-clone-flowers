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
    public class OrderListsController : ControllerBase
    {
        private readonly flower_etrade_dbContext _context;

        public OrderListsController(flower_etrade_dbContext context)
        {
            _context = context;
        }

        // GET: api/OrderLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderList>>> GetOrderLists()
        {
          if (_context.OrderLists == null)
          {
              return NotFound();
          }
            return await _context.OrderLists.ToListAsync();
        }

        // GET: api/OrderLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderList>> GetOrderList(Guid id)
        {
          if (_context.OrderLists == null)
          {
              return NotFound();
          }
            var orderList = await _context.OrderLists.FindAsync(id);

            if (orderList == null)
            {
                return NotFound();
            }

            return orderList;
        }


        [HttpGet("trackorder")]
        public async Task<ActionResult<string>> TrackOrder(String email, int orderNo)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'flower_etrade_dbContext.Users' is null.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound();
            }

            var order = await _context.OrderLists.FirstOrDefaultAsync(o => o.OrderNumber == orderNo);

            if (order.OrderNumber != orderNo)
            {
                return NotFound();
            }

            var status = await _context.Statuses.FirstOrDefaultAsync(u => u.StatusNo == order.StatusNo);



            return status.StatusName;
           

        }


        // PUT: api/OrderLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderList(Guid id, OrderList orderList)
        {
            if (id != orderList.OrderListId)
            {
                return BadRequest();
            }

            _context.Entry(orderList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderListExists(id))
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

        // POST: api/OrderLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderList>> PostOrderList(OrderList orderList)
        {
          if (_context.OrderLists == null)
          {
              return Problem("Entity set 'flower_etrade_dbContext.OrderLists'  is null.");
          }
            _context.OrderLists.Add(orderList);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (OrderListExists(orderList.OrderListId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetOrderList", new { id = orderList.OrderListId }, orderList);
        }


        // DELETE: api/OrderLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderList(Guid id)
        {
            if (_context.OrderLists == null)
            {
                return NotFound();
            }
            var orderList = await _context.OrderLists.FindAsync(id);
            if (orderList == null)
            {
                return NotFound();
            }

            _context.OrderLists.Remove(orderList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderListExists(Guid id)
        {
            return (_context.OrderLists?.Any(e => e.OrderListId == id)).GetValueOrDefault();
        }
    }
}
