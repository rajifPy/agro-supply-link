import { useState, useEffect } from "react";
import { Users, Package, ShoppingBag, DollarSign, Eye, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Stats {
  totalSellers: number;
  totalBuyers: number;
  totalProducts: number;
  totalRevenue: number;
}

interface PendingSeller {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ totalSellers: 0, totalBuyers: 0, totalProducts: 0, totalRevenue: 0 });
  const [pendingSellers, setPendingSellers] = useState<PendingSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch stats
      const [sellersResult, buyersResult, productsResult, ordersResult, pendingSellersResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('role', 'seller').eq('status', 'active'),
        supabase.from('profiles').select('*').eq('role', 'buyer'),
        supabase.from('products').select('*'),
        supabase.from('orders').select('total_amount'),
        supabase.from('profiles').select('*').eq('role', 'seller').eq('status', 'pending')
      ]);

      if (sellersResult.error) throw sellersResult.error;
      if (buyersResult.error) throw buyersResult.error;
      if (productsResult.error) throw productsResult.error;
      if (ordersResult.error) throw ordersResult.error;
      if (pendingSellersResult.error) throw pendingSellersResult.error;

      const totalRevenue = ordersResult.data?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

      setStats({
        totalSellers: sellersResult.data.length,
        totalBuyers: buyersResult.data.length,
        totalProducts: productsResult.data.length,
        totalRevenue
      });

      setPendingSellers(pendingSellersResult.data || []);
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSellerApproval = async (sellerId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: approved ? 'active' : 'suspended' })
        .eq('id', sellerId);

      if (error) throw error;

      toast({
        title: approved ? "Seller approved" : "Seller rejected",
        description: approved ? "The seller can now start selling products." : "The seller has been rejected."
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error updating seller status",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Kelola platform pakan ternak Anda</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Penjual</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stats.totalSellers}</div>
                <p className="text-xs text-muted-foreground">Penjual aktif</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pembeli</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{stats.totalBuyers}</div>
                <p className="text-xs text-muted-foreground">Pembeli terdaftar</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Produk aktif</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{formatPrice(stats.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">Dari semua transaksi</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending">Penjual Pending ({pendingSellers.length})</TabsTrigger>
              <TabsTrigger value="transactions">Transaksi</TabsTrigger>
              <TabsTrigger value="categories">Kategori</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Penjual Menunggu Persetujuan</CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingSellers.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Tidak ada penjual yang menunggu persetujuan</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Tanggal Daftar</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingSellers.map((seller) => (
                          <TableRow key={seller.id}>
                            <TableCell className="font-medium">
                              {seller.full_name || 'Tidak ada nama'}
                            </TableCell>
                            <TableCell>{seller.email}</TableCell>
                            <TableCell>
                              {new Date(seller.created_at).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSellerApproval(seller.id, true)}
                                  className="bg-success hover:bg-success/90"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Setujui
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleSellerApproval(seller.id, false)}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Tolak
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaksi Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Fitur transaksi akan ditampilkan di sini</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Kelola Kategori</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Fitur kategori akan ditampilkan di sini</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;