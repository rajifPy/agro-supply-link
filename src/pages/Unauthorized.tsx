import { Shield, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Unauthorized = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader className="pb-6">
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Akses Ditolak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Maaf, Anda tidak memiliki akses untuk halaman yang diminta.
                </p>
                <p className="text-muted-foreground">
                  Halaman ini memerlukan role atau izin khusus yang tidak Anda miliki.
                </p>
              </div>

              {profile && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Informasi Akun:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Role:</span>
                      <span className="capitalize">{profile.role}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`font-medium ${
                        profile.status === 'active' ? 'text-success' : 
                        profile.status === 'pending' ? 'text-warning' : 'text-destructive'
                      }`}>
                        {profile.status === 'active' ? 'Aktif' : 
                         profile.status === 'pending' ? 'Pending' : 'Suspended'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Jika Anda merasa ini adalah kesalahan, silakan hubungi administrator.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/">
                      <Home className="h-4 w-4 mr-2" />
                      Kembali ke Beranda
                    </Link>
                  </Button>
                  <Button onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Unauthorized;