<template>
  <div class="spinner-wrap">
    <div class="lds-ripple"><div></div><div></div></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class SpinnerComponent extends Vue {
}
</script>

<style lang="postcss" scoped>
.spinner-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-width: 356px;
  height: 99vh;
  justify-content: center;
}

@media (min-width: 992px) {
  .spinner-wrap {
      display: flex;
      flex-direction: row;
      max-width: none;
  }
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  background-color: #320E3F;
}
.lds-ripple div:nth-child(2) {
  background-color: var(--primaryColor);
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
