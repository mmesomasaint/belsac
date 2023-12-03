'use client'

import { Button, Text } from "./components/elements";

export default function Home() {
  return (<div>
    <Text size='xl'>Belsac</Text>
    <Text size='lg'>Belsac</Text>
    <Text size='md'>Belsac</Text>
    <Text size='sm'>Belsac</Text>
    <Text size='xs'>Belsac</Text>
    <Button onClick={() => {console.log('clicked')}}>
      <Text size='sm' white>Click me</Text>
    </Button>
  </div>)
}