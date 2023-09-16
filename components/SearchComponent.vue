<template>
  <div class="input-icon-wrap">
    <span class="input-icon"><IconsSearch /></span>
    <input placeholder="Search" type="text" class="input-with-icon">
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss">
.input-icon-wrap {
  border: 1px solid $col-lightBlueShade;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
}

.input-with-icon {
  border: none;
  flex: 1;
}

.input-with-icon {
  padding: 4px;
  border-radius: 8px;
}

.input-icon {
  padding: 4px 8px 4px 8px;
  border-radius: 8px;
}
</style>
