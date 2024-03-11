using ShoppingListWebAPI.Server.Controllers;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Data
{
    public class ProductRepo(ShoppingListContext context) : IProductRepo
    {
        private readonly ShoppingListContext _context = context;

        public IEnumerable<Product> GetProducts()
        {
            return _context.Products;
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }
        public void AddProduct(Product product)
        {
            Console.WriteLine("---> Add Product...");
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
        public void SubtractProduct(Product product)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                Console.WriteLine("---> Subtract Product...");
                var item = _context.Products.FirstOrDefault(p => p.Name == product.Name);
                if (item != null)
                {
                    item.Quantity--;
                    var category = _context.Categories.FirstOrDefault(c => c.Id == product.CategoryId);
                    if (category != null)
                    {
                        category.CategoryQuantity--;
                    }
                    if (item.Quantity == 0)
                    {
                        _context.Products.Remove(item);
                    }
                }
                transaction.Commit();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public void DeleteProduct(int id)
        {
            Console.WriteLine("---> Delete Product...");
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var product = context.Products.FirstOrDefault(p => p.Id == id);
                if (product != null)
                {
                    _context.Products.Remove(product);
                    var category = _context.Categories.FirstOrDefault(c => c.Id == product.CategoryId);
                    if (category != null)
                    {
                        category.CategoryQuantity -= product.Quantity;
                    }
                    transaction.Commit();

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine($"---> Failed to delete product with id: {id}, Error: {ex.Message}");
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

        public Product? UpdateProduct(int id, Product product)
        {
            try
            {
                var productToUpdate = _context.Products.FirstOrDefault(p => p.Id == id);
                if (productToUpdate == null)
                {
                    return null;
                }
                if (product.Name != null && product.Name.Length > 0)
                {
                    productToUpdate.Name = product.Name;
                }
                if (product.CategoryId > 0 && 
                    product.CategoryId < 6 &&
                    product.CategoryId != productToUpdate.CategoryId)
                {
                    var prevCategoryId = productToUpdate.CategoryId;
                    productToUpdate.CategoryId = product.CategoryId;
                    UpdateCategoryQuantityAfterEditing(prevCategoryId, productToUpdate.Quantity, 0);
                    UpdateCategoryQuantityAfterEditing(productToUpdate.CategoryId, 0, productToUpdate.Quantity);

                }
                if (product.Quantity > 0)
                {
                    int prevProductQuantity = productToUpdate.Quantity;
                    productToUpdate.Quantity = product.Quantity;
                    UpdateCategoryQuantityAfterEditing(productToUpdate.CategoryId, prevProductQuantity, product.Quantity);

                }
                return productToUpdate;
            }
            catch (Exception e)
            {
                {
                    Console.WriteLine($"Fail to update product error: {e.Message}");
                    return null;
                }
            }
        }


    }

}

