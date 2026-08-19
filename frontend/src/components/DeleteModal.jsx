function DeleteModal({
  open,
  onClose,
  onConfirm,
  deleting,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-7">

        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-5">
          🗑️
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Delete Student?
        </h2>

        <p className="text-gray-500 mt-2 leading-relaxed">
          This student record will be permanently deleted.
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-7">

          <button
            onClick={onClose}
            disabled={deleting}
            className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;