// import data from '../mock/products.json'
import { storage, db } from "../firebase";
import { ref } from "firebase/storage";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  sizesColors: Array<{
    size: string;
    colors: Array<{
      color: string;
      stock: number;
    }>;
  }>;
  imagePrefix: string;
  imgSource: {
    [key: string]: string[];
  };
  category: string;
  rating: number;
  sale: number;
}

export interface imgSrc {
  [key: string]: Array<string>;
}

export interface Colors {
  [key: string]: string;
}

export async function getProductColor(product: Product) {
  const colorsMapping = await getProductsColors();
  let productColorsMapping: Colors = {};
  product.sizesColors[0].colors.forEach((c) => {
    productColorsMapping[c.color] = colorsMapping[c.color];
  });
  return productColorsMapping;
}

const storageRef = ref(storage);
const collProductRef = collection(db, "products");
const collColorRef = collection(db, "colors");

export async function getProductsRange(start: number, end: number) {
  const q = query(
    collProductRef,
    where("id", ">", start),
    where("id", "<=", end)
  );

  const querySnapshot = await getDocs(q);
  let products: Product[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    products.push(doc.data() as Product);
  });
  return products;
}

export async function getRandomProducts(count: number) {
  const products: Array<Product> = [];
  let totalCount = await getProductsCount();
  while (products.length < count) {
    const randomId = Math.floor(Math.random() * totalCount);
    let randomProduct = await getProductById(randomId);
    if (randomProduct && !products.includes(randomProduct)) {
      products.push(randomProduct);
    }
  }
  return products;
}

export async function getProductById(id: number) {
  const docRef = doc(collProductRef, id.toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Product;
  } else {
    // docSnap.data() will be undefined in this case
    return null;
  }
}

export async function getProductArr(idArr: number[]) {
  const productArr = await Promise.all(
    idArr.map(async (id) => {
      return await getProductById(id);
    })
  );
  return productArr as Product[] | null[];
}

export async function getAllProductNames() {
  const docSnap = await getDocs(collProductRef);
  return docSnap.docs.map((i) => {
    return { id: Number(i.id), name: i.data().name };
  });
}

export async function getProductsCount() {
  const count = await getCountFromServer(collProductRef);
  return count.data().count;
}

export async function getProductsColors() {
  const querySnapshot = await getDocs(collColorRef);
  let colorMapping: Colors = {};

  querySnapshot.forEach((c) => {
    colorMapping[c.data().color] = c.data().code;
  });
  return colorMapping;
}
