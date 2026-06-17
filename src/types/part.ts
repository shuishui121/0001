export interface PartDimensions {
  length?: number
  width?: number
  height?: number
  diameter?: number
  weight?: number
  unit: string
}

export interface Assembly {
  mechanismName: string
  mechanismImage: string
  position: {
    x: number
    y: number
  }
  description: string
}

export interface Part {
  id: string
  name: string
  code: string
  description: string
  function: string
  material: string
  location: string
  dimensions: PartDimensions
  sketchImage: string
  thumbnail: string
  assemblies: Assembly[]
  era?: string
  condition?: string
}

export interface Category {
  id: string
  name: string
  count: number
}

export interface Categories {
  function: Category[]
  material: Category[]
  location: Category[]
}

export type DimensionType = 'function' | 'material' | 'location'

export const DIMENSION_LABELS: Record<DimensionType, string> = {
  function: '功用',
  material: '材质',
  location: '出土地点'
}
