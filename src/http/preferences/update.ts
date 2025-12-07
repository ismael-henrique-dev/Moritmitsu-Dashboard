'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { FetchPreferencesResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'

type UpdatedData = {
  totalTrainings: number
}

export async function updatePreference(id: string, updatedData: UpdatedData) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    console.log(id)

    const { data: response } = await api.put<FetchPreferencesResponse>(
      `/preferences/update/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return {
      message: 'Preferência alterada com sucesso.',
      status: 'success',
      data: response.preferences,
    }
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
