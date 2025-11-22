'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useRouter } from 'next/navigation'

const students = [
  {
    id: 'recents',
    label: 'Ismael Henrique Gonçalves',
  },
  {
    id: 'home',
    label: 'Marcos Silva',
  },
  {
    id: 'applications',
    label: 'Renata Moura dos Santos',
  },
  {
    id: 'desktop',
    label: 'Jair Messias dos Reis',
  },
  {
    id: 'downloads',
    label: 'Arlinda Macedo',
  },
  {
    id: 'documents',
    label: 'Simone Freire',
  },
] as const

const FormSchema = z.object({
  students: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos 1 aluno para realizar a frequência.',
  }),
})

export function CreateAttendanceForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      students: ['recents', 'home'],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast('You submitted the following values', {
      description: (
        <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            control={form.control}
            name='students'
            render={() => (
              <FormItem>
                <div className='mb-4'>
                  <FormLabel className='text-base'>Alunos</FormLabel>
                  <FormDescription>
                    Selecione os alunos que deseja marcar presença
                  </FormDescription>
                </div>
                {students.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name='students'
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className='hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950'
                        >
                          <FormControl>
                            <Checkbox
                              className='size-5 cursor-pointer data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700'
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className='text-sm font-semibold w-full cursor-pointer py-3'>
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className='w-full flex items-center justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type='submit'>Concluir</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
