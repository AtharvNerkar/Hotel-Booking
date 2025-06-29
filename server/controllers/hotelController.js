import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    //Check if User Already Registered
    const hotel = await Hotel.findOne({ owner });

    if (hotel) {
      return res.json({ success: false, message: "Hotel Already Registred" });
    }

    await Hotel.create({ name, address, contact, city, owner });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel Registered Successfully." });
  } catch (error) {
    console.error("Register Hotel Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
