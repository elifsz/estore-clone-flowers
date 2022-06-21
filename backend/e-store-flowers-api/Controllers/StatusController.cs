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
    public class StatusController : ControllerBase
    {

        private readonly flower_etrade_dbContext _context;

        public StatusController(flower_etrade_dbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Status>> GetStatus(int id)
        {
            if (_context.Statuses == null)
            {
                return NotFound();
            }
            var status = await _context.Statuses.FindAsync(id);

            if (status == null)
            {
                return NotFound();
            }

            return status;
        }
    }
}
