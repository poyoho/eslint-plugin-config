<template>
  <div class="test" />
</template>

<script>
function testBlock4() {
  // eslint-disable-next-line @poyoho/config/vue/no-route-query
  console.log(this.$route.query)
}
export default {
  methods: {
    testBlock4() {
      const a = this.$route
      // eslint-disable-next-line @poyoho/config/vue/no-route-query
      console.log(a.query.a)
    }
  }
}
</script>

<style>

</style>
