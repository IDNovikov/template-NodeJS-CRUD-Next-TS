const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class AdminController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Wrong password or email"));
    }
    const candidate = await Admin.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("User whith this email is allready created")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const admin = await Admin.create({ email, role, password: hashPassword });

    const token = generateJwt(admin.id, admin.email, admin.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return next(ApiError.internal("Email is not correct"));
    }
    let comparePassword = bcrypt.compareSync(password, admin.password);
    if (!comparePassword) {
      return next(ApiError.internal("Password is not correct"));
    }
    const token = generateJwt(admin.id, admin.email, admin.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.admin.id, req.admin.email, req.admin.role);
    return res.json({ token });
  }
}

module.exports = new AdminController();

//npm i jsonwebtoken bcryptn
