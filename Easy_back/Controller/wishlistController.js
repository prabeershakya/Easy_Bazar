const { Wishlist, User, Product } = require('../Model');

const addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    const [entry, created] = await Wishlist.findOrCreate({
      where: { userId, productId }
    });
    res.json({ success: true, message: created ? 'Added!' : 'Already in wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const wishlist = await Wishlist.findAll({ where: { userId }, include: Product });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.findAll({
      include: [
        { model: Product },
        { model: User, attributes: ['id', 'username', 'email', 'role'] }
      ]
    });
    res.json(wishlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  const userId = req.user?.id;  // safer with optional chaining
  const productId = req.params?.productId;

  // console.log('removeFromWishlist called with:');
  // console.log('userId:', userId);
  // console.log('productId:', productId);

  if (!userId) {
    return res.status(401).json({ success: false, error: 'User not authenticated' });
  }

  if (!productId) {
    return res.status(400).json({ success: false, error: 'Product ID is missing' });
  }

  try {
    const deleted = await Wishlist.destroy({ where: { userId, productId } });
    if (deleted) {
      return res.json({ success: true, message: 'Removed from wishlist' });
    } else {
      return res.status(404).json({ success: false, message: 'Item not found in wishlist' });
    }
  } catch (error) {
    console.error('Error in removeFromWishlist:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
  addToWishlist,
  getWishlist,
  getAllWishlists,
  removeFromWishlist
};
