<template>
  <div
    v-resize:debounce="onResize"
    class="relative flex flex-col w-screen mx-auto font-sans text-base max-w-1440 text-secondary md:flex-row"
  >
    <top-bar :shift="isIntroVisible" />
    <div
      v-observe-visibility="onIntroVisibilityChange"
      class="static flex flex-col justify-between w-full p-32 md:max-w-408 lg:max-w-496 md:fixed md:h-screen lg:py-88 lg:pl-88 md:pr-0"
    >
      <div class="flex flex-col">
        <div>
          <h1
            class="text-2xl font-bold leading-tight lg:text-4xl lg:leading-none text-primary"
          >
            Hello, I’m Sarah Dayan.
          </h1>
          <div class="leading-loose">
            <p class="mt-32">
              I’m a Staff Software Engineer currently working as Tech Lead of
              the Doc Squad at
              <a
                class="underline text-primary"
                href="https://www.algolia.com/"
                target="_blank"
                rel="noopener"
                >Algolia</a
              >. I mostly do front-end development, and I’m a
              <a
                class="underline text-primary"
                href="https://vuejs.org/"
                rel="noopener"
                >Vue.js</a
              >
              and CSS nerd. I can't shut up about test-driven development and
              utility-first CSS. I also share what I learn on my blog
              <a
                class="underline text-primary"
                href="http://frontstuff.io"
                target="_blank"
                rel="noopener"
                >frontstuff.io</a
              >, or at meetups and conferences.
            </p>
          </div>
        </div>
        <scroll-spy
          class="hidden mt-72 md:block"
          :active="active"
          :items="items"
        />
      </div>
      <div class="flex items-center w-full mt-32 md:mt-72">
        <g-image
          alt="Sarah Dayan's headshot"
          src="~/assets/images/sarah-dayan.jpg"
          class="w-48 h-48 mr-32 rounded-full"
        />
        <social-links />
        <button @click="toggleMode" class="w-24 ml-24 text-primary">
          <sun-icon aria-hidden="true" class="flex-none stroke-current" :class="{ hidden: isLight }" />
          <moon-icon aria-hidden="true" class="flex-none stroke-current" :class="{ hidden: isDark }" />
          <span class="sr-only">
            Switch to {{ isDark ? 'light' : 'dark' }} mode
          </span>
        </button>
      </div>
    </div>
    <div
      class="static p-32 md:max-w-536 lg:max-w-736 md:absolute md:right-0 lg:py-88 lg:pr-88 md:pl-0"
    >
      <slot />
    </div>
    <div
      class="fixed bottom-0 left-0 z-20 w-full h-32 pointer-events-none gradient-y-transparent-to-background"
    />
    <div
      class="fixed top-0 left-0 z-20 w-full h-32 pointer-events-none gradient-y-background-to-transparent"
    />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Vue from "vue";

import "@/assets/css/colors.css";

import { bus } from "@/main";

import ScrollSpy from "@/partials/ScrollSpy";
import TopBar from "@/partials/TopBar";
import SocialLinks from "@/partials/SocialLinks";

import SunIcon from "@/assets/icons/sun.svg?inline";
import MoonIcon from "@/assets/icons/moon.svg?inline";

const themes = ["theme-dark", "theme-light"];

export default Vue.extend({
  metaInfo() {
    return {
      bodyAttrs: {
        class: `${themes[this.mode]} bg-background overflow-x-hidden`
      }
    };
  },
  components: {
    ScrollSpy,
    SocialLinks,
    TopBar,
    SunIcon,
    MoonIcon
  },
  data() {
    return {
      isIntroVisible: true,
      items: [
        { label: "Projects", link: "#projects" },
        { label: "Talks", link: "#talks" },
        { label: "Interviews", link: "#interviews" }
      ],
      active: 0,
      mode: this.$localStorage.get("mode") || 0
    };
  },
  computed: {
    isLight() {
      return this.mode === 1;
    },
    isDark() {
      return this.mode === 0;
    }
  },
  created() {
    bus.$on("update:scrollspy", index => {
      this.active = index || 0;
    });
  },
  methods: {
    onResize({ offsetWidth }) {
      bus.$emit("resize:window", offsetWidth);
    },
    onIntroVisibilityChange(isVisible) {
      this.isIntroVisible = isVisible;
    },
    toggleMode() {
      this.mode = this.mode === 0 ? 1 : 0;
      this.$localStorage.set("mode", this.mode);
    }
  }
});
</script>
