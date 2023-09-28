const handleDisconnect = () => {
    dispatch(getActionDisconnect());
  };



<div className="login-form">
      {isConnected ? (
        <div className="login-form-logged">
          <p className="login-form-message">{loggedMessage}</p>
          <button
            type="button"
            className="login-form-button"
            onClick={handleDisconnect}
          >
            Logout
          </button>
        </div>
      ) : (