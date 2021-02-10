export type ExampleComponentType<P = object> = React.FC<P> & {
  title: string
  tintColor?: string
  backgroundColor?: string
  statusBarStyle?: 'light-content' | 'dark-content'
  appbarElevation?: number
}
