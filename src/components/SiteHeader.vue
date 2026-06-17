<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePartsStore } from '@/stores/parts'
import LanguageSwitcher from './LanguageSwitcher.vue'

const router = useRouter()
const store = usePartsStore()
const { t } = useI18n()

const searchInput = computed({
  get: () => store.searchQuery,
  set: (value: string) => {
    store.setSearchQuery(value)
    if (value.trim()) {
      router.push({ path: '/', query: { q: value.trim() } })
    } else {
      router.push({ path: '/', query: {} })
    }
  }
})

function goHome() {
  router.push('/')
}
</script>

<template>
  <header class="site-header" role="banner">
    <div class="header-inner">
      <a
        href="#"
        class="logo-section"
        role="link"
        :aria-label="t('header.title') + ' - ' + t('header.subtitle')"
        @click.prevent="goHome"
      >
        <div class="logo-icon" aria-hidden="true">🏛️</div>
        <div class="logo-text">
          <h1 class="site-title">{{ t('header.title') }}</h1>
          <p class="site-subtitle">{{ t('header.subtitle') }}</p>
        </div>
      </a>

      <div class="header-actions">
        <div class="search-section">
          <form class="search-box" role="search" @submit.prevent>
            <label for="part-search" class="sr-only">{{ t('common.search') }}</label>
            <input
              id="part-search"
              v-model="searchInput"
              type="search"
              :placeholder="t('common.search')"
              class="search-input"
              :aria-label="t('common.search')"
              autocomplete="off"
            />
            <button
              type="submit"
              class="search-btn"
              :aria-label="t('common.searchBtn')"
              @click="() => {}"
            >
              <span aria-hidden="true">🔍</span>
            </button>
          </form>
        </div>

        <LanguageSwitcher />
      </div>
    </div>

    <div class="header-decoration" aria-hidden="true"></div>
  </header>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.site-header {
  background: linear-gradient(180deg, #5C4033 0%, #3E2A20 100%);
  color: #F5F0E8;
  position: relative;
  box-shadow: 0 4px 20px rgba(92, 64, 51, 0.3);
  z-index: 100;
}

.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  padding: 4px 8px;
  margin: -4px -8px;
}

.logo-section:hover {
  opacity: 0.9;
}

.logo-section:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.5);
}

.logo-icon {
  font-size: 42px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.site-title {
  font-family: 'SimSun', 'STSong', serif;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #F5F0E8;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.site-subtitle {
  font-size: 13px;
  color: #DBC47D;
  margin: 4px 0 0 0;
  letter-spacing: 4px;
  font-family: 'SimSun', serif;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.search-section {
  flex-shrink: 0;
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(245, 240, 232, 0.1);
  border: 1.5px solid rgba(196, 163, 90, 0.5);
  border-radius: 25px;
  padding: 4px 4px 4px 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.search-box:focus-within {
  background: rgba(245, 240, 232, 0.15);
  border-color: #C4A35A;
  box-shadow: 0 0 0 3px rgba(196, 163, 90, 0.25);
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #F5F0E8;
  font-size: 14px;
  width: 240px;
  font-family: 'Microsoft YaHei', sans-serif;
  padding: 6px 0;
}

.search-input::placeholder {
  color: rgba(245, 240, 232, 0.55);
}

.search-btn {
  background: linear-gradient(135deg, #C4A35A 0%, #A68B3D 100%);
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #F9F5ED;
  flex-shrink: 0;
}

.search-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(196, 163, 90, 0.4);
}

.search-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(245, 240, 232, 0.4), 0 4px 12px rgba(196, 163, 90, 0.4);
}

.header-decoration {
  height: 3px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #C4A35A 20%, 
    #DBC47D 50%, 
    #C4A35A 80%, 
    transparent 100%
  );
}

@media (max-width: 1024px) {
  .header-inner {
    padding: 16px 24px;
  }

  .site-title {
    font-size: 18px;
  }

  .logo-icon {
    font-size: 36px;
  }

  .search-input {
    width: 180px;
  }
}

@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    gap: 14px;
    padding: 16px 20px;
  }

  .header-actions {
    width: 100%;
    flex-direction: column;
    gap: 12px;
  }

  .logo-section {
    text-align: center;
  }

  .site-title {
    font-size: 16px;
    letter-spacing: 1px;
  }

  .site-subtitle {
    font-size: 11px;
    letter-spacing: 2px;
  }

  .logo-icon {
    font-size: 32px;
  }

  .search-box {
    width: 100%;
  }

  .search-input {
    width: 100%;
    flex: 1;
  }
}
</style>
