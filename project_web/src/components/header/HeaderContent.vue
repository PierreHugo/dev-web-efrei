<template>
  <div>
    <nav style="margin-left: 24px;">
      <div class="left">
        <LoginButton variant="on-dark" />
      </div>
    </nav>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import LoginButton from '@/components/LoginButton.vue'
export default {
  name: "HeaderContent",
  components: { LoginButton, BaseButton }
};
</script>
