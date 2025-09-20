import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-feed-marketplace.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Pakan Ternak
                <span className="block text-primary">Berkualitas Tinggi</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Dapatkan pakan ternak terbaik untuk meningkatkan produktivitas 
                dan kesehatan hewan ternak Anda. Kualitas terjamin, harga bersaing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/products">
                  Jelajahi Produk
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                <Link to="/auth/register">Bergabung Sekarang</Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-sm">Kualitas Terjamin</p>
                  <p className="text-xs text-muted-foreground">Standar SNI</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Truck className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">Pengiriman Cepat</p>
                  <p className="text-xs text-muted-foreground">1-3 hari</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Layanan 24/7</p>
                  <p className="text-xs text-muted-foreground">Siap membantu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={heroImage} 
                alt="Pakan Ternak Berkualitas"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">1000+</p>
                  <p className="text-sm text-muted-foreground">Produk</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">500+</p>
                  <p className="text-sm text-muted-foreground">Peternak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;