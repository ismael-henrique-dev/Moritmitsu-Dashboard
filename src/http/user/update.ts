'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { cookies } from 'next/headers'

type UpdatedData = {
  username: string
  email: string
}

export async function updateUserData(id: string, updatedData: UpdatedData) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    console.log('id ' + id)

    const { data: response } = await api.patch(
      `/users/update/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const updatedUser: User = {
      id: id,
      email: updatedData.email,
      username: updatedData.username,
      role: 'admin',
    }

    cookieStore.set('userData', JSON.stringify(updatedUser), {
      path: '/',
    })

    return {
      message: 'Dados alterados.',
      status: 'success',
      data: response.preferences,
    }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)
    console.log(error)

    switch (statusCode) {
      case 401:
        return { message: 'Email ou senha nome invalidos.', status: 'error' }
      case 500:
        return { message: 'Erro interno no servidor.', status: 'error' }
      default:
        return { message: 'Erro desconhecido.', status: 'error' }
    }
  }
}
