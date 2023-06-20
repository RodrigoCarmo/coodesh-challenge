import { ProductModel, StatusEnum } from "src/domain/models/product.model";
import { ProductEntity } from "src/infra/database/typeorm/entities/product.entity";

const handleProducts = (products: ProductModel[]) => {
  const productsList = [];

  products.forEach((item: ProductModel) => {
    const product = new ProductEntity();
    product.code = item.code.replace(/[^0-9]/g, "");
    product.url = item.url;
    product.status = StatusEnum.published;
    product.creator = item.creator;
    product.created_t = item.created_t;
    product.last_modified_t = item.last_modified_t;
    product.product_name = item.product_name;
    product.quantity = item.quantity;
    product.brands = item.brands;
    product.categories = item.categories;
    product.labels = item.labels;
    product.cities = item.cities;
    product.purchase_places = item.purchase_places;
    product.stores = item.stores;
    product.ingredients_text = item.ingredients_text;
    product.traces = item.traces;
    product.serving_size = item.serving_size;
    product.serving_quantity = item.serving_quantity;
    product.nutriscore_score = item.nutriscore_score;
    product.nutriscore_grade = item.nutriscore_grade;
    product.main_category = item.main_category;
    product.image_url = item.image_url;

    productsList.push(product);
  });

  return productsList;
};

export { handleProducts };
