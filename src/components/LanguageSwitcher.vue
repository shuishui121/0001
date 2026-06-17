<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown, Globe } from 'lucide-vue-next'
import { LOCALE_OPTIONS, setLocale, type LocaleType } from '@/i18n'

const { locale, t } = useI18n()
const isOpen = ref(false)
const isTransitioning = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const currentOption = computed(() => {
  return LOCALE_OPTIONS.find(opt => opt.value === locale.value) || LOCALE_OPTIONS[0]
})

function selectLanguage(value: LocaleType) {
  if (value === locale.value) {
    isOpen.value = false
    return
  }
  isTransitioning.value = true
  setLocale(value)
  setTimeout(() => {
    isTransitioning.value = false
    isOpen.value = false
  }, 300)
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
  if (isOpen.value && event.key === 'Enter') {
    const target = event.target as HTMLElement
    if (target.dataset.value) {
      selectLanguage(target.dataset.value as LocaleType)
    }
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <div
    ref="dropdownRef"
    class="language-switcher"
    :class="{ transitioning: isTransitioning }"
  >
    <button
      class="lang-trigger"
      type="button"
      :aria-label="t('language.switch')"
      :aria-expanded="isOpen"
      :aria-haspopup="'listbox'"
      @click="toggleDropdown"
    >
      <Globe :size="18" class="lang-icon" aria-hidden="true" />
      <span class="lang-current">
        <span class="lang-flag">{{ currentOption.flag }}</span>
        <span class="lang-label">{{ currentOption.label }}</span>
      </span>
      <ChevronDown
        :size="16"
        class="chevron"
        :class="{ rotated: isOpen }"
        aria-hidden="true"
      />
    </button>

    <transition name="dropdown">
      <ul
        v-if="isOpen"
        class="lang-dropdown"
        role="listbox"
        :aria-label="t('language.current')"
        tabindex="-1"
      >
        <li
          v-for="option in LOCALE_OPTIONS"
          :key="option.value"
          class="lang-option"
          role="option"
          :aria-selected="option.value === locale"
          :data-value="option.value"
          tabindex="0"
          @click="selectLanguage(option.value)"
          @keydown.enter="selectLanguage(option.value)"
        >
          <span class="option-flag">{{ option.flag }}</span>
          <span class="option-label">{{ option.label }}</span>
          <span v-if="option.value === locale" class="option-check">✓</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.language-switcher {
  position: relative;
  flex-shrink: 0;
}

.lang-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(245, 240, 232, 0.1);
  border: 1.5px solid rgba(196, 163, 90, 0.5);
  border-radius: 20px;
  color: #F5F0E8;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'Microsoft YaHei', sans-serif;
}

.lang-trigger:hover,
.lang-trigger:focus-visible {
  background: rgba(245, 240, 232, 0.18);
  border-color: #C4A35A;
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.25);
  outline: none;
}

.lang-icon {
  color: #DBC47D;
  flex-shrink: 0;
}

.lang-current {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lang-flag {
  font-size: 16px;
  line-height: 1;
}

.lang-label {
  white-space: nowrap;
}

.chevron {
  transition: transform 0.25s ease;
  color: #DBC47D;
  flex-shrink: 0;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: #F9F5ED;
  border: 2px solid #C4A35A;
  border-radius: 12px;
  padding: 6px;
  list-style: none;
  margin: 0;
  box-shadow: 0 8px 24px rgba(62, 42, 32, 0.2);
  z-index: 1000;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  color: #3E2A20;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Microsoft YaHei', sans-serif;
  transition: all 0.2s ease;
}

.lang-option:hover,
.lang-option:focus-visible {
  background: rgba(196, 163, 90, 0.2);
  outline: none;
}

.lang-option:focus-visible {
  box-shadow: 0 0 0 2px #C4A35A inset;
}

.option-flag {
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
}

.option-label {
  flex: 1;
}

.option-check {
  color: #8B4513;
  font-weight: 700;
  font-size: 14px;
}

.transitioning .lang-trigger {
  animation: pulse-glow 0.3s ease;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(196, 163, 90, 0);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(196, 163, 90, 0.3);
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 768px) {
  .lang-label {
    display: none;
  }

  .lang-trigger {
    padding: 8px 10px;
  }
}
</style>
