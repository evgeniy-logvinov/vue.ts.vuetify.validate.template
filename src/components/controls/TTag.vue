<template>
  <span class="tag">
    {{ tag }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class TTagComponent extends Vue {
  @Prop() readonly tag!: string;
}
</script>

<style lang="postcss" scoped>
.tag {
  font-size: 14px;
  line-height: 17px;
  padding: 4px 10px;
  color: var(--secondaryGrayColor);
  box-sizing: border-box;
  border-radius: var(--defaultBorderRadius);
  display: inline-block;
  background: var(--lightGrayColor);
  transition: all 0.15s ease-in-out;
}
</style>
