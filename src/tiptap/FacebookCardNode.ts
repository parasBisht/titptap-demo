// src/tiptap/FacebookEmbedNode.ts
import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import FacebookCard from '../components/FacebookCard.vue'

export const FacebookCardNode = Node.create({
  name: 'facebookCard',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'facebook-card' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['facebook-card', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(FacebookCard)
  },
})
