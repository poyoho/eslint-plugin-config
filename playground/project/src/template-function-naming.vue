<!-- eslint-disable @poyoho/config/vue/template-function-naming -->
<template>
  <div>
    <input
      @enter="enterInputName"
      @update="updateAaaAaaaAaaaUL"
      @a-b-c="adasd"
    >
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default {
  // eslint-disable-next-line @poyoho/config/vue/template-function-naming, @typescript-eslint/no-empty-function
  methods: {
    // eslint-disable-next-line @poyoho/config/vue/template-function-naming
    adasd() {
      //
    },
    b: () => {
      //
    },
    c() {
      // eslint-disable-next-line @poyoho/config/vue/template-function-naming
      this.updateAaaAaaaAaaaUL()
    },
    // eslint-disable-next-line @poyoho/config/vue/template-function-naming
    updateAaaAaaaAaaaUL: () => {
      //
    }
  }
}
</script>
