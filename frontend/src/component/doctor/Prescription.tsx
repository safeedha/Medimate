import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import type { Editor } from '@tiptap/react'
import { useLocation, useNavigate } from 'react-router-dom'
import DoctorSidebar from '../common/Docsidebar'
import { AddReport } from '../../api/doctorapi/report'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'

const Prescription = () => {
  const location = useLocation()
  const { appointmentId, userId } = location.state || {}
  const navigate = useNavigate()

  
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: '', duration: '', notes: '' },
  ])


  const editor: Editor | null = useEditor({
    extensions: [StarterKit],
    content: '<p>Write patient report here...</p>',
  })

  useEffect(() => {
    if (!appointmentId || !userId) {
      navigate('/doctor/home')
    }
  }, [appointmentId, userId, navigate])

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '', notes: '' }])
  }


  const removeMedicine = (idx: number) => {
    setMedicines(medicines.filter((_, i) => i !== idx))
  }


  const handleMedicineChange = (idx: number, field: string, value: string) => {
    setMedicines(medicines.map((med, i) =>
      i === idx ? { ...med, [field]: value } : med
    ))
  }

  
  const handleSave = async () => {
    const htmlContent = editor?.getHTML()

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save this report and prescription?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!',
    })

    if (confirm.isConfirmed) {
      try {
        
        const result = await AddReport(
          htmlContent as string,
          appointmentId,
          userId,
          medicines // send as array
        )
        if (result === 'report added successfully') {
          toast.success('Report & prescription added')
          setTimeout(() => navigate('/doctor/home'), 2000)
        } else {
          throw new Error(result)
        }
      } catch (err) {
        console.error('Error saving report:', err)
        Swal.fire('Error', 'There was a problem saving the report.', 'error')
      }
    }
  }

  if (!editor) return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DoctorSidebar />
      <Toaster />
      <div className="flex-1 ml-64 py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto rounded-xl p-6 md:p-10 space-y-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-indigo-700">📝 Patient Report & Prescription</h2>
        
          <div>
            <h3 className="text-lg font-bold text-indigo-700 mb-2">Prescribed Medicines</h3>
            <table className="w-full mb-2 border text-sm">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Dosage</th>
                  <th className="border p-2">Frequency</th>
                  <th className="border p-2">Duration</th>
                  <th className="border p-2">Notes</th>
                  <th className="border p-2" />
                </tr>
              </thead>
              <tbody>
                {medicines.map((med, idx) => (
                  <tr key={idx}>
                    <td className="border p-1">
                      <input
                        type="text"
                        value={med.name}
                        onChange={e => handleMedicineChange(idx, 'name', e.target.value)}
                        placeholder="e.g. Paracetamol"
                        className="w-full border rounded px-1 py-0.5"
                        required
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={e => handleMedicineChange(idx, 'dosage', e.target.value)}
                        placeholder="e.g. 500mg"
                        className="w-full border rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        type="text"
                        value={med.frequency}
                        onChange={e => handleMedicineChange(idx, 'frequency', e.target.value)}
                        placeholder="e.g. 1-0-1"
                        className="w-full border rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        type="text"
                        value={med.duration}
                        onChange={e => handleMedicineChange(idx, 'duration', e.target.value)}
                        placeholder="e.g. 5 days"
                        className="w-full border rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        type="text"
                        value={med.notes}
                        onChange={e => handleMedicineChange(idx, 'notes', e.target.value)}
                        placeholder="Instructions/notes"
                        className="w-full border rounded px-1 py-0.5"
                      />
                    </td>
                    <td className="border p-1 text-center">
                      {medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicine(idx)}
                          className="text-red-600 text-xs hover:underline"
                          title="Remove row"
                        >Remove</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addMedicine}
              className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold hover:bg-green-200 mb-2"
            >
              + Add Medicine
            </button>
          </div>

          {/* TipTap Rich Text Editor */}
          <div>
            <h3 className="text-lg font-bold text-indigo-700 mb-1">Doctor Notes / Report</h3>
            <div className="flex flex-wrap justify-center gap-2 border rounded-md p-3 bg-gray-50 shadow-sm">
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
                  className={`px-3 py-1 text-sm font-medium rounded-full border transition ${
                    btn.active
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div className="bg-gray-50 p-4 border rounded-md min-h-[200px] shadow-inner prose prose-sm max-w-none mt-3">
              <EditorContent
                editor={editor}
                className="focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md shadow transition"
            >
              💾 Save Report & Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prescription
