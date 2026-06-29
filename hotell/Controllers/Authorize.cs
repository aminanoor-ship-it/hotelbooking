using Microsoft.AspNetCore.Mvc;

namespace hotell.Controllers
{
    public class Authorize : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
