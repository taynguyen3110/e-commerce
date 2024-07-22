import products from '../mock/products.json'

interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    sizesColors: Array<{
        size: string,
        colors: Array<{
            color: string,
            stock: number
        }>
    }>,
    imagePrefix: string,
    category: string,
    rating: number,
    sale: number
}

interface ProductDetails {
    id: string,
    name: string,
    imageSrc: string,
    productImg: string,
    price: number,
    rating: number,
    sale: number,
    salePrice: number,
    colors: string,
}

export function getProductsRange(start: number, end: number) {
    const productRange = products.products.slice(start, end);
    return getProductDetails(productRange);
}

const IMG_PATH = 'src/assets/images/products/';

export function getProductDetails(products: Array<Product>) {
    const productsDetails: Array<ProductDetails> = [];
    products.map((p) => {
        const productDetails: ProductDetails = {
            id: '',
            name: '',
            imageSrc: '',
            productImg: '',
            price: 0,
            rating: 0,
            sale: 0,
            salePrice: 0,
            colors: ''
        };

        productDetails.id = p.id;
        productDetails.name = p.name;
        productDetails.imageSrc = `${IMG_PATH}${p.imagePrefix}-${p.sizesColors[0].colors[0].color}`;
        productDetails.productImg = `${IMG_PATH}${p.imagePrefix}-${p.sizesColors[0].colors[0].color}-1.jpg`;
        productDetails.rating = p.rating;
        productDetails.colors = p.sizesColors[0].colors[0].color;
        productDetails.price = p.price;
        productDetails.sale = p.sale;
        productDetails.salePrice = Math.round(p.price * (100 - p.sale) / 100);

        productsDetails.push(productDetails);
    })
    return productsDetails;
}

export function getProductsCount() {
    return products.products.length;
}