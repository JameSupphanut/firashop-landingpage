<template>
  <div class="text-3xl font-bold underline">
    {{ $t('hello') }}
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>

<style>

</style>