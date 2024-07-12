'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

import { useTheme } from 'next-themes';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });
    return response.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        onChange={() => onChange(JSON.stringify(editor.document))}
      />
    </div>
  );
};

export default Editor;
