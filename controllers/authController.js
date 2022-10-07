const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
  const { firstName, lastName, middleName, email, bitcoinAddress, referralCode, password, isAdmin } = req.body;
  try {
    const emailExist = await User.findOne({ email })
    if (emailExist) {
      res.status(400).json({ message: 'Email already exist.' })
    } else {
      const hashedPassword = await bcrypt.hash(password, 12)

      //add referral code to user referrals
      if (referralCode && referralCode !== '' && referralCode !== undefined && referralCode !== null) {
        const refer = await User.findOne({ referralCode })
        if (refer) {
          await User.findByIdAndUpdate({ id: refer._id }, { $addToSet: { referrals: email } }, { new: true })
        }
        next();
      }

      const user = await User.create({
        firstName,
        lastName,
        middleName,
        email,
        bitcoinAddress,
        password: hashedPassword,
        role: isAdmin && 'admin'
      });

      res.status(201).json({ user })
    }
  } catch (err) {
    res.status(400).json(err)
    // console.log(error)
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ message: 'Invalide Credenntials' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalide Credenntials' })
    }
    const accessToken = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: "12h" });
    const refreshToken = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "336h" });
    res.status(200).json({ accessToken, user, refreshToken })
  } catch (err) {
    // res.status(401).json({data: null, error: err})
    console.log(err)
  }
};

const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    const password = user.firstName + user.phoneNumber;

    const hashedPassword = await bcrypt.hash(password, 12)
    await User.findByIdAndUpdate({ id: user._id }, { password: hashedPassword }, { new: true })

    res.status(201).json({ message: "New password has been sent to your email" })
  } catch (error) {
    console.log(error);
    next(new Error(error));
  }
}

// const creditReferral = async (req, res) => {
//   const { referralCode, email } = req.body;
//   const user = await User.findOne({ referralCode })
//   if (user) {
//     await User.findByIdAndUpdate({ id: user._id }, { $addToSet: { referrals: email } }, { new: true })
//   }
//   return { message: 'Referral code added successfully' }
// }

const refreshToken = (req, res) => {
  try {
    const rf_token = req.body.refreshToken;
    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });

      const accesstoken = createAccessToken(user.id, user.role, user.email);

      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/auth/refresh_token" });
    return res.json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createAccessToken = (userId, userRole, userEmail) => {
  const accessToken = jwt.sign({ id: userId, role: userRole, email: userEmail }, process.env.JWT_SECRET, { expiresIn: "12h" });
  return accessToken
}

module.exports = { register, login, logout, refreshToken, forgetPassword }