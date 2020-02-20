<template>
  <div class="md:hidden">
    <div
      :class="[shift ? '-shift-y-64' : 'shift-0']"
      class="fixed top-0 left-0 z-30 w-full h-64 transition bg-card"
    />
    <div
      :class="[shift ? '-shift-y-64' : 'shift-0']"
      class="fixed top-0 left-0 z-50 w-full h-64 transition"
    >
      <div class="absolute top-0 w-full h-24 gradient-y-card-to-transparent" />
      <div class="absolute bottom-0 w-full h-24 gradient-y-transparent-to-card" />
    </div>
    <div
      :class="[shift ? '-shift-y-96' : 'shift-0']"
      class="fixed top-0 left-0 z-50 w-full h-32 mt-64 transition gradient-y-background-to-transparent"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default {
  props: {
    shift: {
      type: Boolean,
      required: true
    }
  }
};
</script>
