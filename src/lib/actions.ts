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

export async function getUserData() {
  try {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('userData')?.value

    if (!userCookie) {
      return {
        data: null,
        message: 'Nenhum dado de usuário encontrado.',
        status: 'error',
      }
    }

    const userData: User = JSON.parse(userCookie)

    return {
      data: userData,
      message: 'Dados recuperados com sucesso.',
      status: 'success',
    }
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error)

    return {
      data: null,
      message: 'Ocorreu um erro ao tentar obter os dados do usuário.',
      status: 'error',
    }
  }
}
