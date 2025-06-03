
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {useLocation,useNavigate} from 'react-router-dom'
import DoctorSidebar from './Docsidebar';
import { AddReport} from '../../api/doctorapi/report'
import {useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Prescription = () => {
    const location = useLocation();
  const { appointmentId, userId } = location.state;
  const navigate=useNavigate()
  const editor:any = useEditor({
    extensions: [StarterKit],
    content: '<p>Write patient report here...</p>',
  });
   useEffect(()=>{
    if(!appointmentId||!userId)
    {
      navigate('/doctor/home')
    }
   },[])
    
const handleSave = async () => {
  const htmlContent = editor.getHTML();

  const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to save this report?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, save it!'
  });

  if (confirm.isConfirmed) {
    try {
      const result = await AddReport(htmlContent, appointmentId, userId);

      if (result === 'report added successfully') {
        toast.success("Report added");
        setTimeout(() => {
          navigate('/doctor/home');
        }, 2000);
      }

      console.log(result);
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
    <Toaster/>
    <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
          📝 Patient Report Editor
        </h2>

        <div className="flex flex-wrap gap-2 mb-3 justify-center">
          {/* Button toolbar */}
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

        <div className="border rounded-md px-4 py-3 bg-white shadow-sm">
          <EditorContent editor={editor} className="prose" />
        </div>

        <button
          onClick={handleSave}
          className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Save Report
        </button>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">📄 Preview</h3>
          <div
            className="border rounded-md p-4 bg-gray-50 prose"
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
          />
        </div>
      </div>
    </div>
  </div>
);

};

export default Prescription;


