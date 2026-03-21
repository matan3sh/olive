'use client'

import { Drawer as AntDrawer } from 'antd'
import type { DrawerProps } from 'antd'
import { CloseSmIcon } from '@/components/ui/icons'
import { DrawerBody, DrawerCloseBtn, DrawerContent, DrawerHeader, DrawerTitle } from './Drawer.styles'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  width?: number | string
  placement?: DrawerProps['placement']
  children: React.ReactNode
}

export default function Drawer({ open, onClose, title, width = 420, placement = 'right', children }: Props) {
  return (
    <AntDrawer
      open={open}
      onClose={onClose}
      placement={placement}
      width={width}
      closable={false}
      styles={{
        body: { padding: 0, display: 'flex', flexDirection: 'column', height: '100%' },
        mask: { background: 'rgba(17, 38, 12, 0.25)' },
      }}
    >
      <DrawerBody>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerCloseBtn onClick={onClose} aria-label="Close">
            <CloseSmIcon />
          </DrawerCloseBtn>
        </DrawerHeader>
        <DrawerContent>{children}</DrawerContent>
      </DrawerBody>
    </AntDrawer>
  )
}
