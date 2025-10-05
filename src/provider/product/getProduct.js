
export const getProduct = () => {
    const Product = {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'This is product 1',
        image: 'https://via.placeholder.com/150'
    }
    
    return Product
}

export const getContacts = async () => {
    const contacts = {
        id: 1,
        name: 'Contact 1',
        email: 'a@a.com',
    }
    return contacts
}