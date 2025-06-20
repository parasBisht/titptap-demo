<script setup lang="ts">
import { shallowRef, computed, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'

const editor = shallowRef<Editor>(new Editor({
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit
  ],
  content: `
    <p>Hi there</p>
    <p>How are you?</p>
  `,
}))

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// ✅ Toolbar actions as a computed property
const actions = computed(() => [
  {
    label: 'Bold',
    command: () => editor.value?.chain().focus().toggleBold().run(),
    isActive: editor.value?.isActive('bold'),
    disabled: !editor.value?.can().chain().focus().toggleBold().run(),
  },
  {
    label: 'Italic',
    command: () => editor.value?.chain().focus().toggleItalic().run(),
    isActive: editor.value?.isActive('italic'),
    disabled: !editor.value?.can().chain().focus().toggleItalic().run(),
  },
  {
    label: 'Strike',
    command: () => editor.value?.chain().focus().toggleStrike().run(),
    isActive: editor.value?.isActive('strike'),
    disabled: !editor.value?.can().chain().focus().toggleStrike().run(),
  },
  {
    label: 'Undo',
    command: () => editor.value?.chain().focus().undo().run(),
    isActive: false,
    disabled: !editor.value?.can().chain().focus().undo().run(),
  },
  {
    label: 'Redo',
    command: () => editor.value?.chain().focus().redo().run(),
    isActive: false,
    disabled: !editor.value?.can().chain().focus().redo().run(),
  },
  {
    label: 'Purple',
    command: () => editor.value?.chain().focus().setColor('#958DF1').run(),
    isActive: editor.value?.isActive('textStyle', { color: '#958DF1' }),
    disabled: false,
  },
])
</script>


<template>
  <div v-if="editor" class="max-w-4xl mx-auto p-4">
    <div class="flex flex-wrap gap-2 mb-4">
      <button v-for="action in actions" :key="action.label" @click="action.command" :disabled="action.disabled" :class="[
    'px-3 py-1 rounded-lg text-sm font-medium border',
    'hover:bg-purple-100 hover:text-purple-700 transition',
    action.isActive ? 'bg-purple-500 text-white' : 'bg-white text-gray-700',
    action.disabled ? 'opacity-50 cursor-not-allowed' : ''
  ]">
        {{ action.label }}
      </button>
    </div>

    <EditorContent :editor="editor" class="border p-4 rounded-lg" />
  </div>
</template>
