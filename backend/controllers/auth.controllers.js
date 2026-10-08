const otpGenrator = require("otp-generator");
const registerSchema = require("../Schema/registration.schema");
const User = require("../models/user.model");
const TempUser = require("../models/tempUser.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOtp } = require("../services/email");
const { success } = require("zod");
require("dotenv").config();

exports.registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "please fill all the fileds",
      });
    }
    registerSchema.safeParse(req.body);

    //check if user is already exits with this email or not
    const isExists = await User.findOne({ email });
    if (isExists) {
      res.status(401).json({
        success: false,
        message: "user already exits with this email",
      });
    }

    //genrate otp
    const otp = otpGenrator.generate(6, {
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });

    const hashedPassword = await bcrypt.hash(password, 6);
    const hashedOtp = await bcrypt.hash(otp, 6);

    sendOtp(email, otp, userName);

    await TempUser.findOneAndUpdate(
      { email },
      {
        userName: userName.trim(" "),
        email: email,
        password: hashedPassword,
        otp: hashedOtp,
        expiresTime: new Date(Date.now() + 2 * 60 * 1000),
      },
      { upsert: true },
    );

    res.status(200).json({
      success: true,
      message: "user is not verified",
    });
  } catch (error) {
    console.log("error in registration handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.verifyController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("email : ", email, " otp : ", otp);
    if (!email || !otp) {
      return res.status(401).json({
        success: false,
        message: "please enter the fields",
      });
    }
    const user = await TempUser.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "otp is expired or not found",
      });
    }
    if (user.expiresTime < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "invalid otp",
      });
    }

    const compareOtp = await bcrypt.compare(otp, user.otp);
    if (!compareOtp) {
      return res.status(401).json({
        success: false,
        message: "otp not matched",
      });
    }

    const verifiedUser = await User.create({
      userName: user.userName,
      email: user.email,
      password: user.password,
      profileUrl: `${process.env.BASE_URL}/m/` + user.userName,
    });
    //delted the old data
    await TempUser.findByIdAndDelete(user._id);

    res.status(200).json({
      success: true,
      message: "user is verified",
    });
  } catch (error) {
    console.log("error while veirifying user : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "please enter email or password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not exists with this email",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        profileUrl: user.profileUrl,
      },
    });
  } catch (error) {
    console.log("error while login : ", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.getMeController = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "invalid id",
      });
    }

    const user = await User.findById(id).populate("feedBack");
    res.status(200).json({
      success: true,
      user: {
        userName: user.userName,
        email: user.email,
        feedbacks: user.feedBack,
        acceptingFeedback: user.acceptingFeedback,
        profileUrl: user.profileUrl,
      },
    });
  } catch (error) {
    console.log("error while fetching user details  : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.refreshAccessTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "invalid refreshToken",
      });
    }
    const decode = jwt.verify(refreshToken, process.env.JWT_SECRET);

    console.log(decode);

    const payload = {
      id: decode.id,
      email: decode.email,
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "token updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.logOutController = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });

  } catch (error) {
    console.log("Error while logging out:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};