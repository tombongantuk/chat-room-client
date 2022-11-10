<script>
export default {
  data() {
    return {
      username: '',
      showMessage:'',
      roomId: '',
      isInvalidInput: false,
      error:null,
      message:'',
      messages: [],
      users: [],
      lastMessagesArrayLength:0
    }
  },
  methods: {
  },
}
</script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>