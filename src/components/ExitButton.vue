<template>
  <div class="exit-box" @click="exitFromAccount">
    <span class="triangle"></span>
    <p class="exit-box__text">Выйти</p>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "ExitButton",
  methods: {
    exitFromAccount() {
      store.dispatch("exitFromAccount");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.exit-box {
  background-color: rgba(27, 47, 70, 1);
  height: 108px;
  width: 145px;
  padding: 40px;
  position: relative;
  margin-bottom: -108px;
  z-index: 10;
  right: -50px;
  top: 20px;
  border-radius: 12px;
  -webkit-box-shadow: 3px 4px 36px 5px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: 3px 4px 36px 5px rgba(0, 0, 0, 0.45);
  box-shadow: 3px 4px 36px 5px rgba(0, 0, 0, 0.45);
  cursor: pointer;
  &__text {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 155.556%;
    color: rgba(177, 201, 9, 1);
  }
  .triangle:after {
    content: "";
    width: 14px;
    height: 20px;
    position: absolute;
    border-radius: 5px;
    top: -15px;
    right: 25px;
    -webkit-transform: skew(40deg);
    -moz-transform: skew(-40deg);
    -o-transform: skew(-40deg);
    -ms-transform: skew(-40deg);
    transform: skew(23deg);
    background: rgba(27, 47, 70, 1);
  }

  .triangle:before {
    content: "";
    width: 14px;
    height: 20px;
    position: absolute;
    border-radius: 5px;
    top: -15px;
    right: 33px;
    -webkit-transform: skew(129deg);
    -moz-transform: skew(129deg);
    -o-transform: skew(129deg);
    -ms-transform: skew(129deg);
    transform: skew(149deg);
    background: rgba(27, 47, 70, 1);
  }
}
</style>
