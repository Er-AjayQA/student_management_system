// ***************** Imports ***************** //
const db = require("../../../config/index");
const bcrypt = require("bcrypt");
const sendOtpToEmail = require("../../../services/emailServices");
const generateOtp = require("../../../utils/otpGenerator");
const response = require("../../../utils/responseHandler");
const generateToken = require("../../../utils/tokenGenerator");
const generateLmId = require("../../../utils/lmIdGenerator");
const { Op } = require("sequelize");

// ***************** User SignUp Controller ***************** //
module.exports.userSignup = async (req, res) => {
  const { firstName, lastName, mobileNumber, mobilePrefix, email, password } =
    req.body;

  const transaction = await db.sequelize.transaction();

  try {
    const checkUserExist = await db.um_user_master.findOne({
      where: { [Op.or]: [{ email }, { mobileNumber }] },
      transaction,
    });

    if (checkUserExist) {
      await transaction.rollback();
      return response(res, 309, false, "Already registered!");
    }

    let getCode = await generateLmId("LM", 3, "lm_id", "UM_USER_MASTER");

    const hashedPassword = await bcrypt.hash(password, 12); // Hashing password
    await db.um_user_master.create(
      {
        lm_id: getCode,
        firstName,
        lastName,
        email,
        mobilePrefix,
        mobileNumber,
        password: hashedPassword,
      },
      { transaction }
    );

    await transaction.commit();
    return response(res, 201, true, "Register successfully!");
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, false, "Internal server error");
  }
};

// ***************** Send OTP Controller Controller ***************** //
module.exports.sendOtp = async (req, res) => {
  const { mobileNumber, mobilePrefix, email } = req.body;
  let user = "";

  const transaction = await db.sequelize.transaction();

  try {
    let otp = await generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user = await db.um_user_master.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { email: email },
          { mobilePrefix: mobilePrefix },
          { mobileNumber: mobileNumber },
        ],
      },
      transaction,
    });

    if (!user) {
      await transaction.rollback();
      return response(res, 404, false, "User not found!");
    }

    if (email) {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save({ transaction }); // Saving the OTP and expiry at DB
      await sendOtpToEmail(email, otp); // Sending OTP
      await transaction.commit();
      return response(res, 201, true, "OTP sent successfully");
    }

    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save({ transaction }); // Saving the OTP and expiry at DB
      await sendOtpToPhoneNumber(phoneNumber); // Sending OTP
      await transaction.commit();
      return response(res, 201, true, "OTP sent successfully");
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, false, "Internal server error");
  }
};

// ***************** ReSend OTP Controller Controller ***************** //
module.exports.resendOtp = async (req, res) => {
  const { mobileNumber, mobilePrefix, email } = req.body;
  let user = "";
  const transaction = await db.sequelize.transaction();

  try {
    let otp = await generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (email) {
      user = await db.um_user_master.findOne({ where: { email }, transaction });

      if (!user) {
        await transaction.rollback();
        return response(res, 404, false, "User not found!");
      }

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save({ transaction }); // Saving the OTP and expiry at DB
      await sendOtpToEmail(email, otp); // Sending OTP
      await transaction.commit();
      return response(res, 201, true, "OTP sent successfully");
    }

    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      user = await db.um_user_master.findOne({
        where: { mobileNumber, mobilePrefix },
        transaction,
      });

      if (!user) {
        await transaction.rollback();
        return response(res, 404, false, "User not found!");
      }

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save({ transaction }); // Saving the OTP and expiry at DB
      await sendOtpToPhoneNumber(phoneNumber); // Sending OTP
      await transaction.commit();
      return response(res, 201, true, "OTP sent successfully");
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, "Internal server error");
  }
};

// ***************** Verify OTP Controller ***************** //
module.exports.otpVerification = async (req, res) => {
  const { mobileNumber, mobilePrefix, email, otp } = req.body;
  let user = "";
  const { userId } = req.user;
  const transaction = await db.sequelize.transaction();

  try {
    // Get user details
    user = await db.um_user_master.findOne({
      where: { id: userId },
      transaction,
    });

    if (!user) {
      await transaction.rollback();
      return response(res, 404, false, "User not found!");
    }

    // If emailId provided
    if (email) {
      const currentDate = new Date(); // Get current Dates

      // Check If Otp Exist || Otp Not Matched || Otp Expired
      if (
        !user.otp ||
        String(user.otp) !== String(otp) ||
        currentDate > new Date(user.otpExpiry)
      ) {
        await transaction.rollback();
        return response(res, 400, false, "Invalid or expired otp!");
      }

      await db.um_user_master.update(
        {
          otp: null,
          otpExpiry: null,
          email,
          isEmailVerified: true,
        },
        { where: { id: userId }, transaction }
      );

      await transaction.commit();
      return response(res, 201, true, "Email verified successfully!");
    }

    // If mobile number provided
    if (mobileNumber || mobilePrefix) {
      let phoneNumber = `${mobilePrefix}${mobileNumber}`;
      const result = await verifyOtp(phoneNumber, otp);

      if (result.status !== "approved") {
        await transaction.rollback();
        return response(res, 400, false, "Invalid otp");
      }

      await db.um_user_master.update(
        {
          otp: null,
          otpExpiry: null,
          mobilePrefix,
          mobileNumber,
          isMobileVerified: true,
        },
        { where: { id: userId }, transaction }
      );

      await transaction.commit();
      return response(res, 201, true, "Mobile number verified successfully!");
    }
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, false, "Internal server error");
  }
};

// ***************** User Login Controller ***************** //
module.exports.login = async (req, res) => {
  const { userData, password, agreedToTerms } = req.body;
  let user = "";
  let token = "";
  const transaction = await db.sequelize.transaction();

  try {
    user = await db.um_user_master.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { email: userData },
          { mobileNumber: userData },
          { lm_id: userData },
        ],
        isDeleted: false,
        status: true,
      },
      transaction,
    });

    if (!user) {
      await transaction.rollback();
      return response(res, 404, false, "Please register before login!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Comparing password

    if (!isPasswordValid) {
      await transaction.rollback();
      return response(res, 400, false, "Invalid credentials!");
    }

    // Update user and fetch updated data
    await db.um_user_master.update(
      { isLoginVerified: true, agreedToTerms },
      {
        where: { id: user?.id },
        transaction,
      }
    );

    // Fetch the updated user data
    const updatedUser = await db.um_user_master.findOne({
      where: { id: user?.id },
      transaction,
    });

    token = await generateToken(user.id); // Saving token
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    await transaction.commit();
    const userInfo = {
      id: updatedUser?.id,
      lm_id: updatedUser?.lm_id,
      name: updatedUser?.firstName + " " + updatedUser?.lastName,
      email: updatedUser?.email,
      mobile: updatedUser?.mobilePrefix + "-" + updatedUser?.mobileNumber,
      bio: updatedUser?.updatedUser_bio,
      profilePicture: updatedUser?.profilePicture,
      isLoginVerified: updatedUser?.isLoginVerified,
      isEmailVerified: updatedUser?.isEmailVerified,
      agreedToTerms: updatedUser?.agreedToTerms,
    };
    return response(res, 201, true, "Login successfully", {
      token,
      userInfo,
    });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return response(res, 500, false, "Internal server error");
  }
};
