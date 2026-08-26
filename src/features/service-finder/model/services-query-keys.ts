export const serviceKeys = {
  all: ["services"] as const,
  list: () => [...serviceKeys.all, "list"] as const,
  detail: (id: string) => [...serviceKeys.all, "detail", id] as const,
};

export function escapeLikePattern(input: string): string {
  return input.replace(/[%_]/g, (match) => `\\${match}`);
}