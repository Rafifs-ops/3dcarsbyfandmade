<template>
  <div class="wysiwyg-wrapper rounded-xl border border-white/15 bg-black/40 overflow-hidden focus-within:border-lightning-yellow/60 transition-colors">
    <!-- Toolbar -->
    <div class="toolbar flex flex-wrap items-center gap-1 p-2 bg-carbon-dark/90 border-b border-white/10 text-xs font-chakra">
      
      <!-- Headings Dropdown / Buttons -->
      <button 
        type="button" 
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="[btnBase, editor?.isActive('heading', { level: 1 }) ? btnActive : btnInactive]"
        title="Heading 1"
      >
        <span class="font-bold font-russo">H1</span>
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="[btnBase, editor?.isActive('heading', { level: 2 }) ? btnActive : btnInactive]"
        title="Heading 2"
      >
        <span class="font-bold font-russo">H2</span>
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="[btnBase, editor?.isActive('heading', { level: 3 }) ? btnActive : btnInactive]"
        title="Heading 3"
      >
        <span class="font-bold font-russo">H3</span>
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().setParagraph().run()"
        :class="[btnBase, editor?.isActive('paragraph') && !editor?.isActive('heading') ? btnActive : btnInactive]"
        title="Paragraph"
      >
        <BootstrapIcon name="paragraph" />
      </button>

      <div class="w-px h-5 bg-white/15 mx-1" />

      <!-- Text formatting -->
      <button 
        type="button" 
        @click="editor?.chain().focus().toggleBold().run()"
        :class="[btnBase, editor?.isActive('bold') ? btnActive : btnInactive]"
        title="Bold (Ctrl+B)"
      >
        <BootstrapIcon name="type-bold" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().toggleItalic().run()"
        :class="[btnBase, editor?.isActive('italic') ? btnActive : btnInactive]"
        title="Italic (Ctrl+I)"
      >
        <BootstrapIcon name="type-italic" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().toggleUnderline().run()"
        :class="[btnBase, editor?.isActive('underline') ? btnActive : btnInactive]"
        title="Underline (Ctrl+U)"
      >
        <BootstrapIcon name="type-underline" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().toggleStrike().run()"
        :class="[btnBase, editor?.isActive('strike') ? btnActive : btnInactive]"
        title="Strikethrough"
      >
        <BootstrapIcon name="type-strikethrough" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().toggleCode().run()"
        :class="[btnBase, editor?.isActive('code') ? btnActive : btnInactive]"
        title="Inline Code"
      >
        <BootstrapIcon name="code" />
      </button>

      <div class="w-px h-5 bg-white/15 mx-1" />

      <!-- Lists -->
      <button 
        type="button" 
        @click="editor?.chain().focus().toggleBulletList().run()"
        :class="[btnBase, editor?.isActive('bulletList') ? btnActive : btnInactive]"
        title="Bullet List"
      >
        <BootstrapIcon name="list-ul" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().toggleOrderedList().run()"
        :class="[btnBase, editor?.isActive('orderedList') ? btnActive : btnInactive]"
        title="Numbered List"
      >
        <BootstrapIcon name="list-ol" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().toggleBlockquote().run()"
        :class="[btnBase, editor?.isActive('blockquote') ? btnActive : btnInactive]"
        title="Blockquote"
      >
        <BootstrapIcon name="quote" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().setHorizontalRule().run()"
        :class="[btnBase, btnInactive]"
        title="Horizontal Line"
      >
        <BootstrapIcon name="hr" />
      </button>

      <div class="w-px h-5 bg-white/15 mx-1" />

      <!-- Media & Links -->
      <button 
        type="button" 
        @click="promptLink"
        :class="[btnBase, editor?.isActive('link') ? btnActive : btnInactive]"
        title="Insert Link"
      >
        <BootstrapIcon name="link-45deg" />
      </button>

      <button 
        type="button" 
        @click="promptImage"
        :class="[btnBase, btnInactive]"
        title="Insert Image URL"
      >
        <BootstrapIcon name="image" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().unsetAllMarks().clearNodes().run()"
        :class="[btnBase, btnInactive]"
        title="Clear Formatting"
      >
        <BootstrapIcon name="eraser" />
      </button>

      <div class="w-px h-5 bg-white/15 mx-1" />

      <!-- Undo / Redo -->
      <button 
        type="button" 
        @click="editor?.chain().focus().undo().run()"
        :disabled="!editor?.can().undo()"
        :class="[btnBase, btnInactive, !editor?.can().undo() && 'opacity-30 cursor-not-allowed']"
        title="Undo"
      >
        <BootstrapIcon name="arrow-counterclockwise" />
      </button>

      <button 
        type="button" 
        @click="editor?.chain().focus().redo().run()"
        :disabled="!editor?.can().redo()"
        :class="[btnBase, btnInactive, !editor?.can().redo() && 'opacity-30 cursor-not-allowed']"
        title="Redo"
      >
        <BootstrapIcon name="arrow-clockwise" />
      </button>

      <!-- View HTML toggle -->
      <button
        type="button"
        @click="isHtmlMode = !isHtmlMode"
        :class="[btnBase, isHtmlMode ? btnActive : btnInactive, 'ml-auto text-[11px] font-mono']"
        title="Toggle HTML Source"
      >
        &lt;/&gt; HTML
      </button>
    </div>

    <!-- Visual Editor Area -->
    <div v-if="!isHtmlMode" class="editor-content-box p-4 min-h-[220px] max-h-[500px] overflow-y-auto text-pure-white font-inter text-sm leading-relaxed">
      <EditorContent :editor="editor" />
    </div>

    <!-- Raw HTML Mode Area -->
    <div v-else class="p-4 bg-black/80">
      <textarea
        :value="modelValue"
        @input="onRawHtmlInput"
        rows="10"
        class="w-full bg-transparent font-mono text-xs text-lightning-yellow focus:outline-none resize-y"
        placeholder="Edit raw HTML code..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
}>(), {
  modelValue: '',
  placeholder: 'Tulis konten lengkap di sini...'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isHtmlMode = ref(false)

const btnBase = 'p-2 rounded hover:bg-white/10 transition-colors flex items-center justify-center min-w-[28px] h-7'
const btnActive = 'bg-rust-red/80 text-white font-bold shadow-sm'
const btnInactive = 'text-muted-silver hover:text-white'

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3]
      }
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-lightning-yellow hover:underline cursor-pointer',
        target: '_blank'
      }
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-xl border border-white/10 my-4 shadow-lg'
      }
    })
  ],
  onUpdate: () => {
    if (editor.value) {
      const html = editor.value.getHTML()
      emit('update:modelValue', html)
    }
  }
})

// Watch modelValue external updates
watch(() => props.modelValue, (newVal) => {
  if (editor.value && editor.value.getHTML() !== newVal) {
    editor.value.commands.setContent(newVal || '', { emitUpdate: false })
  }
})

const onRawHtmlInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  if (editor.value) {
    editor.value.commands.setContent(target.value, { emitUpdate: false })
  }
}

const promptLink = () => {
  if (!editor.value) return
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('Masukkan URL Link (misal: https://example.com):', previousUrl)

  if (url === null) return
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const promptImage = () => {
  if (!editor.value) return
  const url = window.prompt('Masukkan URL Gambar (misal: https://.../image.jpg):')
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<style>
/* Tiptap editor typography styling */
.editor-content-box .ProseMirror {
  outline: none;
  min-height: 180px;
}

.editor-content-box .ProseMirror p {
  margin-bottom: 0.85em;
  color: #CBD5E1;
}

.editor-content-box .ProseMirror h1 {
  font-family: 'Russo One', sans-serif;
  font-size: 1.65rem;
  color: #FFFFFF;
  margin-top: 1.2em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.3em;
}

.editor-content-box .ProseMirror h2 {
  font-family: 'Russo One', sans-serif;
  font-size: 1.35rem;
  color: #FFC700;
  margin-top: 1em;
  margin-bottom: 0.4em;
}

.editor-content-box .ProseMirror h3 {
  font-family: 'Chakra Petch', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  color: #E11D2A;
  margin-top: 0.9em;
  margin-bottom: 0.3em;
}

.editor-content-box .ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 0.85em;
  color: #CBD5E1;
}

.editor-content-box .ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 0.85em;
  color: #CBD5E1;
}

.editor-content-box .ProseMirror li {
  margin-bottom: 0.25em;
}

.editor-content-box .ProseMirror blockquote {
  border-left: 3px solid #E11D2A;
  padding-left: 1rem;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0.85em;
  margin-bottom: 0.85em;
  font-style: italic;
  color: #94A3B8;
  background: rgba(225, 29, 42, 0.05);
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  border-radius: 0 6px 6px 0;
}

.editor-content-box .ProseMirror code {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85em;
  color: #FFC700;
}

.editor-content-box .ProseMirror hr {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin: 1.5em 0;
}

.editor-content-box .ProseMirror img {
  max-width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 1em 0;
}
</style>
