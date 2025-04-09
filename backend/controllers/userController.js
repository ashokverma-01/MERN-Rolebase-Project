exports.getProfile = async (req, res) => {
  try {
    const user = req.user; // from middleware
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
