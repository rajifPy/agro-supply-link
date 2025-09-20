import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication with Supabase
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🌾</span>
            </div>
            <span className="text-2xl font-bold text-primary">FeedMart</span>
          </Link>
        </div>

        <Card className="border-primary/10 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Masuk ke Akun Anda</CardTitle>
            <CardDescription>
              Masuk untuk mengakses dashboard dan mulai berbelanja
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="remember" className="rounded" />
                  <Label htmlFor="remember" className="text-sm">Ingat saya</Label>
                </div>
                <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Lupa password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Masuk
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Link to="/auth/register" className="text-primary hover:underline font-medium">
                  Daftar sekarang
                </Link>
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground">Atau masuk sebagai</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" size="sm" disabled>
                <span className="text-xs">Admin</span>
              </Button>
              <Button variant="outline" size="sm" disabled>
                <span className="text-xs">Penjual</span>
              </Button>
              <Button variant="outline" size="sm" disabled>
                <span className="text-xs">Pembeli</span>
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              Demo login akan tersedia setelah integrasi Supabase
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;