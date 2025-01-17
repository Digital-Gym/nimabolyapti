<script setup>
import { getSome } from "./api";
import { ref, onMounted } from 'vue';
import AppRepositoryCard from "@/components/AppRepositoryCard.vue";
import AppLoader from '@/components/AppLoader.vue';
import AppButton from "@/components/AppButton.vue";
import { extractLink } from '@/utils';

const data = ref();
const firstUrl = ref();
const prevUrl = ref();
const nextUrl = ref();
const lastUrl = ref();
const userUrl = ref();
const isLoading = ref(false);

const handleMove = (to) => {
  switch(to){
    case 'first': userUrl.value = firstUrl.value; break;
    case 'prev': userUrl.value = prevUrl.value; break;
    case 'next': userUrl.value = nextUrl.value; break;
    case 'last': userUrl.value = lastUrl.value; break;
  }
  refresh();
}

const refresh = async () => {
  isLoading.value = true;
  const response = await getSome(userUrl.value);
  const link = extractLink(response.link.split(" "));

  firstUrl.value = link.first;
  prevUrl.value = link.prev;
  nextUrl.value = link.next;
  lastUrl.value = link.last;
  
  data.value = response.data.items;
  isLoading.value = false;
}

onMounted(()=>{
  refresh();
})
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="flex flex-col gap-8 w-4/5 lg:w-2/5 m-8">
      <h1 class="text-3xl">Repositories</h1>
      <!-- control panel -->
      <div class="flex gap-1">
        <AppButton @click="handleMove('first')" :disabled="!firstUrl" color="gray">First</AppButton>
        <AppButton @click="handleMove('prev')" :disabled="!prevUrl">Prev</AppButton>
        <AppButton @click="handleMove('next')" :disabled="!nextUrl">Next</AppButton>
        <AppButton @click="handleMove('last')" :disabled="!lastUrl" color="gray">Last</AppButton>
      </div>
      <!-- got data -->
      <div
        class="flex flex-col gap-3 relative rounded" 
        v-if="data"
      >
        <AppRepositoryCard 
          v-for="repo in data"
          :key="`${repo.owner.login}-${repo.name}`"
          :repo="repo"
        />
        <div
          v-if="isLoading" 
          class="w-full h-full absolute bg-gray-50 opacity-35"
        />

        <div class="flex gap-1">
          <AppButton @click="handleMove('first')" :disabled="!firstUrl">First</AppButton>
          <AppButton @click="handleMove('prev')" :disabled="!prevUrl">Prev</AppButton>
          <AppButton @click="handleMove('next')" :disabled="!nextUrl">Next</AppButton>
          <AppButton @click="handleMove('last')" :disabled="!lastUrl">Last</AppButton>
        </div>

      </div>
      <AppLoader v-if="isLoading" />
    </div>
  </div>
</template>

<style scoped>
</style>
