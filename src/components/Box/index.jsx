import './style.css'

function Box({children}) {
    return (
        <div className="box">
            {children}
        </div>
    )
}

export default Box
