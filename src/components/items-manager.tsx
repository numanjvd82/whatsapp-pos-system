'use client';

import { useState } from 'react';
import { api } from '@/utils/api';

export default function ItemsManager() {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<
    'food' | 'beverages' | 'desserts'
  >('food');

  // tRPC queries and mutations
  const { data: items, isLoading, refetch } = api.items.getAll.useQuery();
  const createItem = api.items.create.useMutation({
    onSuccess: () => {
      refetch();
      setNewItemName('');
      setNewItemPrice('');
    },
  });
  const deleteItem = api.items.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName && newItemPrice) {
      createItem.mutate({
        name: newItemName,
        price: parseFloat(newItemPrice),
        category: newItemCategory,
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteItem.mutate({ id });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>POS System - Items Manager</h1>

      {/* Add Item Form */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <h2 className='text-xl font-semibold mb-4'>Add New Item</h2>
        <form onSubmit={handleCreateItem} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Item Name
            </label>
            <input
              type='text'
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Price
            </label>
            <input
              type='number'
              step='0.01'
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Category
            </label>
            <select
              value={newItemCategory}
              onChange={(e) =>
                setNewItemCategory(
                  e.target.value as 'food' | 'beverages' | 'desserts',
                )
              }
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='food'>Food</option>
              <option value='beverages'>Beverages</option>
              <option value='desserts'>Desserts</option>
            </select>
          </div>
          <button
            type='submit'
            disabled={createItem.isPending}
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400'
          >
            {createItem.isPending ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>

      {/* Items List */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-xl font-semibold mb-4'>Items List</h2>
        {items && items.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {items.map((item) => (
              <div
                key={item.id}
                className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
              >
                <h3 className='font-semibold text-lg'>{item.name}</h3>
                <p className='text-gray-600 capitalize'>{item.category}</p>
                <p className='text-lg font-bold text-green-600 mt-2'>
                  ${item.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  disabled={deleteItem.isPending}
                  className='mt-3 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 disabled:bg-gray-400 text-sm'
                >
                  {deleteItem.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>
            No items found. Add some items to get started!
          </p>
        )}
      </div>
    </div>
  );
}
