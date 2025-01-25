type FunctionMap = Map<(...args: any[]) => any, (...args: any[]) => any>;
const container: FunctionMap = new Map();

export function provide<T extends (...args: any[]) => any>(fn: T, use: T): void {
  container.set(fn, use);
}

export function inject<T extends (...args: any[]) => any>(fn: T): T {
  return (container.get(fn) || fn) as T;
}

