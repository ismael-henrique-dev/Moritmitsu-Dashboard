'use server'

import { cookies } from 'next/headers'
import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { LoginFormData } from '@/validators/login'

export async function login(formData: LoginFormData) {
  try {
    const { data } = await api.post('/auth/login', formData)

    const cookieStore = await cookies()
    cookieStore.set('accessToken', data.token, {
      path: '/',
      expires: new Date(Date.now() + 60 * 60 * 1000),
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
