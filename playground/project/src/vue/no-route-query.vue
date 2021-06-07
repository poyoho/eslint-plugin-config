<template>
  <div
    class="test"
    @aaa="aaa"
  />
</template>

<script lang="ts">
export default {
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    aaa() {
      //
      // eslint-disable-next-line @poyoho/config/vue/no-route-query
      console.log(this.$route.query)
    }
  }
}
</script>

<style>

</style>
