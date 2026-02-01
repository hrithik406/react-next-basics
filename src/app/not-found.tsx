import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col my-4 gap-y-2 text-center justify-center'>
      <h2 className='text-5xl font-bold text-blue-500'>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/dashboard/profile">Return Home</Link>
    </div>
  )
}