using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class OrderList
    {
        public OrderList()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }


        public Guid OrderListId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal OrderTotalPrice { get; set; }
        public Guid UserId { get; set; }
        public DateTime? ShippingDate { get; set; }
        public int? StatusNo { get; set; }
        public Guid? ShipperId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public int? PaymentTypeId { get; set; }
        public string? AddressId { get; set; } 
        public string? AddressDetails { get; set; }
        public int? OrderNumber { get; set; }



        public virtual Address? Address { get; set; } = null!;
        public virtual Payment? PaymentType { get; set; } = null!;
        public virtual Shipper? Shipper { get; set; } = null!;
        public virtual Status? StatusNoNavigation { get; set; } = null!;
        public virtual ICollection<OrderDetail>? OrderDetails { get; set; }
    }
}
