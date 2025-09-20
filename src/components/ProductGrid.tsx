import { useState } from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import feedChicken from "@/assets/feed-chicken.jpg";
import feedCattle from "@/assets/feed-cattle.jpg";
import feedGoat from "@/assets/feed-goat.jpg";

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Pakan Ayam Broiler Premium",
    category: "Unggas",
    price: 125000,
    originalPrice: 150000,
    rating: 4.8,
    reviews: 124,
    image: feedChicken,
    badge: "Terlaris",
    stock: 50
  },
  {
    id: 2,
    name: "Konsentrat Sapi Perah",
    category: "Sapi",
    price: 180000,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: feedCattle,
    badge: "Premium",
    stock: 30
  },
  {
    id: 3,
    name: "Pakan Kambing Fermentasi",
    category: "Kambing",
    price: 95000,
    originalPrice: 110000,
    rating: 4.7,
    reviews: 67,
    image: feedGoat,
    badge: "Diskon",
    stock: 25
  },
  {
    id: 4,
    name: "Pakan Ikan Lele Apung",
    category: "Ikan",
    price: 85000,
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    image: feedChicken,
    badge: null,
    stock: 40
  },
  {
    id: 5,
    name: "Pakan Babi Starter",
    category: "Babi",
    price: 165000,
    originalPrice: null,
    rating: 4.8,
    reviews: 45,
    image: feedCattle,
    badge: "Baru",
    stock: 20
  },
  {
    id: 6,
    name: "Pakan Kelinci Pelet",
    category: "Kelinci",
    price: 75000,
    originalPrice: 85000,
    rating: 4.5,
    reviews: 78,
    image: feedGoat,
    badge: "Hemat",
    stock: 35
  }
];

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  
  const categories = ["Semua", "Unggas", "Sapi", "Kambing", "Ikan", "Babi", "Kelinci"];
  
  const filteredProducts = selectedCategory === "Semua" 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case "Terlaris": return "default";
      case "Premium": return "secondary";
      case "Diskon": return "destructive";
      case "Baru": return "outline";
      case "Hemat": return "secondary";
      default: return "default";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Produk Pakan Ternak Terpopuler
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilihan lengkap pakan berkualitas untuk semua jenis ternak Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge 
                      className="absolute top-3 left-3"
                      variant={getBadgeVariant(product.badge)}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} ulasan)
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Stok: {product.stock} karung
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Tambah ke Keranjang
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Lihat Lebih Banyak Produk
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;