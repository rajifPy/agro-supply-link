import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Semua Produk Pakan Ternak
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan pakan ternak berkualitas untuk semua jenis hewan ternak Anda
            </p>
          </div>
          
          <ProductGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;