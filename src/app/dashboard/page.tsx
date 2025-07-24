'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  MessageSquare,
  FileText,
} from 'lucide-react';

export default function DashboardScreen(): React.JSX.Element {
  return (
    <div className='p-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
          <p className='text-gray-600'>
            Welcome back! Here&apos;s your business overview.
          </p>
        </div>
        <Button className='bg-green-600 hover:bg-green-700'>
          <MessageSquare className='h-4 w-4 mr-2' />
          WhatsApp Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Today&apos;s Sales
            </CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>Rs. 12,450</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Orders</CardTitle>
            <ShoppingCart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>23</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>+8</span> WhatsApp orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Customers</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>156</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-600'>+3</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Low Stock</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>4</div>
            <p className='text-xs text-red-600'>Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MessageSquare className='h-5 w-5 text-green-600' />
              Recent WhatsApp Orders
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {[
              {
                customer: 'Ahmad Khan',
                amount: 'Rs. 2,500',
                time: '10 min ago',
                status: 'pending',
              },
              {
                customer: 'Fatima Ali',
                amount: 'Rs. 1,200',
                time: '25 min ago',
                status: 'confirmed',
              },
              {
                customer: 'Hassan Sheikh',
                amount: 'Rs. 3,400',
                time: '1 hour ago',
                status: 'delivered',
              },
            ].map((order, i) => (
              <div
                key={i}
                className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
              >
                <div>
                  <p className='font-medium'>{order.customer}</p>
                  <p className='text-sm text-gray-600'>{order.time}</p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>{order.amount}</p>
                  <Badge
                    variant={
                      order.status === 'delivered' ? 'default' : 'secondary'
                    }
                    className={
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : ''
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-blue-600' />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {[
              { name: 'Chicken Biryani', sold: 45, revenue: 'Rs. 6,750' },
              { name: 'Beef Karahi', sold: 32, revenue: 'Rs. 4,800' },
              { name: 'Mutton Pulao', sold: 28, revenue: 'Rs. 4,200' },
            ].map((product, i) => (
              <div
                key={i}
                className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
              >
                <div>
                  <p className='font-medium'>{product.name}</p>
                  <p className='text-sm text-gray-600'>
                    {product.sold} sold today
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>{product.revenue}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <Button
              variant='outline'
              className='h-20 flex-col gap-2 bg-transparent'
            >
              <ShoppingCart className='h-6 w-6' />
              New Sale
            </Button>
            <Button
              variant='outline'
              className='h-20 flex-col gap-2 bg-transparent'
            >
              <Package className='h-6 w-6' />
              Add Product
            </Button>
            <Button
              variant='outline'
              className='h-20 flex-col gap-2 bg-transparent'
            >
              <Users className='h-6 w-6' />
              Add Customer
            </Button>
            <Button
              variant='outline'
              className='h-20 flex-col gap-2 bg-transparent'
            >
              <FileText className='h-6 w-6' />
              View Invoices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
