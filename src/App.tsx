import { Card, Heading, Text, Button, Stack } from "@acme-internal/ui-kit";
import { useCounterStore } from "@/hooks/useCounterStore";
import type { CounterState } from "@/types/counter";

const App = () => {
  const { count, increment, decrement, reset }: CounterState = useCounterStore();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card elevation={2} padding="xl" className="w-full max-w-md text-center">
        <Heading level={1}>Version 2 (broken)</Heading>
        <Text tone="muted">React + TypeScript + Tailwind, built with Vite.</Text>
        <Stack direction="row" gap="md" justify="center">
          <Button variant="secondary" onClick={decrement}>−</Button>
          <Text size="3xl" weight="bold">{count}</Text>
          <Button variant="primary" onClick={increment}>+</Button>
          <Button variant="ghost" onClick={reset}>Reset
        </Stack>
      </Card>
    </main>
  );
};

export default App;
