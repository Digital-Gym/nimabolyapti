<script setup>
import StarIcon from '@/components/icons/StarIcon.vue';

const props = defineProps({
  repo : {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="flex gap-3 items-center border rounded-lg p-5 relative hover:border-gray-400">
    <!-- avatar -->
    <a
      :href="props.repo.owner.html_url" target="_blank"
      class="
        rounded-full ring-2 ring-white hover:ring-blue-500
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
    <span class="absolute rounded-lg bg-blue-100 z-30 flex items-center gap-1 px-2 size-min top-3 right-3">
      <StarIcon class="size-4 hover:animate-spin"/>
      <small>{{ props.repo.stargazers_count }}</small>
    </span>

    <div class="flex flex-col gap-1">
      <!-- Name of repo -->
      <a 
        :href="props.repo.html_url"
        target="_blank" 
        class="text-xl hover:underline"
      >
        {{ props.repo.name }}
      </a>
      <!-- Description -->
      <small class="text-gray-800">
        {{ props.repo.description }}
      </small>
    </div>
  </div>
</template>