using estore_clone_flowers_api.Model;
using System.Data;
using System.Data.SqlClient;

namespace estore_clone_flowers_api.Services
{
    public class FlowerServices : IFlowerService
    {
        public string Constr { get; set; }
        public IConfiguration _configuration;
        public SqlConnection con;
        List<Flower> flowers = new List<Flower>();

        public FlowerServices(IConfiguration configuration)
        {
            _configuration = configuration;
            Constr = _configuration.GetConnectionString("DBConnection");
        }

        public List<Flower> GetFlowersRecord()
        {
            try
            {
                using (con = new SqlConnection(Constr))
                {
                    con.Open();
                    var cmd = new SqlCommand("SP_GetFlowersRecords",con);

                    cmd.CommandType = CommandType.StoredProcedure;

                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Flower flower = new Flower();
                        flower.ID = ((Guid)rdr["FlowerID"]);
                        flower.name = rdr["FlowerName"].ToString();
                        flower.price = Convert.ToInt32(rdr["Price"]);
                        flower.stock = Convert.ToInt32(rdr["Stock"]);
                        flower.image = rdr["Image"].ToString();
                        flower.categoryNo = Convert.ToInt32(rdr["CategoryNo"]);
                        //flower.deliveryTime = (DateOnly)(rdr["DeliveryTime"]);
                        flower.description = rdr["FlowerDescription"].ToString();
                        flowers.Add(flower);
                    }
                }
                return flowers;
            }
            catch (Exception)
            {
                throw;
            }
        }
        



    }

    public interface IFlowerService
    {
        public List<Flower> GetFlowersRecord();

        //public void AddFlower();

        
    }
}
