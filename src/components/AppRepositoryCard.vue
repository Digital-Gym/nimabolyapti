<script setup>
const props = defineProps({
  repo : {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="flex gap-3 items-center border rounded p-5">
    <!-- avatar -->
    <a
      :href="props.repo.owner.html_url" target="_blank"
      class="
        rounded-full ring-2 ring-white hover:ring-blue-500
        transition overflow-hidden size-12 shrink-0
        "
    >
      <img 
        :src="props.repo.owner.avatar_url"
        :alt="`${props.repo.owner.login}'s avatar'`"
        class="w-full h-full object-cover"
      >
    </a>
    <div class="flex flex-col gap-1">
      <a 
        :href="props.repo.html_url"
        target="_blank" 
        class="text-xl hover:underline"
      >
        {{ props.repo.name }}
      </a>
      <small class="text-gray-800">
        {{ props.repo.description }}
      </small>
    </div>
  </div>
</template>