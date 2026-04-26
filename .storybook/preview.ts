import type { Preview } from '@storybook/react'
import '../src/tokens/index.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#040508' },
        { name: 'light', value: '#F7F8FA' },
      ],
    },
    docs: {
      theme: undefined,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Cobalt color theme',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: ['dark', 'light'],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals['theme'] as string ?? 'dark'
      document.documentElement.setAttribute('data-theme', theme)
      return Story()
    },
  ],
}

export default preview
