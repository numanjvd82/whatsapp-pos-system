import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8'>
          WhatsApp POS System
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Items Management</CardTitle>
              <CardDescription>
                Add, edit, and manage your inventory items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Manage your product catalog with ease. Add new items, update
                prices, and organize by categories.
              </p>
              <Button className='w-full'>Manage Items</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Dashboard</CardTitle>
              <CardDescription>
                Track your sales and revenue in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Monitor your business performance with detailed analytics and
                sales reports.
              </p>
              <Button variant='outline' className='w-full'>
                View Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>
                Process orders directly from WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Seamlessly handle customer orders and payments through WhatsApp
                messaging.
              </p>
              <Button variant='secondary' className='w-full'>
                Setup WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for your POS system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap gap-4'>
              <Button>Add New Item</Button>
              <Button variant='outline'>Process Order</Button>
              <Button variant='secondary'>View Reports</Button>
              <Button variant='ghost'>Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
