import { Product } from "../services/productServices";

export function getFirstImage(product: Product) {
    let imgSrc = product.imgSource[Object.keys(product.imgSource)[0]][0];
    return imgSrc;
}