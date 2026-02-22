export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>

        {/* Logo Text */}
 <h1 className="text-2xl font-bold text-black tracking-wide animate-pulse">
  ShopMart
</h1>

      </div>
    </div>
  )
}