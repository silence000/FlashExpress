<template>
  <div>
    <h3>欢迎使用<br />FlashExpress</h3>
  </div>
</template>
<script>
export default {
  mounted() {
    this.initData();
  },
  data() {
    return {};
  },
  methods: {
    initData() {
      console.log("userID:" + sessionStorage.getItem("userID"));
      console.log("userName: " + sessionStorage.getItem("userName"));
      console.log("roleVal: " + sessionStorage.getItem("roleVal"));
      console.log("roleDescription: " + sessionStorage.getItem("roleDescription"));
    }
  },
  computed: {},
  watch: {}
};
</script>
<style scoped lang="scss">
@import "../assets/scss/variable";
h3 {
  color: $color-text-primary;
  text-align: center;
  margin-top: 150px;
  line-height: 30px;
}
</style>
