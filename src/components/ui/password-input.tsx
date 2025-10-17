'use client'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { IconEye, IconEyeClosed } from '@tabler/icons-react'
import { ComponentProps, useState } from 'react'

type PasswordInputProps = ComponentProps<'input'>

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <InputGroup>
      <InputGroupInput type={showPassword ? 'text' : 'password'} {...props} />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton
          className='cursor-pointer'
          onClick={handleShowPassword}
          variant='ghost'
          size='icon-xs'
        >
          {showPassword ? <IconEyeClosed size={24} /> : <IconEye size={24} />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
