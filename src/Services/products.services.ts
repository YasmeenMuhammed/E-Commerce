const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function getAllProducts(){
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    console.log(data);
    return data
    
}
export async function getSpecificProduct(id:unknown){
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    console.log(data);
    return data
    
}

export async function getAllBrands(){
    const response = await fetch(`${API_URL}/brands`);
    const data = await response.json();
    console.log(data);
    return data
}
export async function getSpecificBrand(id:unknown){
    const response = await fetch(`${API_URL}/brands/${id}`);
    const data = await response.json();
    console.log(data);
    return data
}

export async function getAllCategories(){
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    console.log(data);
    return data
}
export async function getSpecificCateogry(id:unknown){
    const response = await fetch(`${API_URL}/categories/${id}`);
    const data = await response.json();
    console.log(data);
    return data
}
