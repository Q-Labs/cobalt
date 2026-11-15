import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import Select from './Select'

const currencies = [
  { value: 'USD', label: 'USD · US dollar' },
  { value: 'EUR', label: 'EUR · Euro' },
  { value: 'GBP', label: 'GBP · British pound' },
]

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { 'aria-label': 'Currency', options: currencies },
}
export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {}
export const WithPlaceholder: Story = { args: { placeholder: 'Choose a currency', defaultValue: '' } }
export const Invalid: Story = { args: { placeholder: 'Choose a currency', defaultValue: '', invalid: true } }
export const Disabled: Story = { args: { disabled: true } }

export const Picking: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const select = canvas.getByRole('combobox')
    await userEvent.selectOptions(select, 'EUR')
    await expect(select).toHaveValue('EUR')
  },
}
