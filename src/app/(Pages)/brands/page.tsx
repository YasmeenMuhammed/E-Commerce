import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';
import { getAllBrands} from '@/Services/products.services';

interface brand{
  _id:string,
  name:string,
  image:string,
}

export default async function page() {
  const {data} = await getAllBrands();
  const  brands:brand[] = data ;
  console.log(brands);
  

  return (
    <>
      <div className="container mx-auto m-4">
        <div className="grid grid-cols-12 gap-3 mx-12">
          {brands.map((brand) => {
            return <React.Fragment key={brand._id}>
              <div className="col-span-12 md:col-span-6  lg:col-span-3">
                <Card className="relative mx-auto w-full max-w-sm pt-0">
                  <Link href={`brands/${brand._id}`}>
                    <Image width={1000} height={1000} src={brand.image} alt='products' className='w-full object-contain h-80' />
                    <CardHeader>
                      <CardTitle>{brand.name}</CardTitle>
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
