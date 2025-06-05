<template>
  <LayoutsMainNavbar />
  <section >
    <slot></slot>
  </section>
</template>

<script>
export default {
  layout: "default",
};
</script>