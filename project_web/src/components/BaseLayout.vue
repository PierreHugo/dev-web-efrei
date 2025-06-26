<template>
  <div id="layout">
    <base-header />
    <main>
      <slot />
    </main>
    <base-footer />
  </div>
</template>

<script>
import BaseHeader from "@/components/header/BaseHeader.vue";
import BaseFooter from "@/components/footer/BaseFooter.vue";

export default {
  name: "BaseLayout",
  components: {
    BaseHeader,
    BaseFooter,
  },
};
</script>

<style scoped>
#layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fafbfc;
}
main {
  flex: 1;
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
}
</style>
