import React from 'react'
import { Params } from 'next/dist/server/request/params'
import { getSpecificBrand } from '@/Services/products.services';
import Image from 'next/image';
interface brand {
    _id: string,
    name: string,
    image: string,
}

export default async function page({ params }: { params: Promise<Params> }) {
    const { brandId } = await params
    console.log(brandId);

    const { data } = await getSpecificBrand(brandId);

    const brand: brand = data;

    console.log(brand);

    return (
        <div>
            <Image width={1000} height={1000} src={brand.image} alt='products' className='w-full object-contain h-80' />
        </div>
    )
}
