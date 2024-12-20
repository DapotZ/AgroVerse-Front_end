import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mengambil data dari API saat komponen di-mount
  useEffect(() => {
    const fetchProducts = async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${API_URL}/product/`);
        const data = await response.json();
        setProducts(data.data.slice(-3)); // Menyimpan data produk ke dalam state
        setLoading(false); // Set loading menjadi false setelah data diambil
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading menjadi false jika terjadi error
      }
    };

    fetchProducts();
  }, []); // Dependency array kosong untuk memanggil fetch hanya saat komponen di-mount

  const handleViewDetails = (productId) => {
    console.log("Navigating to product ID:", productId);
    navigate(`/belanja/product/${productId}`); // Gunakan navigate dengan route yang benar
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <section>
      <div className="mx-auto w-full text-center items-center px-4 py-8 sm:px-6 lg:px-8 text-4xl font-bold font-montserrat">
        <h1>Direkomendasikan untuk Anda</h1>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Menampilkan loader jika data sedang dimuat */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Menampilkan produk */}
            {products.map((product) => (
              <li
                key={product.product_id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                <div className="group block overflow-hidden">
                  {/* Menampilkan gambar produk jika ada */}
                  <img
                    src={
                      product.images && product.images[0]
                        ? product.images[0].image_url
                        : "default-image.jpg"
                    } // Menampilkan gambar pertama jika ada, atau gambar default
                    alt={product.name}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                  />
                </div>

                <div className="relative bg-white p-4">
                  <h3 className="text-sm font-medium text-gray-700 group-hover:underline group-hover:underline-offset-4 font-poppins">
                    {product.name} {/* Menampilkan nama produk */}
                  </h3>
                  <h3 className="text-sm font-medium text-gray-700 group-hover:underline group-hover:underline-offset-4 font-poppins">
                    {product.category.name} {/* Menampilkan nama produk */}
                  </h3>

                  <p className="mt-2 text-lg font-semibold text-gray-900 font-poppins">
                    <span className="sr-only">Regular Price</span>
                    {formatCurrency(product.price)}{" "}
                    {/* Menampilkan harga produk dalam IDR */}
                  </p>

                  <hr className="h-0.5 bg-[#303030] border-none mt-3" />

                  {/* Tombol di bawah harga */}
                  <button
                    className="mt-4 w-full rounded-md bg-hijau px-4 py-2 text-sm font-medium text-white hover:bg-[#1E7431] font-poppins"
                    onClick={() => handleViewDetails(product.product_id)}
                  >
                    Selengkapnya
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Collection;
