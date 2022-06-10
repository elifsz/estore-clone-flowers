using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class Address
    {
        public Address()
        {
            InverseParentAddress = new HashSet<Address>();
            OrderLists = new HashSet<OrderList>();
            Users = new HashSet<User>();
        }

        public string AddressId { get; set; } = null!;
        public int AddressTypeNo { get; set; }
        public string? ParentAddressId { get; set; }
        public string? AddresName { get; set; }

        public virtual AddressType? AddressTypeNoNavigation { get; set; } = null!;
        public virtual Address? ParentAddress { get; set; }
        public virtual ICollection<Address>? InverseParentAddress { get; set; }
        public virtual ICollection<OrderList>? OrderLists { get; set; }
        public virtual ICollection<User>? Users { get; set; }
    }
}
