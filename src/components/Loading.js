import { Spin } from 'antd'
import React from 'react'

function Loading(){
    return(
        <div style={{textAlign:'center',paddingTop:'20%'}}><Spin size="large" /></div>
    )
}

export default Loading;