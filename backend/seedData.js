const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const products = [
  {
    name: "Chanel No. 5",
    description: "The world's most iconic fragrance. A timeless floral aldehyde.",
    price: 120,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"
    ],
    sizes: ["30ml", "50ml", "100ml"]
  },
  {
    name: "Dior Sauvage",
    description: "Fresh and raw, Sauvage is an act of creation inspired by wide-open spaces.",
    price: 95,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400"
    ],
    sizes: ["60ml", "100ml"]
  },
  {
    name: "Tom Ford Black Orchid",
    description: "A luxurious and sensual fragrance of rich dark accords.",
    price: 150,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400"
    ],
    sizes: ["30ml", "50ml", "100ml"]
  },
  {
    name: "Versace Eros",
    description: "A fragrance that fuses woody, oriental and fresh notes.",
    price: 85,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"
    ],
    sizes: ["50ml", "100ml"]
  },
  {
    name: "Yves Saint Laurent Black Opium",
    description: "The feminine answer to the iconic Black Opium.",
    price: 110,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400",
    images: [
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400",
      "https://images.unsplash.com/photo-1574705066692-8ad3baebaf2a?w=400"
    ],
    sizes: ["30ml", "50ml", "90ml"]
  }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();