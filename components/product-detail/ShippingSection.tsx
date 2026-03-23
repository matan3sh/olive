import type { ShippingSettings } from '@/lib/cms'
import {
  ShippingWrapper,
  ShippingHeading,
  ShippingTable,
  ShippingTh,
  ShippingTd,
  ShippingNotes,
  FreeThresholdNote,
} from './ShippingSection.styles'

interface Props {
  settings: ShippingSettings
  labels: {
    heading: string
    zone: string
    price: string
    delivery: string
    freeAbove: string
  }
}

export default function ShippingSection({ settings, labels }: Props) {
  return (
    <ShippingWrapper>
      <ShippingHeading>{labels.heading}</ShippingHeading>
      <ShippingTable>
        <thead>
          <tr>
            <ShippingTh>{labels.zone}</ShippingTh>
            <ShippingTh>{labels.price}</ShippingTh>
            <ShippingTh>{labels.delivery}</ShippingTh>
          </tr>
        </thead>
        <tbody>
          {settings.zones.map((zone) => (
            <tr key={zone.label}>
              <ShippingTd>{zone.label}</ShippingTd>
              <ShippingTd>
                {zone.price}
                {zone.freeThreshold && (
                  <FreeThresholdNote>{zone.freeThreshold}</FreeThresholdNote>
                )}
              </ShippingTd>
              <ShippingTd>{zone.estimatedDays}</ShippingTd>
            </tr>
          ))}
        </tbody>
      </ShippingTable>
      {settings.notes && <ShippingNotes>{settings.notes}</ShippingNotes>}
    </ShippingWrapper>
  )
}
