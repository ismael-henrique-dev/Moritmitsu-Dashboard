import { Progress } from '@/components/ui/progress'

export function BeltProgress({
  belt,
  degree,
  currentClasses,
  requiredClasses,
}: {
  belt: string
  degree: number
  currentClasses: number
  requiredClasses: number
}) {
  const progress = Math.min((currentClasses / requiredClasses) * 100, 100)

  return (
    <div className='flex flex-col gap-2 w-full mt-4'>
      <div className='flex justify-between items-center'>
        <span className='font-medium font-poppins'>
          {belt} - Grau {degree}
        </span>
        <span className='text-sm text-neutral-500 font-poppins'>
          {currentClasses}/{requiredClasses} treinos
        </span>
      </div>
      <Progress value={progress} className='h-3' />
    </div>
  )
}
