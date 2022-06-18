using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class Payment
    {
        public Payment()
        {
            OrderLists = new HashSet<OrderList>();
        }

        public int PaymentTypeId { get; set; }
        public string PaymentTypeName { get; set; } = null!;
        public string? CardNumber { get; set; }

        public virtual ICollection<OrderList> OrderLists { get; set; }
    }
}
