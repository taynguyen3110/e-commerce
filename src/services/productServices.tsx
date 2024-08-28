// import data from '../mock/products.json'
import { storage, db } from '../firebase'
import { ref } from 'firebase/storage'
import { collection, doc, getCountFromServer, getDoc, getDocs, query, where } from "firebase/firestore";

export interface Product {
    id: number,
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
    imgSource: {
        [key: string]: string[]
    },
    category: string,
    rating: number,
    sale: number
}

export interface imgSrc {
    [key: string]: Array<string>
}

export interface Colors {
    [key: string]: string
}

// export const colorCodeBase: Colors = {
//     'black': '#000000',
//     'gray': '#808080',
//     'navy': '#000080',
//     'bison': '#7B3F00',
//     'sky+blue': '#87CEEB',
//     'white': '#FFFFFF',
//     'forest': '#228B22',
//     'terracotta': '#E2725B',
//     'washed+indigo': '#446d92',
//     'indigo': '#071f35',
//     'canvas': '#F0E68C',
//     'charcoal': '#36454F',
//     'khaki': '#F0E68C',
//     'midnight': '#191970',
//     'beach': '#FFE4C4'
// };

export async function getProductColor(product: Product) {
    const colorsMapping = await getProductsColors()
    let productColorsMapping: Colors = {}
    product.sizesColors[0].colors.forEach((c) => {
        productColorsMapping[c.color] = colorsMapping[c.color]
    })
    return productColorsMapping
}

const storageRef = ref(storage)
const collProductRef = collection(db, "products");
const collColorRef = collection(db, "colors");


export async function getProductsRange(start: number, end: number) {
    const q = query(collProductRef, where("id", ">", start), where("id", "<=", (end)));

    const querySnapshot = await getDocs(q);
    let products: Product[] = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        products.push(doc.data() as Product)
    });
    return products
}

export function getRandomProducts(count: number) {
    const products: Array<Product> = [];
    async () => {
        while (products.length < count) {
            let count = await getProductsCount()
            const randomId = (Math.floor(Math.random() * count))
            let randomProduct = await getProductById(randomId)
            if (randomProduct && !products.includes(randomProduct)) {
                products.push(randomProduct)
            }
        }
    }
    return products
}

// export function getProductImgRef(id: number) {
//     const category = data.products.find(p => p.id === id)?.category
//     // return storageRef
//     return `${storageRef}assets/product-images/${category}/${id}/`
// }

export async function getProductById(id: number) {
    const docRef = doc(collProductRef, id.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Product
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return null
    }
}

export async function getProductArr(idArr: number[]) {
    const productArr = await Promise.all(
        idArr.map(async (id) => {
            return await getProductById(id)
        })
    )
    return productArr as Product[] | null[]
}



// export function getProductSizesColors(id: number) {
//     return data.products.find(p => p.id === id)!.sizesColors;
// }

// export function getProductDetails(products: Array<Product>) {
//     return products.map((p) => {
//         const urls: imgSrc = {};
//         for (let j = 0; j < p.sizesColors[0].colors.length; j++) {
//             let colorArray = [];
//             for (let index = 0; index < 3; index++) {
//                 if (p.sizesColors[0].colors[j]) {
//                     colorArray[index] = `${getProductImgRef(p.id)}${p.imagePrefix}-${p.sizesColors[0].colors[j].color}-${index + 1}.jpg`
//                 }
//             }
//             urls[p.sizesColors[0].colors[j].color] = colorArray
//         }

//         const productDetails: ProductDetails = {
//             id: p.id,
//             name: p.name,
//             description: p.description,
//             imageSrc: urls,
//             thumbnailImg: `${IMG_PATH}${p.imagePrefix}-${p.sizesColors[0].colors[0].color}-1.jpg`,
//             rating: p.rating,
//             colors: p.sizesColors,
//             price: p.price,
//             sale: p.sale,
//             salePrice: Math.round(p.price * (100 - p.sale) / 100),
//             category: p.category
//         };

//         return productDetails
//     })
// }

export async function getProductsCount() {
    const count = await getCountFromServer(collProductRef)
    return count.data().count;
}

export async function getProductsColors() {
    const querySnapshot = await getDocs(collColorRef)
    let colorMapping: Colors = {}

    querySnapshot.forEach(c => {
        colorMapping[c.data().color] = c.data().code
    })
    return colorMapping
}