using estore_clone_flowers_api.Data;
using estore_clone_flowers_api.Model;
using estore_clone_flowers_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace estore_clone_flowers_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlowerController : ControllerBase
    {
        private readonly IFlowerService _flowerService;
        AllData data = new AllData();

        public FlowerController(IFlowerService flowerService)
        {
            _flowerService = flowerService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            data.flowers = _flowerService.GetFlowersRecord();
            return Ok(data.flowers);
        }
        
    }

}
