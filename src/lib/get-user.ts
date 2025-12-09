import { cookies } from 'next/headers'

export async function getUserRole(): Promise<Role> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('userData')?.value

  if (!cookie) {
    return 'instructor'
  }

  try {
    const data = JSON.parse(cookie)

    // garantir que é uma role válida
    if (data.role === 'admin' || data.role === 'instructor') {
      return data.role
    }

    return 'instructor'
  } catch {
    return 'instructor'
  }
}
