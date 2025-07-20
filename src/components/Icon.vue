<template>
  <svg
    v-if="props.shape === 'plus'"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    :width="width"
    :height="height"
  >
    <g :fill="props.color">
      <path
        d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"
      />
    </g>
  </svg>
  <svg
    v-if="props.shape === 'minus'"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    :width="width"
    :height="height"
  >
    <g :fill="props.color">
      <path
        d="M480,288H32c-17.673,0-32-14.327-32-32s14.327-32,32-32h448c17.673,0,32,14.327,32,32S497.673,288,480,288z"
      />
    </g>
  </svg>
  <svg
    v-if="props.shape === 'list'"
    xmlns="http://www.w3.org/2000/svg"
    id="Outline"
    viewBox="0 0 24 24"
    :width="width"
    :height="height"
  >
    <g :fill="props.color">
      <path d="M7,6H23a1,1,0,0,0,0-2H7A1,1,0,0,0,7,6Z" />
      <path d="M23,11H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
      <path d="M23,18H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" />
      <circle cx="2" cy="5" r="2" />
      <circle cx="2" cy="12" r="2" />
      <circle cx="2" cy="19" r="2" />
    </g>
  </svg>
  <svg
    v-if="props.shape === 'search'"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    viewBox="0 0 513.749 513.749"
    style="enable-background: new 0 0 513.749 513.749"
    xml:space="preserve"
    :width="width"
    :height="height"
  >
    <g :fill="props.color">
      <path
        d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"
      />
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps(['shape', 'size', 'color']);
const width = computed(() => {
  if (props.size === 'xs') return 12;
  if (props.size === 'sm') return 18;
  if (props.size === 'md') return 24;
  if (props.size === 'lg') return 30;
  if (props.size === 'xl') return 36;
  else return 24;
});
const height = computed(() => {
  if (props.size === 'sm') return 24;
  else return 24;
});
</script>
