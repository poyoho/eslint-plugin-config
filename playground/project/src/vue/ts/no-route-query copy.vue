<template>
  <div class="test" />
</template>

<script lang="ts">
function aa(this: any, a: number) {
  console.log(a)
  // eslint-disable-next-line @poyoho/config/vue/no-route-query
  console.log(this.$route.query)
}
</script>

<style>

</style>
