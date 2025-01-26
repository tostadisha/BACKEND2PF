import ProductService from "../services/products.service.js";
import { generateCustomResponses } from "../utils/generateCustomResponses.js";
const productService = new ProductService();

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    if (!products || products.length === 0) {
      return res.sendNotFound("No se han encontrado productos");
    }
    res.sendSuccess(products, "Productos encontrados");
  } catch (error) {
    res.sendServerError(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendBadRequest("No se ha proporcionado un ID");
    }
    const product = await productService.getProductById(id);
    if (!product) {
      return res.sendNotFound(
        `No se ha encontrado un producto con el ID: ${id}`
      );
    }
    res.sendSuccess(product, "Producto encontrado");
  } catch (error) {
    res.sendServerError(error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;
    console.log(name, price, category, stock);

    // Validación de name
    if (!name || typeof name !== "string") {
      return res.sendBadRequest(
        "El nombre es obligatorio y debe ser un string."
      );
    }

    // Validación de precio
    if (typeof price !== "number" || price <= 0) {
      return res.sendBadRequest("El precio debe ser un número mayor a 0.");
    }

    // Validación de categoría
    if (!category || typeof category !== "string") {
      return res.sendBadRequest(
        "La categoría es obligatoria y debe ser un string."
      );
    }

    // Validación de stock
    if (typeof stock !== "number" || stock <= 0) {
      return res.sendBadRequest("El stock debe ser un número mayor a 0.");
    }

    // Verificar si el producto ya existe
    const exist = await productService.getProduct(name);
    if (exist) {
      return res.sendBadRequest("El producto ya existe.");
    }

    // Crear el nuevo producto
    const newProduct = await productService.addProduct(req.body);
    res.sendCreated(newProduct, "Producto creado correctamente");
  } catch (error) {
    res.sendServerError(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (!id) {
      return res.sendBadRequest("No se ha proporcionado un ID");
    }
    const existingProduct = await productService.getProductById(id);
    if (!existingProduct) {
      return res.sendNotFound(
        `No se ha encontrado un producto con el ID: ${id}`
      );
    }
    if (
      updates.price !== undefined ||
      updates.prices <= 0 ||
      updates.price === 0
    ) {
      return res.sendBadRequest("Revise el valor del precio");
    }
    if (
      updates.stock !== undefined ||
      updates.stock <= 0 ||
      updates.stock === 0
    ) {
      return res.sendBadRequest("Revise el valor del stock");
    }

    const updatedProduct = await productService.updateProduct(id, updates);
    res.sendSuccess(updatedProduct, "El producto ha sido actualizado");
  } catch (error) {
    res.sendServerError(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendBadRequest("El ID no ha sido proporcionado");
    }
    const existingProduct = await productService.getProductById(id);
    if (!existingProduct) {
      return res.sendNotFound(
        `No se ha encontrado un producto con el ID: ${id}`
      );
    }
    const deletedProduct = await productService.deleteProduct(id);
    res.sendSuccess(deletedProduct, "El producto ha sido eliminado");
  } catch (error) {
    res.sendServerError(error);
  }
};
