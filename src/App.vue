<script setup>
import { getSome } from "./api";
import { ref, onMounted } from 'vue';
import AppRepositoryCard from "@/components/AppRepositoryCard.vue";
import AppLoader from '@/components/AppLoader.vue';
import AppButton from "@/components/AppButton.vue";
import { extractLink } from '@/utils';

const data = ref();
const nextUrl = ref();
const prevUrl = ref();
const userUrl = ref();
const isLoading = ref(false);

const handleNext = () => {
  userUrl.value = nextUrl.value;
  refresh();
}

const handlePrev = () => {
  userUrl.value = prevUrl.value;
  refresh();
}

const refresh = async () => {
  isLoading.value = true;
  const response = await getSome(userUrl.value);
  const link = response.link.split(" ");

  nextUrl.value = extractLink(link[0]);
  prevUrl.value = extractLink(link[2]);
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
        <AppButton @click="handlePrev">Prev</AppButton>
        <AppButton @click="handleNext">Next</AppButton>
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
          <AppButton @click="handlePrev">Prev</AppButton>
          <AppButton @click="handleNext">Next</AppButton>
        </div>
      </div>
      <AppLoader v-if="isLoading" />
    </div>
  </div>
</template>

<style scoped>
</style>
