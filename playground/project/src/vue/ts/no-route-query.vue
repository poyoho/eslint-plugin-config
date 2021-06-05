<template>
  <div class="test" />
</template>

<script lang="ts">
function aa(this: any, a: number) {
  console.log(a)
  console.log(this.$route.query)
}
export default {
  methods: {
    aaa() {
      //
    }
  }
}
</script>

<style>

</style>
