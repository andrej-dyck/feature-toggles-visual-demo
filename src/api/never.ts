export const never = (message: string): never => {
  throw new Error(message)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const expectNever = (_: never) => never('expected never')
