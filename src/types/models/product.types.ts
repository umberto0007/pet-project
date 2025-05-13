export interface ServerResponse<T> {
    products: T[];
    total: number;
    skip: number;
    limit: number;
}



export interface IProduct {
    id?: number
    title?: string
    description?: string
    category?: string
    price?: number
    discountPercentage?: number
    rating?: number
    stock?: number
    tags?: string[]
    brand?: string
    sku?: string
    weight?: number
    dimensions?: Dimensions
    warrantyInformation?: string
    shippingInformation?: string
    availabilityStatus?: string
    reviews?: Review[]
    returnPolicy?: string
    minimumOrderQuantity?: number
    meta?: Meta
    thumbnail?: string
    images?: string[]
    quantity?: number
}



export interface StateProduct {
    cart: IProduct[];
}


export interface ChildProps {
    products?: IProduct[]
    filteredProducts?: IProduct[]
    product?: IProduct
    categories?: ICategories[]
    isLoading?: boolean
    amount?: number
    addToCart?: () => void
}


export interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

export interface ICategories {
    slug: string
    name: string
    url: string
}

export interface ICatalogMenu {
    id: number
    slug: string
    name: string
    icon: string
}

