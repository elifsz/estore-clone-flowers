using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class UserRole
    {
        public UserRole()
        {
            Users = new HashSet<User>();
        }

        public int UserRoleNo { get; set; }
        public string UserRole1 { get; set; } = null!;

        public virtual ICollection<User>? Users { get; set; }
    }
}
