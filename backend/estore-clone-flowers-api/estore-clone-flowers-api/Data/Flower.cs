namespace estore_clone_flowers_api.Model
{
    public class Flower
    {
        public Guid ID { get; set; }
        public string name { get; set; }
        public float price { get; set; }
        public string image { get; set; }
        public int stock { get; set; }
        public int categoryNo { get; set; }
        //public DateOnly deliveryTime { get; set; }
        public string description { get; set; }
    }
}
