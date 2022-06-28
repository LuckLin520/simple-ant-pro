<template>
  <div class="Workplace">
    {{ timeFix }}，{{ userData.name }}<span class="welcome">，{{ welcome }}</span>
  </div>
</template>

<script>
import { timeFix, welcome } from '@/utils/util'

export default {
  name: 'Workplace',
  data() {
    return {
      timeFix: timeFix(),
      welcome: welcome()
    }
  },
  computed: {
    userData() {
      return this.$store.state.user.userData
    }
  }
}
</script>

<style lang="less" scoped>
.Workplace {
  font-size: 30px;
  text-align: center;
  padding-top: 20vh;
}
</style>
