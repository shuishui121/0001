import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Part, Category, DimensionType } from '@/types/part'
import { DIMENSION_LABELS } from '@/types/part'

export const usePartsStore = defineStore('parts', () => {
  const parts = ref<Part[]>([])
  const currentDimension = ref<DimensionType>('function')
  const selectedCategory = ref<string | null>(null)
  const searchQuery = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const categories = computed<Record<DimensionType, Category[]>>(() => {
    const result: Record<DimensionType, Category[]> = {
      function: [],
      material: [],
      location: []
    }

    const functionMap = new Map<string, number>()
    const materialMap = new Map<string, number>()
    const locationMap = new Map<string, number>()

    parts.value.forEach(part => {
      functionMap.set(part.function, (functionMap.get(part.function) || 0) + 1)
      materialMap.set(part.material, (materialMap.get(part.material) || 0) + 1)
      locationMap.set(part.location, (locationMap.get(part.location) || 0) + 1)
    })

    result.function = Array.from(functionMap.entries()).map(([name, count]) => ({
      id: name,
      name,
      count
    })).sort((a, b) => b.count - a.count)

    result.material = Array.from(materialMap.entries()).map(([name, count]) => ({
      id: name,
      name,
      count
    })).sort((a, b) => b.count - a.count)

    result.location = Array.from(locationMap.entries()).map(([name, count]) => ({
      id: name,
      name,
      count
    })).sort((a, b) => b.count - a.count)

    return result
  })

  const currentCategoryList = computed<Category[]>(() => {
    return categories.value[currentDimension.value]
  })

  const filteredParts = computed<Part[]>(() => {
    let result = [...parts.value]

    if (selectedCategory.value) {
      const dim = currentDimension.value
      result = result.filter(part => part[dim] === selectedCategory.value)
    }

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter(part =>
        part.name.toLowerCase().includes(query) ||
        part.code.toLowerCase().includes(query) ||
        part.description.toLowerCase().includes(query)
      )
    }

    return result
  })

  const totalCount = computed(() => parts.value.length)

  function setDimension(dimension: DimensionType) {
    currentDimension.value = dimension
    selectedCategory.value = null
  }

  function selectCategory(categoryId: string | null) {
    selectedCategory.value = categoryId
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function getPartById(id: string): Part | undefined {
    return parts.value.find(p => p.id === id)
  }

  async function loadParts() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('/data/parts.json')
      if (!response.ok) {
        throw new Error('加载零件数据失败')
      }
      const data = await response.json()
      parts.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : '未知错误'
      console.error('加载零件数据失败:', e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    parts,
    currentDimension,
    selectedCategory,
    searchQuery,
    isLoading,
    error,
    categories,
    currentCategoryList,
    filteredParts,
    totalCount,
    setDimension,
    selectCategory,
    setSearchQuery,
    getPartById,
    loadParts,
    DIMENSION_LABELS
  }
})
