import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductById = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [rating, setRating] = useState(null);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState(""); // State untuk review text
  const [modalOpen, setModalOpen] = useState(false); // State untuk membuka/menutup modal
  const [reviews, setReviews] = useState([]); // State untuk menyimpan ulasan produk

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/product/${productId}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0].image_url);
        }
        const ratingResponse = await fetch(
          `${API_URL}/product/${productId}/rating`
        );
        const ratingData = await ratingResponse.json();
        setRating(ratingData.averageRating);
        setRatingsCount(ratingData.ratingsCount);

        // Fetch reviews
        const reviewResponse = await fetch(
          `${API_URL}/product/${productId}/review`
        );
        const reviewData = await reviewResponse.json();
        setReviews(reviewData.reviews); // Menyimpan ulasan ke state reviews
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-400">
            ★
          </span>
        ))}
        {halfStar && <span className="text-yellow-400">★</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-300">
            ★
          </span>
        ))}
      </>
    );
  };

  const handleReviewSubmit = async () => {
    if (userRating < 1 || userRating > 5) {
      alert("Please select a valid rating between 1 and 5.");
      return;
    }

    const token = localStorage.getItem("token"); // Sesuaikan dengan cara Anda menyimpan token

    if (!token) {
      alert("You must be logged in to submit a rating.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/product/${productId}/rating-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Menambahkan token di header
          },
          body: JSON.stringify({
            rating: userRating,
            review: reviewText, // Menambahkan review text
          }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setRating(updatedData.averageRating);
        setRatingsCount(updatedData.ratingsCount);
        setModalOpen(false); // Tutup modal setelah rating dan review dikirim
        setReviewText(""); // Clear review text after submission
        alert("Thank you for your review and rating!");
      } else {
        const errorMessage = await response.text(); // Dapatkan pesan error dari response
        alert(`Failed to submit review: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting your review.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="container mx-auto px-4 py-8 flex-1 overflow-y-auto">
        <div className="flex flex-col md:flex-row space-x-8">
          {/* Left Section: Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={mainImage || "default-image.jpg"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="flex space-x-4 mt-4">
              {product.images &&
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.image_url}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-75"
                    onClick={() => handleImageClick(image.image_url)}
                  />
                ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-lg font-bold">{product.category.name}</p>
            <p className="text-lg">Stok : {product.quantity}</p>

            {/* Rating Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {rating ? (
                  <>
                    <div className="flex space-x-1">
                      {renderRatingStars(rating)}
                    </div>
                    <span className="text-gray-400 ml-2">
                      ({ratingsCount}{" "}
                      {ratingsCount === 1 ? "rating" : "ratings"})
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500">No ratings yet</span>
                )}
              </div>
            </div>

            {/* Tombol Berikan Rating dan Review */}
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Berikan Rating & Review
            </button>

            {/* Modal Popup untuk Rating & Review */}
            {modalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg w-96">
                  <h2 className="text-2xl font-semibold mb-4">
                    Pilih Rating Anda dan Berikan Review
                  </h2>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setUserRating(star)}
                        className={`cursor-pointer text-4xl ${
                          userRating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full p-2 border rounded-md mb-4"
                  ></textarea>
                  <button
                    onClick={handleReviewSubmit}
                    className="bg-green-500 text-white px-6 py-2 rounded-md mr-2"
                  >
                    Kirim Rating & Review
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-red-500 text-white px-6 py-2 rounded-md"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 mt-4">
              <span className="text-xl text-green-600 font-semibold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.price)}
              </span>
            </div>

            <div className="flex space-x-4 mt-4">
              <a
                href={`https://wa.me/6287895725558?text=Halo,%20saya%20tertarik%20dengan%20produk%20Anda.%0A%0ANama%20Produk%20:%20${encodeURIComponent(
                  product.name
                )}%0AKategori%20Produk%20:%20${encodeURIComponent(
                  product.category.name
                )}%0AStok%20:%20${encodeURIComponent(product.quantity)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-green-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-green-600">
                  Beli Sekarang
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Daftar Review */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Ulasan Produk</h2>
          {reviews.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {reviews.map((review) => (
                <li key={review.rating_id} className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {review.user.username}
                    </span>
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    {renderRatingStars(review.rating)}
                  </div>
                  <p className="mt-2">
                    {review.review || "No review provided."}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">Belum ada ulasan untuk produk ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductById;
