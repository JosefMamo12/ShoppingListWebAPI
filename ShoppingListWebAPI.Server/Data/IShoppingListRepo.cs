namespace ShoppingListWebAPI.Server.Data
{
    public interface IShoppingListRepo<T>
    {
        bool SaveChanges();
        void Add(T entitity);
        void Update(T entitity);
        T get(int id);
        void delete(int id);
    }
}
