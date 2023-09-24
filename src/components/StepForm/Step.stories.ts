// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react"

import { StepForm } from "./StepForm"

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof StepForm> = {
  component: StepForm,
}

export default meta
type Story = StoryObj<typeof StepForm>

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
}
