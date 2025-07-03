
import { MessageSquare } from 'lucide-react'; // optional icon

function Nochatselected() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 px-6">
      <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Chat Selected</h2>
      <p className="text-sm">
        Select a doctor from the list to start a conversation. Your messages will appear here.
      </p>
    </div>
  );
}

export default Nochatselected;
