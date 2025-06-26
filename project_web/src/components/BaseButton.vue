<template>
  <button
    :class="['base-button', variantClass]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    variant: {
      type: String,
      default: "primary", // "primary" (fond clair), "on-dark" (fond foncé)
    },
  },
  computed: {
    variantClass() {
      return this.variant === "on-dark" ? "on-dark" : "primary";
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap');

.base-button {
  display: inline-block;
  padding: 0.55em 1.4em;
  font-family: 'Inter', Avenir, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s, border 0.15s;
  letter-spacing: 0.01em;
  outline: none;
  border: 2px solid;
  text-align: center;
}

/* Variante pour fond clair */
.primary {
  background: transparent;
  color: #2563eb;
  border-color: #2563eb;
}
.primary:hover,
.primary:focus {
  background: #2563eb;
  color: #fff;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.08);
}
.primary:active {
  background: #1e40af;
  border-color: #1e40af;
  color: #fff;
}

/* Variante pour fond foncé (header/footer) */
.on-dark {
  background: transparent;
  color: #fff;
  border-color: #fff;
}
.on-dark:hover,
.on-dark:focus {
  background: rgba(255,255,255,0.12);
  color: #fff;
  border-color: #fff;
  box-shadow: 0 2px 8px rgba(255,255,255,0.08);
}
.on-dark:active {
  background: rgba(255,255,255,0.22);
  color: #fff;
  border-color: #fff;
}
</style>
