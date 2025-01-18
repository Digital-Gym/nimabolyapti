<script setup>
import StarIcon from '@/components/icons/StarIcon.vue';
import { ref, computed } from 'vue';

const props = defineProps({
  repo : {
    type: Object,
    required: true
  }
});

const isExpaded = ref(false);
const el = ref();

const isExpandable = computed(()=>{
  if(isExpaded.value){
    return false;
  }

  return el.value.scrollHeight > el.value.clientHeight;
});

const toggleExpand = () => {
  isExpaded.value = !isExpaded.value;
  el.value.style.maxHeight = isExpaded.value ? 'none' : '2.5rem';
}
</script>

<template>
  <div class="
    flex gap-3 items-start border rounded-lg px-5 relative dark:hover:border-gray-700
    dark:border-gray-800 light:hover:border-gray-500 py-8
    "
    @click="toggleExpand"
  >
    <!-- avatar -->
    <a
      :href="props.repo.owner.html_url" target="_blank"
      class="
        rounded-full ring-2 ring-white dark:ring-gray-800 hover:ring-blue-500
        transition overflow-hidden shrink-0 size-12 z-10
        "
    >
      <img 
        :src="props.repo.owner.avatar_url"
        :alt="`${props.repo.owner.login}'s avatar'`"
        class="w-full h-full object-cover"
      >
    </a>

    <!-- Stars -->
    <span class="
      absolute rounded-lg bg-blue-100 z-30 flex items-center gap-1 px-2 size-min top-3 right-3
      dark:text-gray-800 dark:bg-blue-300 opacity-80
      "
    >
      <StarIcon class="size-4 hover:animate-spin"/>
      <small>{{ props.repo.stargazers_count }}</small>
    </span>

    <div class="flex flex-col gap-1 w-4/5 text-wrap break-words">
      <!-- Name of repo -->
      <a 
        :href="props.repo.html_url"
        target="_blank" 
        class="md:text-xl text-md hover:underline text-wrap"
      >
        {{ props.repo.name }}
      </a>
      <!-- Description -->
      <small 
        class="text-gray-800 dark:text-gray-400 text-wrap relative"
        :class="{
          'max-h-10 overflow-hidden' : !isExpaded
        }"
        ref="el"
      >
        {{ props.repo.description }}
        <div
          v-if="el && isExpandable" 
          class="w-full h-2/4 absolute bottom-0 bg-gradient-to-t
          from-white via-gray-50/50 to-transparent
          dark:from-gray-900 dark:via-gray-850/50
          "
        ></div>
      </small>
    </div>
  </div>
</template>