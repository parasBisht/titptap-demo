<script setup lang="ts">
import { shallowRef, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'

// ✅ Use shallowRef for class-based objects to avoid reactivity overhead
const editor = new Editor({
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }), // Color still accepts 'types'
    TextStyle, // ✅ Do not configure 'types' for TextStyle
    StarterKit,
  ],
  content: `
    <h2>Hi there,</h2>
    <p>This is a <em>basic</em> example of <strong>Tiptap</strong>.</p>
  `,
})

// ✅ Clean up the editor
onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<template>
  <div v-if="editor" class="container">
    <div class="control-group">
      <div class="button-group">
        <button @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }">
          Blockquote
        </button>

        <button @click="editor.chain().focus().setHorizontalRule().run()">
          Horizontal Rule
        </button>

        <button @click="editor.chain().focus().setHardBreak().run()">
          Hard Break
        </button>

        <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
          Undo
        </button>

        <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
          Redo
        </button>

        <button @click="editor.chain().focus().setColor('#958DF1').run()"
          :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }">
          Purple
        </button>
      </div>
    </div>

    <EditorContent :editor="editor" />
  </div>
</template>
