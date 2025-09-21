import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Mock product data - replace with real data fetch
  const product = {
    id: "1",
    name: "Pakan Ayam Broiler Premium",
    description: "Pakan ayam broiler berkualitas tinggi dengan kandungan protein optimal untuk pertumbuhan yang maksimal. Dibuat dengan bahan-bahan pilihan dan sudah teruji klinis.",
    price: 125000,
    originalPrice: 150000,
    rating: 4.8,
    reviews: 124,
    stock: 50,
    category: "Unggas",
    image: "/assets/feed-chicken.jpg",
    specifications: [
      "Protein: 21-23%",
      "Lemak: 3-5%", 
      "Serat: Max 5%",
      "Abu: Max 7%",
      "Kadar Air: Max 12%"
    ],
    benefits: [
      "Meningkatkan pertumbuhan ayam",
      "Memperbaiki konversi pakan",
      "Meningkatkan daya tahan tubuh",
      "Mengurangi angka kematian"
    ]
  };

  const handleAddToCart = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      await addToCart(id, quantity);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} ulasan)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-foreground">
                    Stok tersedia: {product.stock} karung
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Jumlah:</span>
                  <div className="flex items-center border border-primary/20 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={loading}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {loading ? 'Menambahkan...' : 'Tambah ke Keranjang'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Spesifikasi</h3>
              <ul className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {spec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Manfaat</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;