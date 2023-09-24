import * as ToggleGroup from "@radix-ui/react-toggle-group"

export const ButtonGroup = () => (
  <ToggleGroup.Root
    type="single"
    defaultValue="center"
    aria-label="Text alignment"
  >
    <ToggleGroup.Item value="left" aria-label="Left aligned">
      <h1>a</h1>
    </ToggleGroup.Item>
    <ToggleGroup.Item value="center" aria-label="Center aligned">
      <h1>a</h1>
    </ToggleGroup.Item>
    <ToggleGroup.Item value="right" aria-label="Right aligned">
      <h1>a</h1>
    </ToggleGroup.Item>
  </ToggleGroup.Root>
)
