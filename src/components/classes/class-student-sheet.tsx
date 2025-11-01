'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { IconCirclePlus } from '@tabler/icons-react'
import { Search } from '@/components/ui/search'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

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
  {
    id: 'documents',
    label: 'Simone Freire',
  },
  {
    id: 'documents',
    label: 'Simone Freire',
  },
  {
    id: 'documents',
    label: 'Simone Freire',
  },
  {
    id: 'desktop',
    label: 'Jair Messias dos Reis',
  },
] as const

const FormSchema = z.object({
  students: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Selecione pelo menos 1 aluno para realizar a frequência.',
  }),
})

export function AddStudentsSheet() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      students: ['recents', 'home'],
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('teste')

    toast('You submitted the following values', {
      description: (
        <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          asChild
          className='lg:flex hidden bg-primary text-white hover:bg-primary/90 py-2 px-3 gap-2'
        >
          <div>
            <IconCirclePlus className='size-5' />
            <span className='font-poppins font-medium'>Enturmar alunos</span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col h-dvh max-h-dvh pb-0 gap-0'>
        <SheetHeader>
          <SheetTitle className='font-poppins font-semibold text-xl'>
            Enturmar alunos
          </SheetTitle>
          <SheetDescription className='font-poppins text-sm'>
            Você pode pesquisar e selecionar os alunos que deseja adicionar
            nesta turma.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col flex-1 min-h-0 px-4 gap-4'
          >
            <Search placeholder='Buscar alunos...' />

            <ScrollArea className='flex-1 min-h-0 rounded-md p-1'>
              <FormField
                control={form.control}
                name='students'
                render={() => (
                  <FormItem className='gap-3 flex flex-col pb-4'>
                    {students.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='students'
                        render={({ field }) => (
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
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </ScrollArea>
            <div className='bg-green-300'>
              <p>error aqui</p>
            </div>

            <SheetFooter className='py-4 px-0'>
              <div className='flex flex-row justify-end gap-3'>
                <SheetClose asChild>
                  <Button type='button' variant='outline'>
                    Cancelar
                  </Button>
                </SheetClose>
                <Button type='submit'>Adicionar à turma</Button>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
