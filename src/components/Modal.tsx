import warning from "../assets/warning.png"

interface ModalProps {
    isOpen: boolean;
    mode: "add" | "edit" | "delete";
    owner?: string;
    text?: string;
    onOwnerChange?: (val: string) => void;
    onTextChange?: (val: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

function Modal({
    isOpen,
    mode,
    owner = "",
    text = "",
    onOwnerChange,
    onTextChange,
    onClose,
    onSubmit,
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white w-5/6 sm:w-96 p-6 rounded shadow-lg transition transform scale-100 animate-fadeIn">
                <h2 className="text-lg font-bold mb-4">
                    {mode === "add" && "Add New Log"}
                    {mode === "edit" && "Edit Log"}
                    {mode === "delete" && "Delete Log"}
                </h2>

                {mode === "delete" ? (
                    <div className="flex items-center space-x-3">
                        <img src={warning} alt="warning" className="w-10" />
                        <p className="text-sm text-gray-700">
                            Do you really want to delete this log? This action cannot be undone!
                        </p>
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            value={owner}
                            onChange={(e) => onOwnerChange && onOwnerChange(e.target.value)}
                            placeholder="Owner name..."
                            className="w-full border mb-3 border-gray-400 px-2 py-1 rounded"
                        />
                        <textarea
                            value={text}
                            onChange={(e) => onTextChange && onTextChange(e.target.value)}
                            placeholder="Log text..."
                            className="w-full h-24 border border-gray-400 px-2 py-1 rounded"
                        />
                    </div>
                )}

                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        className="bg-gray-500 text-white text-sm px-3 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className={`text-white text-sm px-3 py-2 rounded ${mode === "delete" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        onClick={onSubmit}
                    >
                        {mode === "delete" ? "Delete" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
