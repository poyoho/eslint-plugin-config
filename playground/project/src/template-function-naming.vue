<template>
  <div>
    <div>
      <input
        @enter="aaaInputName"
        @update-user-name="bbbUserName"
      >
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types  */
export default {
  methods: {
    aaaInputName () {
      // aaa
    }, // ❌
    bbbUserName () {
      // bbb
    }, // ❌
  }
}
</script>
