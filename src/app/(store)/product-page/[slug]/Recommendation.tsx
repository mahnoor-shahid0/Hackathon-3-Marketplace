"use client";
import { useEffect, useState } from "react";
import { client } from "../../../../sanity/lib/client"; // Import the Sanity client
import Image from "next/image";

// Define the type for the product data
interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  price: number;
  discountPercentage: number;
  description: string;
  image: {
    asset: {
      url: string;
    };
  };
  rating: number;
}

const RecommendationSection = () => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  // Function to fetch products from Sanity and shuffle them
  const fetchRandomProducts = async () => {
    try {
      // Query to get necessary fields from Sanity
      const products: Product[] = await client.fetch(`
        *[_type == "product"][0..5] {
          _id,
          name,
          slug,
          price,
          discountPercentage,
          description,
          image {
            asset -> {
              url
            }
          },
          rating
        }
      `);

      // Shuffle the products array and pick the first 6
      const shuffled = products.sort(() => 0.5 - Math.random()).slice(0, 6);
      setRandomProducts(shuffled);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchRandomProducts(); // Fetch products on component mount
  }, []);

  return (
    <section className="max-w-md sm:max-w-lg md:max-w-4xl lg:max-w-6xl mx-auto bg-gray-50">
      <div className="text-center text-4xl md:text-5xl mb-5 font-bold bg-gradient-to-r from-gray-900 via-gray-500 to-black bg-clip-text text-transparent">
        <h1>Recommended Products</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {randomProducts.map((product) => (
          <div
            key={product._id}
            className="m-auto transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-gray-50 hover:rounded-lg my-10"
          >
            <Image
              className="w-full h-auto object-cover rounded-md mb-5"
              src={product.image.asset.url}
              alt={product.name}
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-xl font-semibold text-[#029fae] mb-2">${product.price}</p>
            {product.discountPercentage && (
              <p className="text-sm text-gray-600">Discount: {product.discountPercentage}%</p>
            )}

            {/* Ratings */}
            <div className="flex my-2">
              {[...Array(5)].map((_, index) => (
                <Image
                  key={index}
                  width="20"
                  height="20"
                  src="https://<Image.icons8.com/emoji/48/star-emoji.png"
                  alt="star-emoji"
                />
              ))}
            </div>

            {/* Card Button */}
            <div>
              <button
                className="mt-5 text-sm w-full max-w-64 h-[40px] bg-[#029fae] text-white 
                rounded-md snipcart-add-item font-semibold bg-gradient-to-b from-[#029fae] 
                to-teal-600 shadow:sm transform transition-all duration-300 hover:scale-105"
                data-item-id={product._id}
                data-item-name={product.name}
                data-item-price={product.price}
                data-item-url={`/product-page/${product.slug.current}`}
                data-item-image={product.image.asset.url}
                data-item-description={product.description}
              >
                <i className="bi bi-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendationSection;
