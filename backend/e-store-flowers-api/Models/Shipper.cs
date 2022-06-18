using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class Shipper
    {
        public Shipper()
        {
            OrderLists = new HashSet<OrderList>();
        }

        public Guid ShipperId { get; set; }
        public string ShipperName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        public virtual ICollection<OrderList>? OrderLists { get; set; }
    }
}
