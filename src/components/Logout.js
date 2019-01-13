import React from 'react'


class Logout extends React.Component {

    componentDidMount(){
        localStorage.setItem('token', 'undefined')
    }

    render(){
        return <p>logout</p>
    }
}

export default Logout;