import { useEffect, useState } from "react";
import axios from "axios";
import deleteIcon from "../assets/del.png";
import editIcon from "../assets/edit.png";
import Modal from "./Modal";
import Toast from "./Toast";
import Spinner from "./Spinner";

type Log = {
  id: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  text: string;
};

function Table() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  const [owner, setOwner] = useState("");
  const [logText, setLogText] = useState("");

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const logsPerPage = 10;

  const API = import.meta.env.VITE_API_URL ;


  useEffect(() => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setLogs(res.data))
      .catch(() => showToast("Failed to load logs", "error"))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = () => {
    setOwner("");
    setLogText("");
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEdit = (log: Log) => {
    setSelectedLog(log);
    setOwner(log.owner);
    setLogText(log.text);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (log: Log) => {
    setSelectedLog(log);
    setModalMode("delete");
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (modalMode === "add") {
        if (!owner.trim() || !logText.trim()) {
          showToast("Owner and Log Text cannot be empty!", "error");
          return;
        }
        const res = await axios.post(API, { owner, text: logText });
        setLogs([...logs, res.data]);
        showToast("Log added successfully!");
      }

      if (modalMode === "edit" && selectedLog) {
        if (!owner.trim() || !logText.trim()) {
          showToast("Owner and Log Text cannot be empty!", "error");
          return;
        }
        const res = await axios.put(`${API}/${selectedLog.id}`, { owner, text: logText });
        setLogs((prev) => prev.map((l) => (l.id === selectedLog.id ? res.data : l)));
        showToast("Log updated successfully!");
      }

      if (modalMode === "delete" && selectedLog) {
        await axios.delete(`${API}/${selectedLog.id}`);
        setLogs((prev) => prev.filter((l) => l.id !== selectedLog.id));
        showToast("Log deleted successfully!", "success");
      }
    } catch {
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setModalMode(null);
      setSelectedLog(null);
    }
  };

  const totalPages = Math.ceil(logs.length / logsPerPage) || 1;
  const paginatedLogs = logs.slice((page - 1) * logsPerPage, page * logsPerPage);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="p-4 sm:p-8">
      <Modal
        isOpen={isModalOpen}
        mode={modalMode || "add"}
        owner={owner}
        text={logText}
        onOwnerChange={setOwner}
        onTextChange={setLogText}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <div className="overflow-x-auto border border-gray-300 rounded-lg py-3 sm:py-10 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 px-4 sm:px-0 space-y-4 sm:space-y-0">
          <div>
            <h2 className="font-bold text-xl text-gray-700 mb-3">System logs</h2>
            <p className="font-normal text-sm text-gray-700">
              A list of all logs are here. You can create, read, update, and delete.
            </p>
          </div>
          <button
            role="button"
            onClick={handleAdd}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm py-2 px-4 rounded capitalize cursor-pointer focus:outline-none"
          >
            Add Log
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-left">
                  <th className="px-4 py-3 pl-0">Owner</th>
                  <th className="px-4 py-3">Log Text</th>
                  <th className="px-4 py-3 hidden md:table-cell">Created At</th>
                  <th className="px-4 py-3 hidden md:table-cell">Updated At</th>
                  <th className="px-4 py-3 pr-0"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-4 py-3 pl-0 text-sm">{log.owner}</td>
                    <td className="px-4 py-3 max-w-xs text-sm"><span className="line-clamp-2" title={log.text}>{log.text}</span></td>
                    <td className="px-4 py-3 text-gray-500 text-sm hidden md:table-cell">
                      {new Date(log.createdAt).toLocaleString().slice(0, -3)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm hidden md:table-cell">
                      {new Date(log.updatedAt).toLocaleString().slice(0, -3)}
                    </td>
                    <td className="px-4 py-3 pr-0">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          role="button"
                          onClick={() => handleEdit(log)}
                          disabled={loading}
                          className="hover:cursor-pointer hover:opacity-70 w-4 h-4 flex items-center justify-center disabled:opacity-50"
                        >
                          <img src={editIcon} alt="edit" />
                        </button>
                        <button
                          role="button"
                          onClick={() => handleDelete(log)}
                          disabled={loading}
                          className="hover:cursor-pointer hover:opacity-70 w-4 h-4 flex items-center justify-center disabled:opacity-50"
                        >
                          <img src={deleteIcon} alt="delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {logs.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                      No logs yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {logs.length > logsPerPage && (
              <div className="flex justify-end items-center gap-2 mt-4 px-4">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-sm"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  );
}

export default Table;
