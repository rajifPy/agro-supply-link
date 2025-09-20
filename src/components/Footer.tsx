import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold">🌾</span>
              </div>
              <span className="text-xl font-bold">FeedMart</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Platform terpercaya untuk kebutuhan pakan ternak berkualitas tinggi. 
              Melayani peternak Indonesia dengan produk terbaik dan harga kompetitif.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Kategori
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Layanan Pelanggan</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Info Pengiriman
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  Kebijakan Return
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">info@feedmart.id</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-accent mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Jl. Pertanian No. 123,<br />
                  Jakarta Selatan 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 FeedMart. Semua hak dilindungi.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;