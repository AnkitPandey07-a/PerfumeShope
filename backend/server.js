const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Enhanced in-memory data
const products = [
  {
    _id: '1',
    name: "Chanel No. 5",
    brand: "Chanel",
    description: "The world's most iconic fragrance. A timeless floral aldehyde that has captivated hearts for over a century.",
    longDescription: "Created in 1921 by Ernest Beaux for Coco Chanel, this legendary fragrance revolutionized perfumery with its abstract composition. The aldehydes create a sparkling opening, while the heart blooms with May rose and jasmine from Grasse.",
    price: 120,
    originalPrice: 150,
    discount: 20,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"
    ],
    sizes: [{size: "30ml", price: 85}, {size: "50ml", price: 120}, {size: "100ml", price: 180}],
    category: "Floral",
    gender: "Women",
    notes: {
      top: ["Aldehydes", "Bergamot", "Lemon"],
      middle: ["Rose", "Jasmine", "Lily of the Valley"],
      base: ["Sandalwood", "Vanilla", "Amber"]
    },
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    featured: true,
    bestseller: true,
    tags: ["Classic", "Elegant", "Timeless"]
  },
  {
    _id: '2',
    name: "Dior Sauvage",
    brand: "Dior",
    description: "Fresh and raw, Sauvage is an act of creation inspired by wide-open spaces.",
    longDescription: "Sauvage is an act of creation inspired by the Dior couture spirit. A composition by perfumer François Demachy, Sauvage is both raw and noble, with an authentic trail that vibrates with notes of fresh bergamot and spicy Sichuan pepper.",
    price: 95,
    originalPrice: 110,
    discount: 14,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400"
    ],
    sizes: [{size: "60ml", price: 95}, {size: "100ml", price: 135}],
    category: "Fresh",
    gender: "Men",
    notes: {
      top: ["Bergamot", "Pepper"],
      middle: ["Lavender", "Patchouli", "Geranium"],
      base: ["Ambroxan", "Cedar", "Labdanum"]
    },
    rating: 4.6,
    reviewCount: 1923,
    inStock: true,
    featured: true,
    bestseller: false,
    tags: ["Fresh", "Masculine", "Modern"]
  },
  {
    _id: '3',
    name: "Tom Ford Black Orchid",
    brand: "Tom Ford",
    description: "A luxurious and sensual fragrance of rich dark accords and an alluring potion of black orchids.",
    longDescription: "Tom Ford's original signature fragrance. Black Orchid is a luxurious and sensual fragrance of rich dark accords and an alluring potion of black orchids, and spice, Tom Ford's Black Orchid is both modern and timeless.",
    price: 150,
    originalPrice: 180,
    discount: 17,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400",
      "https://images.unsplash.com/photo-1574705066692-8ad3baebaf2a?w=400"
    ],
    sizes: [{size: "30ml", price: 98}, {size: "50ml", price: 150}, {size: "100ml", price: 220}],
    category: "Oriental",
    gender: "Unisex",
    notes: {
      top: ["Black Truffle", "Gardenia", "Black Currant"],
      middle: ["Black Orchid", "Spices", "Fruity Notes"],
      base: ["Patchouli", "Sandalwood", "Incense"]
    },
    rating: 4.7,
    reviewCount: 1456,
    inStock: true,
    featured: false,
    bestseller: true,
    tags: ["Luxury", "Sensual", "Dark"]
  },
  {
    _id: '4',
    name: "Versace Eros",
    brand: "Versace",
    description: "A fragrance that fuses woody, oriental and fresh notes, creating a powerful perfume.",
    longDescription: "Eros interprets the sublime masculine through a luminous aura with an intense, vibrant, and glowing combination of fresh mint leaves, Italian lemon zest, and green apple.",
    price: 85,
    originalPrice: 95,
    discount: 11,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400"
    ],
    sizes: [{size: "50ml", price: 85}, {size: "100ml", price: 125}],
    category: "Oriental",
    gender: "Men",
    notes: {
      top: ["Mint", "Green Apple", "Lemon"],
      middle: ["Tonka Bean", "Ambroxan"],
      base: ["Madagascar Vanilla", "Virginian Cedar", "Atlas Cedar"]
    },
    rating: 4.5,
    reviewCount: 987,
    inStock: true,
    featured: false,
    bestseller: false,
    tags: ["Energetic", "Youthful", "Bold"]
  },
  {
    _id: '5',
    name: "YSL Black Opium",
    brand: "Yves Saint Laurent",
    description: "The feminine answer to the iconic Black Opium. A seductive gourmand floral fragrance.",
    longDescription: "Black Opium is the first gourmand floral fragrance by Yves Saint Laurent with coffee, white flowers and vanilla. The opening is fresh and sparkling with pink pepper and orange blossom.",
    price: 110,
    originalPrice: 130,
    discount: 15,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400",
    images: [
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400",
      "https://images.unsplash.com/photo-1574705066692-8ad3baebaf2a?w=400",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=400"
    ],
    sizes: [{size: "30ml", price: 75}, {size: "50ml", price: 110}, {size: "90ml", price: 155}],
    category: "Gourmand",
    gender: "Women",
    notes: {
      top: ["Pink Pepper", "Orange Blossom", "Pear"],
      middle: ["Coffee", "Jasmine", "Bitter Almond"],
      base: ["Vanilla", "Patchouli", "Cedar"]
    },
    rating: 4.4,
    reviewCount: 1678,
    inStock: true,
    featured: true,
    bestseller: false,
    tags: ["Gourmand", "Addictive", "Modern"]
  },
  {
    _id: '6',
    name: "Creed Aventus",
    brand: "Creed",
    description: "A sophisticated blend inspired by the dramatic life of a historic emperor.",
    longDescription: "Aventus celebrates strength, power, vision and success. The fragrance is inspired by the dramatic life of a historic emperor who waged war, peace and romance with equal magnitude.",
    price: 320,
    originalPrice: 380,
    discount: 16,
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400",
    images: [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"
    ],
    sizes: [{size: "50ml", price: 320}, {size: "100ml", price: 450}],
    category: "Fruity",
    gender: "Men",
    notes: {
      top: ["Pineapple", "Bergamot", "Black Currant", "Apple"],
      middle: ["Birch", "Patchouli", "Moroccan Jasmine", "Rose"],
      base: ["Musk", "Oak Moss", "Ambergris", "Vanilla"]
    },
    rating: 4.9,
    reviewCount: 3421,
    inStock: false,
    featured: true,
    bestseller: true,
    tags: ["Luxury", "Sophisticated", "Iconic"]
  }
];

let reviews = [];
let wishlist = [];
let cart = [];
let reviewId = 1;

// Enhanced Routes
app.get('/api/products', (req, res) => {
  const { category, gender, minPrice, maxPrice, search, sort } = req.query;
  let filteredProducts = [...products];

  if (category) filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (gender) filteredProducts = filteredProducts.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
  if (minPrice) filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice));
  if (maxPrice) filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice));
  if (search) filteredProducts = filteredProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    switch(sort) {
      case 'price-low': filteredProducts.sort((a, b) => a.price - b.price); break;
      case 'price-high': filteredProducts.sort((a, b) => b.price - a.price); break;
      case 'rating': filteredProducts.sort((a, b) => b.rating - a.rating); break;
      case 'newest': filteredProducts.reverse(); break;
    }
  }

  res.json(filteredProducts);
});

app.get('/api/products/featured', (req, res) => {
  res.json(products.filter(p => p.featured));
});

app.get('/api/products/bestsellers', (req, res) => {
  res.json(products.filter(p => p.bestseller));
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/reviews/:productId', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === req.params.productId);
  res.json(productReviews);
});

app.post('/api/reviews', (req, res) => {
  const review = {
    _id: reviewId++,
    ...req.body,
    createdAt: new Date()
  };
  reviews.push(review);
  res.status(201).json(review);
});

app.get('/api/wishlist', (req, res) => {
  res.json(wishlist);
});

app.post('/api/wishlist', (req, res) => {
  const { productId } = req.body;
  if (!wishlist.find(item => item.productId === productId)) {
    wishlist.push({ productId, addedAt: new Date() });
  }
  res.json({ message: 'Added to wishlist' });
});

app.delete('/api/wishlist/:productId', (req, res) => {
  wishlist = wishlist.filter(item => item.productId !== req.params.productId);
  res.json({ message: 'Removed from wishlist' });
});

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart', (req, res) => {
  const { productId, size, quantity = 1 } = req.body;
  const existingItem = cart.find(item => item.productId === productId && item.size === size);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, size, quantity, addedAt: new Date() });
  }
  res.json({ message: 'Added to cart' });
});

app.put('/api/cart/:productId', (req, res) => {
  const { size, quantity } = req.body;
  const item = cart.find(item => item.productId === req.params.productId && item.size === size);
  if (item) {
    item.quantity = quantity;
  }
  res.json({ message: 'Cart updated' });
});

app.delete('/api/cart/:productId', (req, res) => {
  const { size } = req.query;
  cart = cart.filter(item => !(item.productId === req.params.productId && item.size === size));
  res.json({ message: 'Removed from cart' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});