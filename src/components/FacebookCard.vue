<script setup lang="ts">
import { NodeViewWrapper } from '@tiptap/vue-3'
import type { NodeViewProps } from '@tiptap/core'

defineProps<NodeViewProps>()
</script>

<template>
  <NodeViewWrapper class="flex justify-center my-4">
    <iframe :src="node.attrs.src" width="500" height="600" style="border:none;overflow:hidden" scrolling="no"
      frameborder="0" allowfullscreen="true"></iframe>
  </NodeViewWrapper>
</template>
