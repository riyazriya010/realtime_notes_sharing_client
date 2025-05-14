// app/pages/home/page.tsx (Server Component)
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import LandingPage from '@/app/page'
import { JWT_SECRET } from '@/utils/constants'

export default async function HomePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value
  console.log('token ',token)
  let id: string | null = null

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET!) as { id: string }
      id = decoded.id
    } catch (err) {
      console.error('JWT error', err)
    }
  }

  return <LandingPage id={id} />
}
