import data from '../mock/products.json'
import { storage } from '../firebase'
import { ref } from 'firebase/storage'

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

interface imgSrc {
    [key: string]: Array<string>
}

export interface ProductDetails {
    id: string,
    name: string,
    description: string,
    imageSrc: imgSrc,
    thumbnailImg: string,
    price: number,
    rating: number,
    sale: number,
    salePrice: number,
    colors: Array<{
        size: string,
        colors: Array<{
            color: string,
            stock: number
        }>
    }>,
}

export interface Colors {
    [key: string]: string
}

const colorCodeBase: Colors = {
    'black': '#000000',
    'gray': '#808080',
    'navy': '#000080',
    'bison': '#7B3F00',
    'sky+blue': '#87CEEB',
    'white': '#FFFFFF',
    'forest': '#228B22',
    'terracotta': '#E2725B',
    'washed+indigo': '#446d92',
    'indigo': '#071f35',
    'canvas': '#F0E68C',
    'charcoal': '#36454F',
    'khaki': '#F0E68C',
    'midnight': '#191970',
    'beach': '#FFE4C4'
};

const storageRef = ref(storage)
const IMG_PATH = 'src/assets/images/products/';

export function getProductsRange(start: number, end: number) {
    const productRange = data.products.slice(start, end);
    return getProductDetails(productRange);
}

export function getRandomProducts(count: number) {
    const products: Array<Product> = [];
    while (products.length < count) {
        const randomProduct = data.products[(Math.floor(Math.random() * getProductsCount()))]
        if (!products.includes(randomProduct)) {
            products.push(randomProduct)
        }
    }
    return getProductDetails(products)
}

export function getProductImgRef(id: string) {
    const category = data.products.find(p=>p.id === id)?.category
    // return storageRef
    return `${storageRef}assets/product-images/${category}/${id}/`
}

export function getProductbyId(id: string) {
    let product: Product;
    for (let index = 0; index < data.products.length; index++) {
        const element = data.products[index];
        if (element.id === id) {
            product = element;
            const productDetail = getProductDetails([product])
            return productDetail[0];
        }
    }
}

export function getProductColor(product: ProductDetails) {
    const colorsArray = product?.colors[0].colors.map(c => c.color);

    let colorCodes: Colors = {};
    colorsArray?.forEach(c => {
        Object.defineProperty(colorCodes, c, { value: colorCodeBase[c], enumerable: true })
    })
    return colorCodes;
}

export function getProductSizesColors(id: string) {
    return data.products.find(p => p.id === id)!.sizesColors;
}

export function getProductDetails(products: Array<Product>) {
    return products.map((p) => {
        const urls: imgSrc = {};
        for (let j = 0; j < p.sizesColors[0].colors.length; j++) {
            let colorArray = [];
            for (let index = 0; index < 3; index++) {
                if (p.sizesColors[0].colors[j]) {
                    colorArray[index] = `${getProductImgRef(p.id)}${p.imagePrefix}-${p.sizesColors[0].colors[j].color}-${index + 1}.jpg`
                }
            }
            urls[p.sizesColors[0].colors[j].color] = colorArray
        }

        const productDetails: ProductDetails = {
            id: p.id,
            name: p.name,
            description: p.description,
            imageSrc: urls,
            thumbnailImg: `${IMG_PATH}${p.imagePrefix}-${p.sizesColors[0].colors[0].color}-1.jpg`,
            rating: p.rating,
            colors: p.sizesColors,
            price: p.price,
            sale: p.sale,
            salePrice: Math.round(p.price * (100 - p.sale) / 100)
        };

        return productDetails
    })
}

export function getProductsCount() {
    return data.products.length;
}

export function getProductColors(): Colors {
    let colorsArrays = data.products.map(product =>
        product.sizesColors[0].colors.flatMap(color =>
            color.color
        )
    );

    let colors = [...new Set(colorsArrays.flatMap(i => i))]
    let colorCodes: Colors = {};
    colors.forEach(c => {
        Object.defineProperty(colorCodes, c, { value: colorCodeBase[c], enumerable: true })
    })
    return colorCodes
}