import { Product } from "../services/productServices";

export function calSalePrice(product : Product) {
    let salePrice = Math.round(product.price * (1 - (product.sale / 100)));
    return salePrice;
}