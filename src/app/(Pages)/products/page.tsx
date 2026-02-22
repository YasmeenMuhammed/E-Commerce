import React from 'react'
import { ProductI } from './../../../interfaces/product';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { getAllProducts } from '@/Services/products.services';
import AddToCartBtn from '@/components/common/addToCartBtn';


export default async function page() {
  const {data} = await getAllProducts();
  const  products: ProductI[]  = data ;
  console.log(data);
  

  return (
    <>
      <div className="container mx-auto m-4">
        <div className="grid grid-cols-12 gap-3 mx-12">
          {products.map((product) => {
            return <React.Fragment key={product._id}>
              <div className="col-span-12 md:col-span-6  lg:col-span-3">
                <Card className="relative mx-auto w-full max-w-sm pt-0">
                  <Link href={`products/${product._id}`}>
                    <Image width={1000} height={1000} src={product.imageCover} alt='products' className='w-full object-contain h-80' />

                    <CardHeader>
                      <span className='card-brand text-gray-500'>{product.brand.name}</span>
                      <CardTitle>{product.title}</CardTitle>
                      <CardDescription>
                        {product.category.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='flex justify-between'>
                      <div className='flex gap-1 items-center'>
                        {[...Array(5)].map((star, index) => {
                          const filledStar = index < Math.floor(product.ratingsAverage)
                          return (
                            <Star key={index} className={`${filledStar ? " text-yellow-400 fill-yellow-400" : " text-gray-400 fill-gray-400"}`} />
)                        }
                        )}
                        <span>({product.ratingsAverage})</span>
                      </div>

                      <div>
                        <span className='font-bold'>EGP{product.price}</span>
                      </div>
                    </CardContent>
                  </Link>

                  <CardFooter className='gap-2'>
                    <AddToCartBtn prodId={product._id}/>
                    <Heart />
                  </CardFooter>
                </Card>

              </div>
            </React.Fragment>
          })}

        </div>

      </div>
    </>
  )
}
