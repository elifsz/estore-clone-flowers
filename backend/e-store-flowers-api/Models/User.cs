using System;
using System.Collections.Generic;

namespace e_store_flowers_api.Models
{
    public partial class User
    {
        public Guid UserId { get; set; }
        public int UserRoleNo { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string AddressId { get; set; } = null!;
        public string AddressDetails { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public DateTime? RegistrationDate { get; set; }

        public virtual Address? Address { get; set; } = null!;
        public virtual UserRole? UserRoleNoNavigation { get; set; } = null!;
    }
}
