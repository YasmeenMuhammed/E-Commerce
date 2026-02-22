"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ProductI } from './../../../../interfaces/product'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import AddToCartBtn from '@/components/common/addToCartBtn'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

export default function ProductDetails() {
  const params = useParams()
  const productId = params?.id

  const [product, setProduct] = useState<ProductI | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductI[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      try {

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
        const data = await res.json()
        setProduct(data.data)

        const relatedRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${data.data.category._id}`)
        const related = await relatedRes.json()
        setRelatedProducts(related.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [productId])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
        <h1 className="text-2xl font-bold text-black">ShopMart</h1>
      </div>
    </div>
  )

  if (!product) return <div>Product not found</div>

  return (
    <div className="px-4 md:px-10 py-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Card */}
      <Card className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1">
          <Image src={product.imageCover} width={1000} height={1000} alt={product.title} className="w-full object-contain h-80 rounded-xl" />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <CardHeader>
            <span className="text-gray-500">{product.brand.name}</span>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.category.name}</CardDescription>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-between">
            <div className="flex gap-1 items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${i < Math.floor(product.ratingsAverage) ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-gray-400"}`} />
              ))}
              <span>({product.ratingsAverage})</span>
            </div>
            <div>
              <span className="font-bold">EGP{product.price}</span>
            </div>
          </CardContent>

          <CardFooter className="gap-2">
            <AddToCartBtn prodId={product._id} />
            <Heart />
          </CardFooter>
        </div>
      </Card>

      {/* Related Products */}
      <h3 className="text-xl font-bold mt-10 mb-4">You may also like</h3>
      <div className="grid grid-cols-12 gap-3">
        {relatedProducts.map(prod => (
          <div key={prod._id} className="col-span-12 md:col-span-6 lg:col-span-3">
            <Card>
              <Link href={`/products/${prod._id}`}>
                <Image src={prod.imageCover} width={1000} height={1000} alt={prod.title} className="w-full object-contain h-80" />
                <CardHeader>
                  <span className="text-gray-500">{prod.brand.name}</span>
                  <CardTitle>{prod.title}</CardTitle>
                  <CardDescription>{prod.category.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`${i < Math.floor(prod.ratingsAverage) ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-gray-400"}`} />
                    ))}
                    <span>({prod.ratingsAverage})</span>
                  </div>
                  <div>
                    <span className="font-bold">EGP{prod.price}</span>
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="gap-2">
                <AddToCartBtn prodId={prod._id} />
                <Heart />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}