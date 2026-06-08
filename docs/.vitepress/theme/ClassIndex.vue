<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { categories, type TreeItem } from '../structure'

const props = defineProps<{ categoryId: string }>()

const category = computed(() => categories.find((c) => c.id === props.categoryId))

interface Card {
  text: string
  // lectiile directe ale cardului
  links: TreeItem[]
  // sub-sectiuni imbricate (ex. "Cifrele unui numar"), cu lectiile lor
  groups: { text: string; links: TreeItem[] }[]
}

// Imparte un nod cu copii in: lectii directe (au link) si sub-grupuri (au items).
function splitChildren(items: TreeItem[]) {
  const links = items.filter((it) => it.link)
  const groups = items
    .filter((it) => it.items?.length)
    .map((it) => ({ text: it.text, links: it.items!.filter((l) => l.link) }))
  return { links, groups }
}

const cards = computed<Card[]>(() => {
  const cat = category.value
  if (!cat) return []

  const result: Card[] = []

  // Lectiile "libere" de nivel 1 (fara sub-sectiune) -> un singur card initial.
  const looseLessons = cat.items.filter((it) => it.link)
  if (looseLessons.length) {
    result.push({ text: 'Lectii', links: looseLessons, groups: [] })
  }

  // Fiecare sectiune de nivel 1 -> un card.
  for (const section of cat.items.filter((it) => it.items?.length)) {
    const { links, groups } = splitChildren(section.items!)
    result.push({ text: section.text, links, groups })
  }

  return result
})
</script>

<template>
  <div v-if="category" class="class-index">
    <h1 class="class-index__title">{{ category.text }}</h1>

    <div class="class-index__grid">
      <section v-for="card in cards" :key="card.text" class="ci-card">
        <h2 class="ci-card__title">{{ card.text }}</h2>

        <ul v-if="card.links.length" class="ci-card__links">
          <li v-for="lesson in card.links" :key="lesson.link">
            <a :href="withBase(lesson.link!)">{{ lesson.text }}</a>
          </li>
        </ul>

        <div v-for="group in card.groups" :key="group.text" class="ci-group">
          <h3 class="ci-group__title">{{ group.text }}</h3>
          <ul class="ci-card__links">
            <li v-for="lesson in group.links" :key="lesson.link">
              <a :href="withBase(lesson.link!)">{{ lesson.text }}</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.class-index {
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px 24px 64px;
}

.class-index__title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 28px;
}

.class-index__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  align-items: start;
}

.ci-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 20px 22px;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.ci-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.ci-card__title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 14px;
  padding: 0;
  border: none;
  color: var(--vp-c-text-1);
}

.ci-card__links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ci-card__links li + li {
  margin-top: 2px;
}

.ci-card__links a {
  display: block;
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.ci-card__links a:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-brand-1);
}

.ci-group {
  margin-top: 14px;
}

.ci-group__title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
  margin: 0 0 6px;
  padding: 0 10px;
}
</style>
