function Timer(props) {

    return (
        <div style={{fontSize:25, height:"100%", display:"flex", flexDirection:"column", margin:"auto", textAlign:"center", justifyContent:"center"}}>
            {props.value}
        </div>

    )
}

export default Timer;