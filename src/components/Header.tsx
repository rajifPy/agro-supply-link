import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-primary/10 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🌾</span>
            </div>
            <span className="text-xl font-bold text-primary">FeedMart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Produk
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Kategori
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              Tentang Kami
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari pakan ternak..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
            
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/auth/login">Masuk</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">Daftar</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/10 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/products" 
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Produk
              </Link>
              <Link 
                to="/categories" 
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Kategori
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
              <div className="pt-4 border-t border-primary/10">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/auth/login">Masuk</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth/register">Daftar</Link>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;