export function ErrorToast({message}) {
  const setToast = () => {
    document.getElementById("liveToast").setAttribute("class", document.getElementById("liveToast").getAttribute("class") === "toast show" ? "toast hide" : "toast show")
  };
  return (
    <div>
      <div class="position-fixed bottom-0 end-0 p-3 ">
        <div
          id="liveToast"
          class={message ? "toast show" : "toast hide"}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-autohide="false"
        >
          <div class="toast-header text-white bg-danger border-0" >
            <strong class="me-auto">Error</strong>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={setToast}
            ></button>
          </div>
          <div class="toast-body text-white bg-danger ">{message}</div>
        </div>
      </div>
    </div>
  );
}
