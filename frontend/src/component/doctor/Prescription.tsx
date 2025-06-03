import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';

const App = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write patient report here...</p>',
  });

  const handleSave = async () => {
    const htmlContent = editor.getHTML();
    console.log(htmlContent)
    const patientId = '12345';
    try {
      await axios.post('http://localhost:5000/api/report', {
        patientId,
        content: htmlContent,
      });
      alert('Report saved successfully!');
    } catch (err) {
      console.error('Error saving report:', err);
    }
  };

  if (!editor) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">📝 Patient Report Editor</h2>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3 justify-center">
        {[
          { label: 'Bold', action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
          { label: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
          { label: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
          { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
          { label: 'Bullet List', action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
          { label: 'Numbered List', action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
        ].map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.action}
            className={`px-3 py-1.5 text-sm rounded border transition ${
              btn.active
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="border rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400 bg-white shadow-sm">
        <EditorContent editor={editor} className='prose'/>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Save Report
      </button>

      {/* Live Preview */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">📄 Preview</h3>
        <div
          className="border rounded-md p-4 bg-gray-50 text-sm leading-relaxed space-y-1 prose prose-sm sm:prose lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
      </div>
    </div>
  );
};

export default App;


