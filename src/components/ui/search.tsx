'use client'

import { SearchIcon } from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export function Search({
  placeholder,
  paramName = 'query',
}: {
  placeholder: string
  paramName?: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`)

    const params = new URLSearchParams(searchParams)

    // params.set('page', '1')
    if (term) {
      params.set(paramName, term)
    } else {
      params.delete(paramName)
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className='relative flex flex-shrink-0'>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-0 placeholder:text-gray-500'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get(paramName)?.toString()}
      />
      <SearchIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  )
}
