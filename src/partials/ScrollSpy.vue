<template>
  <nav class="text-sm font-bold uppercase text-widest">
    <ul class="flex flex-row md:flex-col md:-my-16">
      <li v-for="(item, index) in navigation" :key="index" class="md:my-16">
        <a
          v-smooth-scroll="{ duration: 500, updateHistory: false }"
          class="inline-flex items-center hover:text-primary transition group"
          :class="{ 'text-primary': item.active }"
          :href="item.link"
        >
          <span class="text-xs tracking-wide">{{ getNumber(index) }}</span>
          <span
            class="inline-block h-px mx-16 -mt-px group-hover:w-48 group-hover:bg-primary transition"
            :class="[item.active ? 'w-48 bg-primary' : 'w-24 bg-secondary']"
          ></span>
          <span class="text-xs tracking-widest uppercase">{{
            item.label
          }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

type Item = {
  label: string;
  link: string;
};

function getNumber(index: number) {
  return (index + 1).toString().padStart(2, "0");
}

export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true
    },
    active: {
      type: Number,
      default: 0
    }
  },
  computed: {
    navigation() {
      return this.items.map((item, index) => {
        return {
          ...item,
          active: index === this.active
        };
      });
    }
  },
  methods: {
    getNumber
  }
});
</script>
