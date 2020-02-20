<template>
  <Layout>
    <ClientOnly>
      <div
        id="projects"
        v-observe-visibility="onVisibilityChange(0)"
        class="md:pt-88 md:-mt-96"
      >
        <h2
          class="sticky top-0 z-40 pt-24 text-sm font-bold tracking-widest uppercase md:sr-only text-primary"
        >
          Projects
        </h2>
        <all-projects
          class="pt-32 pb-40 md:py-0"
          :items="$page.repositories.edges"
        />
      </div>
      <div
        id="talks"
        v-observe-visibility="onVisibilityChange(1)"
        class="md:pt-88"
      >
        <h2
          class="sticky top-0 z-40 pt-24 text-sm font-bold tracking-widest uppercase md:sr-only text-primary"
        >
          Talks
        </h2>
        <all-talks class="pt-32 pb-40 md:py-0" :items="$page.talks.edges" />
      </div>
      <div
        id="interviews"
        v-observe-visibility="onVisibilityChange(2)"
        class="mb-48 md:pt-8"
      >
        <h2
          class="sticky top-0 z-40 pt-24 text-sm font-bold tracking-widest uppercase md:sr-only text-primary"
        >
          Interviews
        </h2>
        <all-interviews
          class="pt-80 md:pt-0 md:mt-72"
          :items="$page.interviews.edges"
        />
      </div>
      <p
        v-observe-visibility="showDesignerLine"
        :class="[
          shouldShowDesignerLine ? 'opacity-75' : 'opacity-0 shift-y-16'
        ]"
        class="text-sm transition mt-104 ml-104 md:ml-160"
      >
        Design by
        <a
          class="transition text-primary hover:underline"
          href="https://dribbble.com/NicolasMzrd"
          target="_blank"
          rel="noopener"
          >Nicolas Meuzard</a
        >.
      </p>
    </ClientOnly>
  </Layout>
</template>

<page-query>
query {
  repositories: allRepository(sortBy: "stargazers_count", order: DESC) {
    edges {
      node {
        id
        title: name
        description
        link: html_url
        language
        stars: stargazers_count
      }
    }
  }
  talks: allTalk {
    edges {
      node {
        id
        title
        event
        location {
          city
          country
        }
        date
        links {
          label
          link
        }
      }
    }
  }
  interviews: allInterview {
    edges {
      node {
        id
        title
        link
        platform
        hosts
        guests
        date
        type
      }
    }
  }
}
</page-query>

<script>
import Vue from "vue";

import { bus } from "@/main";

import AllProjects from "@/partials/AllProjects";
import AllTalks from "@/partials/AllTalks";
import AllInterviews from "@/partials/AllInterviews";

export default Vue.extend({
  components: {
    AllProjects,
    AllTalks,
    AllInterviews
  },
  data() {
    return {
      visibleSections: [],
      shouldShowDesignerLine: false
    };
  },
  methods: {
    onVisibilityChange(index) {
      return {
        callback: isVisible => {
          if (isVisible) {
            this.visibleSections.push(index);
          } else {
            this.visibleSections = this.visibleSections.filter(item => {
              return item !== index;
            });
          }

          this.visibleSections.sort();

          bus.$emit("update:scrollspy", this.visibleSections[0]);
        },
        intersection: {
          threshold: 0.3
        },
        throttle: 300
      };
    },
    showDesignerLine(isVisible) {
      this.shouldShowDesignerLine = isVisible;
    }
  }
});
</script>
