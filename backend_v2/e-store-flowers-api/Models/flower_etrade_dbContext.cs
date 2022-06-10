using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace e_store_flowers_api.Models
{
    public partial class flower_etrade_dbContext : DbContext
    {
        public flower_etrade_dbContext()
        {
        }

        public flower_etrade_dbContext(DbContextOptions<flower_etrade_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<AddressType> AddressTypes { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Flower> Flowers { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<OrderList> OrderLists { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Shipper> Shippers { get; set; } = null!;
        public virtual DbSet<Status> Statuses { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserRole> UserRoles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           /* if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=flower_etrade_db;Trusted_Connection=True;");
            }*/
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("Address", "CONTENT_MANAGEMENT");

                entity.Property(e => e.AddressId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("AddressID");

                entity.Property(e => e.AddresName)
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.ParentAddressId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ParentAddressID")
                    .HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.AddressTypeNoNavigation)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.AddressTypeNo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Address_AddressType");

                entity.HasOne(d => d.ParentAddress)
                    .WithMany(p => p.InverseParentAddress)
                    .HasForeignKey(d => d.ParentAddressId)
                    .HasConstraintName("FK_Address_Address");
            });

            modelBuilder.Entity<AddressType>(entity =>
            {
                entity.HasKey(e => e.AddressTypeNo);

                entity.ToTable("AddressType", "LT_COMMON");

                entity.Property(e => e.AddressTypeNo).ValueGeneratedNever();

                entity.Property(e => e.AddresType)
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CatergoryNo);

                entity.ToTable("Category", "LT_COMMON");

                entity.Property(e => e.CatergoryNo).ValueGeneratedNever();

                entity.Property(e => e.CategoryDescription)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryImage)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Flower>(entity =>
            {
                entity.ToTable("Flower", "CONTENT_MANAGEMENT");

                entity.Property(e => e.FlowerId)
                    .HasColumnName("FlowerID")
                    .HasDefaultValueSql("(newid())");

                entity.Property(e => e.DeliveryTime).HasColumnType("date");

                entity.Property(e => e.FlowerDescription)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FlowerName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CategoryNoNavigation)
                    .WithMany(p => p.Flowers)
                    .HasForeignKey(d => d.CategoryNo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Flower_Category");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => e.OrderDetailsId)
                    .HasName("PK_OderDetails");

                entity.ToTable("OrderDetails", "CONTENT_MANAGEMENT");

                entity.Property(e => e.OrderDetailsId)
                    .ValueGeneratedNever()
                    .HasColumnName("OrderDetailsID");

                entity.Property(e => e.FlowerId).HasColumnName("FlowerID");

                entity.Property(e => e.FlowerPrice).HasColumnType("money");

                entity.Property(e => e.OrderListId).HasColumnName("OrderListID");

                entity.Property(e => e.TotalPrice).HasColumnType("money");

                entity.HasOne(d => d.Flower)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.FlowerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDetails_Flower");

                entity.HasOne(d => d.OrderList)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderListId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDetails_OrderList");
            });

            modelBuilder.Entity<OrderList>(entity =>
            {
                entity.ToTable("OrderList", "CONTENT_MANAGEMENT");

                entity.Property(e => e.OrderListId)
                    .ValueGeneratedNever()
                    .HasColumnName("OrderListID");

                entity.Property(e => e.AddressDetails)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AddressId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("AddressID");

                entity.Property(e => e.OrderDate).HasColumnType("date");

                entity.Property(e => e.OrderTotalPrice).HasColumnType("money");

                entity.Property(e => e.PaymentDate).HasColumnType("date");

                entity.Property(e => e.PaymentTypeId).HasColumnName("PaymentTypeID");

                entity.Property(e => e.ShipperId).HasColumnName("ShipperID");

                entity.Property(e => e.ShippingDate).HasColumnType("date");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.OrderLists)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderList_Address");

                entity.HasOne(d => d.PaymentType)
                    .WithMany(p => p.OrderLists)
                    .HasForeignKey(d => d.PaymentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Order_Payment");

                entity.HasOne(d => d.Shipper)
                    .WithMany(p => p.OrderLists)
                    .HasForeignKey(d => d.ShipperId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Order_Shipper");

                entity.HasOne(d => d.StatusNoNavigation)
                    .WithMany(p => p.OrderLists)
                    .HasForeignKey(d => d.StatusNo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderList_Status");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.PaymentTypeId);

                entity.ToTable("Payment", "CONTENT_MANAGEMENT");

                entity.Property(e => e.PaymentTypeId)
                    .ValueGeneratedNever()
                    .HasColumnName("PaymentTypeID");

                entity.Property(e => e.CardNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentTypeName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Shipper>(entity =>
            {
                entity.ToTable("Shipper", "CONTENT_MANAGEMENT");

                entity.Property(e => e.ShipperId)
                    .ValueGeneratedNever()
                    .HasColumnName("ShipperID");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ShipperName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.HasKey(e => e.StatusNo);

                entity.ToTable("Status", "LT_COMMON");

                entity.Property(e => e.StatusNo).ValueGeneratedNever();

                entity.Property(e => e.StatusDate).HasColumnType("date");

                entity.Property(e => e.StatusName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "COMMON");

                entity.HasIndex(e => e.Email, "UQ_User_Email")
                    .IsUnique();

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .HasDefaultValueSql("(newid())");

                entity.Property(e => e.AddressDetails)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AddressId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("AddressID")
                    .HasDefaultValueSql("(newid())");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RegistrationDate).HasColumnType("date");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Customer_Address");

                entity.HasOne(d => d.UserRoleNoNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserRoleNo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Customer_User");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => e.UserRoleNo)
                    .HasName("PK_User");

                entity.ToTable("UserRole", "LT_COMMON");

                entity.Property(e => e.UserRoleNo).ValueGeneratedNever();

                entity.Property(e => e.UserRole1)
                    .HasMaxLength(10)
                    .HasColumnName("UserRole")
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
