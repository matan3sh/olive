'use client'

import type { AboutStat } from '@/lib/cms'
import { AboutDataCell, AboutDataGrid, AboutDataLabel, AboutDataNum } from './StatsGrid.styles'

interface Props {
  stats: AboutStat[]
}

export default function StatsGrid({ stats }: Props) {
  return (
    <AboutDataGrid>
      {stats.map(({ id, num, label, dark }) => (
        <AboutDataCell key={id} $dark={dark} className="about-data-cell">
          <AboutDataNum $dark={dark}>{num}</AboutDataNum>
          <AboutDataLabel $dark={dark}>{label}</AboutDataLabel>
        </AboutDataCell>
      ))}
    </AboutDataGrid>
  )
}
