/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const plantImage = 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=80';
const plantImages = {
  p_01: 'https://images.unsplash.com/photo-1593482892290-f54927ae2bb6?auto=format&fit=crop&w=700&q=80',
  p_02: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=700&q=80',
  p_03: 'https://images.unsplash.com/photo-1597055181300-8a83c1c65b0e?auto=format&fit=crop&w=700&q=80',
  p_04: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80',
  p_05: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80',
  p_06: 'https://images.unsplash.com/photo-1596724878582-76f7a95f0f0a?auto=format&fit=crop&w=700&q=80',
  p_07: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=700&q=80',
  p_08: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=700&q=80',
  p_09: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b5a?auto=format&fit=crop&w=700&q=80',
  p_10: 'https://images.unsplash.com/photo-1617191518003-2c7b4a2f763a?auto=format&fit=crop&w=700&q=80',
  p_11: 'https://images.unsplash.com/photo-1616768759376-6c7b7c4a5c11?auto=format&fit=crop&w=700&q=80',
  p_12: 'https://images.unsplash.com/photo-1603436326446-7f7b9edb7c65?auto=format&fit=crop&w=700&q=80',
  p_13: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?auto=format&fit=crop&w=700&q=80',
  p_14: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80',
  p_15: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=700&q=80',
  p_16: 'https://images.unsplash.com/photo-1605027990121-cbae9d4f4c47?auto=format&fit=crop&w=700&q=80',
  p_17: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=700&q=80',
  p_18: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80'
};

const catalog = {
  categories: [
    { id: 'cat_01', category_name: 'Low Light Plants', plants: [
      { id: 'p_01', name: 'Snake Plant (Sansevieria)', price: 24.99, thumbnail: 'https://unsplash.com' }, { id: 'p_02', name: 'ZZ Plant (Zamioculcas zamiifolia)', price: 29.99, thumbnail: 'https://unsplash.com' }, { id: 'p_03', name: 'Cast Iron Plant (Aspidistra elatior)', price: 34.99, thumbnail: 'https://unsplash.com' },
      { id: 'p_04', name: 'Peace Lily (Spathiphyllum)', price: 19.99, thumbnail: 'https://unsplash.com' }, { id: 'p_05', name: 'Pothos Jade (Epipremnum aureum)', price: 14.99, thumbnail: 'https://unsplash.com' }, { id: 'p_06', name: 'Chinese Evergreen (Aglaonema)', price: 27.50, thumbnail: 'https://unsplash.com' }
    ] },
    { id: 'cat_02', category_name: 'Easy Care / Hard to Kill', plants: [
      { id: 'p_07', name: 'Spider Plant (Chlorophytum comosum)', price: 16.99, thumbnail: 'https://unsplash.com' }, { id: 'p_08', name: 'Aloe Vera', price: 12.99, thumbnail: 'https://unsplash.com' }, { id: 'p_09', name: 'Monstera Deliciosa', price: 39.99, thumbnail: 'https://unsplash.com' },
      { id: 'p_10', name: 'Rubber Tree (Ficus elastica)', price: 32.00, thumbnail: 'https://unsplash.com' }, { id: 'p_11', name: 'Heartleaf Philodendron', price: 18.50, thumbnail: 'https://unsplash.com' }, { id: 'p_12', name: 'Jade Plant (Crassula ovata)', price: 15.00, thumbnail: 'https://unsplash.com' }
    ] },
    { id: 'cat_03', category_name: 'Pet Friendly Plants', plants: [
      { id: 'p_13', name: 'Boston Fern (Nephrolepis exaltata)', price: 22.99, thumbnail: 'https://unsplash.com' }, { id: 'p_14', name: 'Areca Palm (Chrysalidocarpus lutescens)', price: 45.00, thumbnail: 'https://unsplash.com' }, { id: 'p_15', name: 'Parlor Palm (Chamaedorea elegans)', price: 21.99, thumbnail: 'https://unsplash.com' },
      { id: 'p_16', name: 'Calathea Rattlesnake', price: 26.99, thumbnail: 'https://unsplash.com' }, { id: 'p_17', name: 'Peperomia Obtusifolia', price: 13.50, thumbnail: 'https://unsplash.com' }, { id: 'p_18', name: 'Ponytail Palm (Beaucarnea recurvata)', price: 28.00, thumbnail: 'https://unsplash.com' }
    ] }
  ]
};

const plantsArray = catalog.categories.map((category) => ({
  ...category,
  category: category.category_name,
  plants: category.plants.map((plant) => ({
    ...plant,
    image: plant.thumbnail === 'https://unsplash.com' ? plantImages[plant.id] || plantImage : plant.thumbnail,
    description: `A thoughtful green companion for your home in the ${category.category_name.toLowerCase()} collection.`,
    cost: plant.price
  }))
}));

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const calculateTotalQuantity = () => cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const cartCount = useMemo(calculateTotalQuantity, [cart]);
  const isInCart = (id) => cart.some((item) => item.id === id);
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((previousState) => ({
      ...previousState,
      [product.name]: true
    }));
  };

  return (
    <div className="shop-page">
      <header className="navbar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); onHomeClick(); }}>
          <span className="brand-mark">&#127793;</span>
          <span><strong>Paradise Nursery</strong><small>Where Green Meets Serenity</small></span>
        </a>
        <nav className="navigation" aria-label="Main navigation">
          <a href="#home" onClick={(event) => { event.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#plants" onClick={(event) => { event.preventDefault(); setShowCart(false); }}>Plants</a>
          <button className="cart-link" type="button" onClick={() => setShowCart(true)} aria-label={`Cart with ${cartCount} items`}>
            &#128722; <span className="cart-count">{cartCount}</span>
          </button>
        </nav>
      </header>

      {!showCart ? <main className="catalog" id="plants">
        <div className="catalog-intro"><p className="eyebrow">Curated for your space</p><h1>Bring a little wild inside.</h1><p>Explore resilient, beautiful houseplants chosen to make everyday rooms feel more alive.</p></div>
        <div className="product-grid">
        {plantsArray.map((category) => <section className="plant-category" key={category.id}>
          <div className="category-heading"><h2>{category.category}</h2><span>{category.plants.length} plants</span></div>
          <div className="product-list">
            {category.plants.map((plant) => <article className="product-card" key={plant.id}>
              <img className="product-image" src={plant.image} alt={plant.name} />
              <div className="product-card-content"><h3 className="product-title">{plant.name}</h3><p className="product-description">{plant.description}</p><p className="product-cost product-price">${plant.cost.toFixed(2)}</p>
                <button className={`product-button ${isInCart(plant.id) && addedToCart[plant.name] ? 'added-to-cart' : ''}`} disabled={isInCart(plant.id) && addedToCart[plant.name]} onClick={() => handleAddToCart(plant)}>{isInCart(plant.id) && addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}</button>
              </div>
            </article>)}
          </div>
        </section>)}
        </div>
      </main> : <CartItem onContinueShopping={() => setShowCart(false)} />}
    </div>
  );
}

export default ProductList;
