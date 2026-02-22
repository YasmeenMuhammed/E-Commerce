import React from 'react'
import { Params } from 'next/dist/server/request/params'
import { getSpecificCateogry } from '@/Services/products.services';
import Image from 'next/image';
import { Category } from '@/interfaces/category';

export default async function page({ params }: { params: Promise<Params> }) {
    const { categoryId } = await params
    console.log(categoryId);

    const { data } = await getSpecificCateogry(categoryId);

    const category: Category = data;

    console.log(category);

    return (
        <div>
            <Image width={1000} height={1000} src={category.image} alt='products' className='w-full object-contain h-80' />
        </div>
    )
}
