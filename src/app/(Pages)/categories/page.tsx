import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';
import { getAllCategories} from '@/Services/products.services';
import { Category } from './../../../interfaces/category';


export default async function page() {
  const {data} = await getAllCategories();
  const  category:Category[] = data ;
  console.log(category);
  

  return (
    <>
      <div className="container mx-auto m-4">
        <div className="grid grid-cols-12 gap-3 mx-12">
          {category.map((category) => {
            return <React.Fragment key={category._id}>
              <div className="col-span-12 md:col-span-6  lg:col-span-3">
                <Card className="relative mx-auto w-full max-w-sm pt-0">
                  <Link href={`categories/${category._id}`}>
                    <Image width={1000} height={1000} src={category.image} alt='products' className='w-full object-contain h-80' />
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                    </CardHeader>
                  </Link>
                  </Card>

              </div>
            </React.Fragment>
          })}

        </div>

      </div>
    </>
  )
}
