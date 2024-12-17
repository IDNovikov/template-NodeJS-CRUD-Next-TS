const uuid = require("uuid");
const path = require("path");
const { Product } = require("../models/models");
const ApiError = require("../error/apiError");
const fs = require("fs");
const { Op } = require("sequelize");

class ProductController {
  async create(req, res, next) {
    try {
      let { name, description, article } = req.body;
      let price = Number(req.body.price);
      let discount = Number(req.body.discount);
      const images = req.files;

      const data = [];
      function fileName() {
        return uuid.v4() + ".jpg";
      }
      for (const key in images) {
        const img = images[key];
        const name = fileName();
        img.mv(path.resolve(__dirname, "..", "static", name));
        data.push(name);
      }
      let dataString = JSON.stringify(data);
      console.log(name, description, price, discount, article, dataString);

      const product = await Product.create({
        name,
        description,
        price,
        discount,
        article,
        img: dataString,
      });
      return res.json(product);
    } catch (err) {
      next(ApiError.badRequest("Error with creating"));
    }
  }

  async getAll(req, res, next) {
    try {
      let { prices, search, page = 1, limit = 10 } = req.query;
      page = page - 1;
      limit = parseInt(limit, 10);
      let offset = page * limit;

      let whereConditions = {};

      if (Array.isArray(prices) && prices.length === 2) {
        const [minPrice, maxPrice] = prices.map(Number);
        whereConditions.price = {
          [Op.between]: [minPrice, maxPrice],
        };
      }
      if (search) {
        whereConditions.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      const products = await Product.findAndCountAll({
        where: whereConditions,
        limit,
        offset,
      });

      res.json(products);
    } catch (err) {
      next(ApiError.badRequest(err.massage));
    }
  }
  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });
    return res.json(product);
  }

  async delete(req, res, next) {
    console.log(req.params.id);
    try {
      let productID = req.params.id;
      console.log("work" + productID);
      const product = await Product.findOne({ where: { id: productID } });
      let images = JSON.parse(product.img);
      for (let item of images) {
        await deletingImages(item);
      }
      async function deletingImages(item) {
        const filePath = path.join(__dirname, "..", "static", item);
        fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).send("Error files is note deleted");
          }
        });
        const PROD = await Product.destroy({ where: { id: productID } });

        return res.json("Files succesfully deleted");
      }
    } catch (err) {
      next(ApiError.badRequest(err.massage));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params; // Получаем ID продукта из параметров запроса
      const { name, description, article } = req.body.name || {};
      const price = req.body.price ? Number(req.body.price) : undefined;
      const discount = req.body.discount
        ? Number(req.body.discount)
        : undefined;
      const images = req.files;

      const product = await Product.findByPk(id);
      if (!product) {
        return next(ApiError.badRequest("Product not found"));
      }

      let updatedImages = JSON.parse(product.img || "[]");
      if (images) {
        const newImages = [];
        function fileName() {
          return uuid.v4() + ".jpg";
        }
        for (const key in images) {
          const img = images[key];
          const name = fileName();
          img.mv(path.resolve(__dirname, "..", "static", name));
          newImages.push(name);
        }
        updatedImages = [...updatedImages, ...newImages];
      }

      await product.update({
        name: name || product.name,
        description: description || product.description,
        price: price !== undefined ? price : product.price,
        discount: discount !== undefined ? discount : product.discount,
        article: article || product.article,
        img: JSON.stringify(updatedImages),
      });

      return res.json(product);
    } catch (err) {
      next(ApiError.badRequest("Error updating product"));
    }
  }
}

module.exports = new ProductController();
