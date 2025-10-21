'use server'

import { cookies } from 'next/headers'
import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { LoginFormData } from '@/validators/login'
import { LoginResponse } from '@/lib/definitions'

export async function login(formData: LoginFormData) {
  try {
    const { data: response } = await api.post<LoginResponse>(
      '/auth/login',
      formData
    )

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    const cookieStore = await cookies()

    cookieStore.set('accessToken', response.token, {
      path: '/',
      expires: expiresAt,
    })

    cookieStore.set('userData', JSON.stringify(response.data), {
      path: '/',
      expires: expiresAt,
    })

    return { message: 'Login realizado com sucesso.', status: 'success' }
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)
    console.log(error)

    switch (statusCode) {
      case 401:
        return { message: 'Email ou senha incorretos.', status: 'error' }
      case 500:
        return { message: 'Erro interno no servidor.', status: 'error' }
      default:
        return { message: 'Erro desconhecido.', status: 'error' }
    }
  }
}
