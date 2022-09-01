// load data from api
const loadData = async() => {
    const url = await `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
};