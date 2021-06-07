<template>
  <div
    class="test"
    @aaa="aaa"
  />
</template>

<script lang="ts">
export default {
  methods: {
    aaa() {
      //
      console.log(this.$route.query)
    }
  }
}
</script>

<style>

</style>
