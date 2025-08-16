import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PracticeChart } from '@/components/practice-chart';
import { Badge } from '@/components/ui/badge';

const recentTrades = [
  {
    stock: 'RELIANCE',
    type: 'Buy',
    quantity: 10,
    price: 2850.75,
    status: 'Executed',
  },
  {
    stock: 'TCS',
    type: 'Sell',
    quantity: 5,
    price: 3805.2,
    status: 'Executed',
  },
  {
    stock: 'HDFCBANK',
    type: 'Buy',
    quantity: 15,
    price: 1520.4,
    status: 'Pending',
  },
];

export default function PracticePage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">Trading Simulator</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle>RELIANCE Industries</CardTitle>
              <CardDescription>NSE: RELIANCE</CardDescription>
            </CardHeader>
            <CardContent>
              <PracticeChart />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" placeholder="Market Price" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Buy</Button>
              <Button variant="destructive" className="w-full">Sell</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between"><span className="text-muted-foreground">Invested Value</span> <strong>₹1,50,000</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Current Value</span> <strong>₹1,55,750</strong></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Overall P/L</span> <strong className="text-green-600">+₹5,750 (+3.83%)</strong></div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTrades.map((trade) => (
                <TableRow key={trade.stock}>
                  <TableCell className="font-medium">{trade.stock}</TableCell>
                  <TableCell>
                    <Badge variant={trade.type === 'Buy' ? 'default' : 'destructive'} className={trade.type === 'Buy' ? 'bg-green-500' : ''}>{trade.type}</Badge>
                  </TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell>₹{trade.price.toFixed(2)}</TableCell>
                  <TableCell>
                  <Badge variant={trade.status === 'Executed' ? 'secondary' : 'outline'}>{trade.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
