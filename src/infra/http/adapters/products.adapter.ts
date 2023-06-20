const handleProducts = (products) => {
  const productsList = [];
  products.forEach((product) => {
    productsList.push({
      code: product.code,
      url: product.url,
      creator: product.creator,
      created_t: product.created_t,
      last_modified_t: product.last_modified_t,
      product_name: product.product_name,
      quantity: product.quantity,
      brands: product.brands,
      categories: product.categories,
      labels: product.labels,
      cities: product.cities,
      purchase_places: product.purchase_places,
      stores: product.stores,
      ingredients_text: product.ingredients_text,
      traces: product.traces,
      serving_size: product.serving_size,
      serving_quantity: product.serving_quantity,
      nutriscore_score: product.nutriscore_score,
      nutriscore_grade: product.nutriscore_grade,
      main_category: product.main_category,
      image_url: product.image_url,
    });
  });

  return productsList;
};

export { handleProducts };
