using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Data
{
    public class ProductRepo(ShoppingListContext context) : IProductRepo
    {
        private readonly ShoppingListContext _context = context;

        public void AddProduct(Product p)
        {
            AddProcess(p);
        }

        public IEnumerable<Product> GetProducts()
        {
            return _context.Products;
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void SubtractProduct(Product p)
        {
            throw new NotImplementedException();
        }
        private void AddProcess(Product product)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var newItem = _context.Products.FirstOrDefault(e => e.Name == product.Name);
                if (newItem != null)
                {
                    newItem.Quantity++;
                    UpdateCategoryQuantityAfterAdding(newItem.CategoryId);
                }
                else
                {
                    product.Quantity = 1;
                    _context.Products.Add(product);
                    UpdateCategoryQuantityAfterAdding(product.CategoryId);
                }
                transaction.Commit();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
        private void SubtractProcess(Product product)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var item = _context.Products.FirstOrDefault(p => p.Name == product.Name);
                if (item != null)
                {
                    product.Quantity--;
                    var category = _context.Categories.FirstOrDefault(c => c.Id == product.CategoryId);
                    if (category != null)
                    {
                        category.CategoryQuantity--;
                    }
                    if (product.Quantity == 0)
                    {
                        _context.Products.Remove(product);
                    }
                }
                transaction.Commit();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        private void UpdateCategoryQuantityAfterAdding(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category != null)
            {
                category.CategoryQuantity++;
            }
        }

        private void UpdateCategoryQuantityAfterEditing(int categoryId, int prevProductQuantity, int updatedProductquantity)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == categoryId);
            if (category != null)
            {
                category.CategoryQuantity = category.CategoryQuantity - prevProductQuantity + updatedProductquantity;
            }
        }
    }
}
