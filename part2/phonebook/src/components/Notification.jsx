const Notification = ({ isSuccess, message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={isSuccess ? 'success' : 'fail'}>
            {message}
        </div>
    )
}

export default Notification