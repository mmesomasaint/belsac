import { MiniProduct } from "./product";

// Sort ascending
function sortByNameAsc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

// Sort descending
function sortByNameDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return b.name.localeCompare(a.name);
  });
}

// Sort ascending
function sortByDateAsc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return a.date - b.date;
  });
}

// Sort descending
function sortByDateDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return b.date - a.date;
  });
}

// Sort ascending
function sortByPriceAsc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return a.price - b.price;
  });
}

// Sort descending
function sortByPriceDesc(products: MiniProduct[]) {
  return products.slice().sort((a, b) => {
    return b.price - a.price;
  });
}