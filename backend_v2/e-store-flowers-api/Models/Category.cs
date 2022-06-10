using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class Category
    {
        public Category()
        {
            Flowers = new HashSet<Flower>();
        }

        public int CatergoryNo { get; set; }
        public string CategoryName { get; set; } = null!;
        public string? CategoryImage { get; set; }
        public string CategoryDescription { get; set; } = null!;

        public virtual ICollection<Flower>? Flowers { get; set; }
    }
}
