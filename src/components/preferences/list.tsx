import { PreferenceCard } from './card'

type PreferencesListProps = {
  data: {
    id: string
    ageRange: string
    belt: string
    necessaryTraining: number
  }[]
}

export function PreferencesList({ data }: PreferencesListProps) {
  return (
    <div className='lg:hidden grid'>
      {data.map((preference) => (
        <PreferenceCard
          key={preference.id}
          id={preference.id}
          ageRange={preference.ageRange}
          belt={preference.belt}
          necessaryTraining={preference.necessaryTraining}
        />
      ))}
    </div>
  )
}
