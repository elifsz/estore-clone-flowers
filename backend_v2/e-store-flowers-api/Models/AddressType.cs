using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class AddressType
    {
        public AddressType()
        {
            Addresses = new HashSet<Address>();
        }

        public int AddressTypeNo { get; set; }
        public string AddresType { get; set; } = null!;

        public virtual ICollection<Address>? Addresses { get; set; }
    }
}
