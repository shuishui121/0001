import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Part, Assembly } from '@/types/part'
import {
  translatePartId,
  translateMechanismName,
  translateAssemblyDescription
} from '@/i18n/parts-translations'
import type { LocaleType } from '@/i18n'

export function useI18nPart() {
  const { locale, t } = useI18n()

  function getTranslatedPart(part: Part) {
    const currentLocale = locale.value as LocaleType
    const translated = translatePartId(
      part.id,
      {
        name: part.name,
        description: part.description,
        function: part.function,
        material: part.material,
        location: part.location,
        era: part.era,
        condition: part.condition
      },
      currentLocale
    )

    return {
      ...part,
      name: translated.name,
      description: translated.description,
      function: t(`functions.${part.function}`) as string,
      material: t(`materials.${part.material}`) as string,
      location: t(`locations.${part.location}`) as string,
      era: part.era ? (t(`eras.${part.era}`) as string) : undefined,
      condition: part.condition ? (t(`conditions.${part.condition}`) as string) : undefined,
      assemblies: part.assemblies.map(asm => getTranslatedAssembly(asm))
    }
  }

  function getTranslatedAssembly(assembly: Assembly): Assembly {
    const currentLocale = locale.value as LocaleType
    return {
      ...assembly,
      mechanismName: translateMechanismName(assembly.mechanismName, currentLocale),
      description: translateAssemblyDescription(assembly.description, currentLocale)
    }
  }

  return {
    getTranslatedPart,
    getTranslatedAssembly
  }
}
