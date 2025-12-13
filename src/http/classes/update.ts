'use server'

import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/lib/utils'
import { CreateClassFormData } from '@/validators/create-class'
import { CreateClassResponse } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function updateClass(id: string, formData: CreateClassFormData) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const schedule = formData.schedules

    const updatedClass = {
      name: formData.name,
      min_age: formData.minAge,
      max_age: formData.maxAge,
      schedule,
    }

    console.log(updatedClass)

    await api.patch<CreateClassResponse>(
      `/classes/update/${id}`,
      updatedClass,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    revalidatePath('/dashboard/classes')

    return { message: 'Turma editada com sucesso.', status: 'success' }
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
