export type Query<TData> = {
  status: 'idle' | 'loading' | 'success' | 'error',
  data: TData | undefined
}
