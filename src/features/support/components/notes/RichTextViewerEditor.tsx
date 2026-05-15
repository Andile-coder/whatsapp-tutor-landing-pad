import { useEffect } from "react";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

type RichTextViewerEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  placeholder?: string;
  minHeight?: number;
};

const RichTextViewerEditor = ({
  value,
  onChange,
  editable = true,
  placeholder = "Write your note...",
  minHeight = 260,
}: RichTextViewerEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editable,
    onUpdate: ({ editor: activeEditor }) => {
      onChange?.(activeEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "mosa-rich-editor",
      },
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  if (!editor) {
    return null;
  }

  return (
    <Box sx={{ border: "1px solid #e4e7ec", bgcolor: "#ffffff" }}>
      {editable ? (
        <Stack direction="row" spacing={0.5} sx={{ px: 1, py: 1, borderBottom: "1px solid #eef2f6", flexWrap: "wrap" }}>
          <ToggleButtonGroup size="small" exclusive={false}>
            <ToggleButton
              value="bold"
              selected={editor.isActive("bold")}
              onChange={() => editor.chain().focus().toggleBold().run()}
            >
              B
            </ToggleButton>
            <ToggleButton
              value="italic"
              selected={editor.isActive("italic")}
              onChange={() => editor.chain().focus().toggleItalic().run()}
            >
              I
            </ToggleButton>
            <ToggleButton
              value="bulletList"
              selected={editor.isActive("bulletList")}
              onChange={() => editor.chain().focus().toggleBulletList().run()}
            >
              •
            </ToggleButton>
            <ToggleButton
              value="orderedList"
              selected={editor.isActive("orderedList")}
              onChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
              1.
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      ) : null}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          minHeight,
          "& .mosa-rich-editor": {
            minHeight,
            outline: "none",
            color: "#101828",
            fontSize: 14,
            lineHeight: 1.7,
          },
          "& .mosa-rich-editor p.is-editor-empty:first-of-type::before": {
            color: "#98a2b3",
            content: "attr(data-placeholder)",
            float: "left",
            height: 0,
            pointerEvents: "none",
          },
          "& .mosa-rich-editor ul, & .mosa-rich-editor ol": {
            paddingLeft: "1.25rem",
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default RichTextViewerEditor;
