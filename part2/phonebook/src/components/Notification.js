const Notification = ({ message, messageType }) => {
    if(message === undefined) {
        return null
    } else {
        return(
            <div className={messageType}>
                {message}
            </div>
        )
    }
}

export default Notification