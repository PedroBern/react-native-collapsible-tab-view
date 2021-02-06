export type Prop = {
  defaultValue: null | { value: string }
  description: string
  name: string
  required: boolean
  type: { name: string }
  parent?: any
}

export type Props = Record<string, Prop>

export type API = {
  description?: string
  displayName: string
  props: Props
}

export type OverrideProp = Record<string, Partial<Prop>>

export type OverrideProps = Record<string, OverrideProp>
