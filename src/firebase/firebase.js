import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, addDoc, query, where, getDoc, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productosDB = collection(db, 'products');
const orderDB = collection(db, 'orders');

export const getProducts = async (category) => {
    const q = category ? query(
        productosDB,
        where('categoria', '==', category)
    ) : false;

    return await getDocs(category ? q : productosDB).then((snapshot) => {
        return snapshot.docs.map(doc => { return { ...doc.data(), id: parseInt(doc.id) } });
    });
}

export const getProduct = async (id) => {
    return (await getDoc(doc(db, 'products', id)).then((snapshot) => {
        if(snapshot.exists())
            return { id: snapshot.id, ...snapshot.data() }
    }));
}

export const saveOrder = async (buyer, productos, subtotal) => {
    return (await addDoc(orderDB, {
        buyer: buyer,
        items: productos,
        date: new Date(),
        total: subtotal,
        estado: 'Generada'
    }));
}

export const updateStock = async (products) => {
    products.forEach((element) => {
        const productoDB = doc(db, 'products', element.id);
        getDoc(productoDB).then((snapshot) => {
            if(snapshot.exists()){
                const original = snapshot.data().stock;
                const compra = element.q;
                const updated = original - compra;
                updateDoc(productoDB, {stock: updated});
            }
        });
    });
    return true;
}

export const getOrder = async (id) => {
    return (await getDoc(doc(db, 'orders', id)).then((snapshot) => {
        if(snapshot.exists())
            return { id: snapshot.id, ...snapshot.data() }
    }));
}