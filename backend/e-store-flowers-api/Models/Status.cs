using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class Status
    {
        public Status()
        {
            OrderLists = new HashSet<OrderList>();
        }

        public int StatusNo { get; set; }
        public string StatusName { get; set; } = null!;
        public DateTime StatusDate { get; set; }

        public virtual ICollection<OrderList>? OrderLists { get; set; }
    }
}
