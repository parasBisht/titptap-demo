<script setup lang="ts">
import { shallowRef, computed, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Heading from '@tiptap/extension-heading'

const editor = shallowRef<Editor>(new Editor({
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    StarterKit,
    BulletList,
    OrderedList,
    Blockquote,
    CodeBlock,
    HardBreak,
    HorizontalRule,
    Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  ],
  content: `
  <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
  `,
}))

onBeforeUnmount(() => {
  console.log(editor)
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
  {
    label: 'H1',
    command: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: editor.value?.isActive('heading', { level: 1 }),
    disabled: false,
  },
  {
    label: 'Bullet List',
    command: () => editor.value?.chain().focus().toggleBulletList().run(),
    isActive: editor.value?.isActive('bulletList'),
    disabled: false,
  },
  {
    label: 'Ordered List',
    command: () => editor.value?.chain().focus().toggleOrderedList().run(),
    isActive: editor.value?.isActive('orderedList'),
    disabled: false,
  },
  {
    label: 'Blockquote',
    command: () => editor.value?.chain().focus().toggleBlockquote().run(),
    isActive: editor.value?.isActive('blockquote'),
    disabled: false,
  },
  {
    label: 'Code Block',
    command: () => editor.value?.chain().focus().toggleCodeBlock().run(),
    isActive: editor.value?.isActive('codeBlock'),
    disabled: false,
  },
  {
    label: 'Horizontal Rule',
    command: () => editor.value?.chain().focus().setHorizontalRule().run(),
    isActive: false,
    disabled: false,
  },
  {
    label: 'Hard Break',
    command: () => editor.value?.chain().focus().setHardBreak().run(),
    isActive: false,
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
