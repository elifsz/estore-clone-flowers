using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class OrderDetail
    {
        public Guid OrderDetailsId { get; set; }
        public Guid FlowerId { get; set; }
        public decimal FlowerPrice { get; set; }
        public int FlowerQuantity { get; set; }
        public decimal TotalPrice { get; set; }
        public Guid? OrderListId { get; set; }

        public virtual Flower? Flower { get; set; } = null!;
        public virtual OrderList? OrderList { get; set; } = null!;
    }
}
