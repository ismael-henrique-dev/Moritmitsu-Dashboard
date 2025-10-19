'use server'

import { cookies } from 'next/headers'

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')

    return {
      message: 'Você foi deslogado com sucesso.',
      status: 'success',
    }
  } catch (error) {
    console.error('Erro ao deslogar:', error)

    return {
      message: 'Ocorreu um erro ao tentar deslogar. Tente novamente.',
      status: 'error',
    }
  }
}
  