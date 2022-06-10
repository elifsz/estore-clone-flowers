using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class Flower
    {
        public Flower()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public Guid FlowerId { get; set; }
        public string FlowerName { get; set; } = null!;
        public double Price { get; set; }
        public string? Image { get; set; }
        public int Stock { get; set; }
        public int CategoryNo { get; set; }
        public DateTime? DeliveryTime { get; set; }
        public string? FlowerDescription { get; set; }

        public virtual Category? CategoryNoNavigation { get; set; } = null!;
        public virtual ICollection<OrderDetail>? OrderDetails { get; set; }
    }
}
