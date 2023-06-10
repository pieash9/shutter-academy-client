/* eslint-disable react/prop-types */


const FeedbackModal = ({my_modal_3}) => {
    return (
        <dialog id={my_modal_3} className="modal">
          <div className="modal-box">
            <button
              onClick={() => window.my_modal_3.close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
    );
};

export default FeedbackModal;