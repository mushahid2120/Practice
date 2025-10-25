import { Component } from "react";

class Counter extends Component{
    constructor(props){
        super(props)
        this.state={
            count: 0
        }
        console.log('Constructor')
    }

    componentDidMount(){
        console.log('ComponentDidMount')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    render(){
            const {name}=this.props
            const {count}=this.state
            console.log('render')
        return (
            <>
                <h1>{name}</h1>
                <div className="flex flex-row gap-20 text-5xl justify-center">
                    <button className="bg-slate-300 px-6 rounded-md cursor-pointer"
                        onClick={()=>this.setState({count: count-1})}
                    >-</button>
                    <h2>{count}</h2>
                    <button className="bg-slate-300 px-6 rounded-md cursor-pointer"
                        onClick={()=>this.setState({count: count+1})}
                    >+</button>
                </div>
            </>
        )
    }

}

export default Counter