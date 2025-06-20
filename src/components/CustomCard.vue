<script setup lang="ts">
import { shallowRef, ref, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { FacebookCardNode } from '../tiptap/FacebookCardNode'

const editor = shallowRef<Editor>(new Editor({
  extensions: [
    StarterKit,
    FacebookCardNode,
  ],
  content: '<p>Paste a Facebook post URL and insert.</p>',
}))

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const facebookUrl = ref('')

const insertFacebookEmbed = () => {
  if (!facebookUrl.value) return

  const embedUrl = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(facebookUrl.value)}&width=500`

  editor.value?.chain().focus().insertContent({
    type: 'facebookCard',
    attrs: { src: embedUrl },
  }).run()

  facebookUrl.value = ''
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-4">
    <div class="flex gap-2 mb-4">
      <input v-model="facebookUrl" type="text" placeholder="Enter Facebook post URL"
        class="flex-1 p-2 border rounded" />
      <button @click="insertFacebookEmbed" class="bg-blue-600 text-white px-4 py-2 rounded">
        Insert Post
      </button>
    </div>

    <EditorContent :editor="editor" class="border min-h-[300px] p-4 rounded-lg" />
  </div>
</template>
