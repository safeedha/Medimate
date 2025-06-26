import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { Editor } from '@tiptap/react';
import { useLocation, useNavigate } from 'react-router-dom';
import DoctorSidebar from './Docsidebar';
import { AddReport } from '../../api/doctorapi/report';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Prescription = () => {
  const location = useLocation();
  const { appointmentId, userId } = location.state || {};
  const navigate = useNavigate();

  const editor: Editor | null = useEditor({
    extensions: [StarterKit],
    content: '<p>Write patient report here...</p>',
  });

  useEffect(() => {
    if (!appointmentId || !userId) {
      navigate('/doctor/home');
    }
  }, [appointmentId, userId, navigate]);

  const handleSave = async () => {
    const htmlContent = editor?.getHTML();

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save this report?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!',
    });

    if (confirm.isConfirmed) {
      try {
        const result = await AddReport(htmlContent, appointmentId, userId);

        if (result === 'report added successfully') {
          toast.success('Report added');
          setTimeout(() => {
            navigate('/doctor/home');
          }, 2000);
        }
      } catch (err) {
        console.error('Error saving report:', err);
        Swal.fire('Error', 'There was a problem saving the report.', 'error');
      }
    }
  };

  if (!editor) return null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-indigo-100 flex">
      <DoctorSidebar />
      <Toaster />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-10 ml-40">
       <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-6">

  {/* Heading */}
  <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
    📝 Patient Report Editor
  </h2>

  {/* Toolbar */}
  <div className="flex flex-wrap justify-center gap-2">
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
        className={`px-3 py-1 text-xs font-medium rounded-full transition shadow-sm ${
          btn.active
            ? 'bg-blue-600 text-white border border-blue-600'
            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-blue-100'
        }`}
      >
        {btn.label}
      </button>
    ))}
  </div>

  {/* Editor */}
  <div className="border rounded-md p-4 bg-gray-50 shadow-inner min-h-[160px]">
    <EditorContent editor={editor} className="prose prose-sm max-w-none" />
  </div>

  {/* Save Button */}
  <div className="flex justify-center sm:justify-end">
    <button
      onClick={handleSave}
      className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 transition"
    >
      💾 Save
    </button>
  </div>
</div>


         
          {/* <div className="pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">📄 Preview</h3>
            <div
              className="border rounded-lg p-5 bg-gray-100 prose max-w-none shadow-sm"
              dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            />
          </div> */}

        </div>
      </div>
 
  );
};

export default Prescription;
