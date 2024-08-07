import data from '../mock/products.json'

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

export interface ProductDetails {
    id: string,
    name: string,
    description: string,
    imageSrc: string[],
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

export function getProductbyId(id: string) {
    let product: Product;
    for (let index = 0; index < data.products.length; index++) {
        const element = data.products[index];
        if (element.id === id) {
            product = element;
            const productDetail = getProductDetails([product])
            return productDetail[0]
        }
    }
}

export function getProductColor(product: ProductDetails) {
    const colorsArray = product?.colors[0].colors.map(c => c.color)

    let colorCodes: Colors = {};
    colorsArray?.forEach(c => {
        Object.defineProperty(colorCodes, c, { value: colorCodeBase[c], enumerable: true })
    })
    return colorCodes
}

export function getSizeByColor(id: string, color: string) {

}
export function getColorBySize(id: string, size: string) {

}

export function getProductDetails(products: Array<Product>) {
    return products.map((p) => {
        const productDetails: ProductDetails = {
            id: '',
            name: '',
            description: '',
            imageSrc: [],
            price: 0,
            rating: 0,
            sale: 0,
            salePrice: 0,
            colors: []
        };

        productDetails.id = p.id;
        productDetails.name = p.name;
        productDetails.description = p.description;

        const urls = [];
        for (let index = 0; index < 3; index++) {
            urls.push(`${IMG_PATH}${p.imagePrefix}-${p.sizesColors[0].colors[0].color}-${index + 1}.jpg`)
        }

        productDetails.imageSrc = urls;
        productDetails.rating = p.rating;
        productDetails.colors = p.sizesColors;
        productDetails.price = p.price;
        productDetails.sale = p.sale;
        productDetails.salePrice = Math.round(p.price * (100 - p.sale) / 100);

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