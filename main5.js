class DataFromApi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: this.props.loading
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: !this.state.loading
            })
        },3000)
    }

    render() {
        const style = {
            fontSize: '3em'
        }
        if(this.state.loading) return <div><Loading/></div> 
        else return <div><span style={style}>Finished Loading</span></div>
    
    }
}




class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    componentWillMount() {
        this.loadingInterval = setInterval(() => {
            if (this.state.counter === 3) this.state.counter = 0
            this.setState({
                counter: this.state.counter + 1
            })
        }, 300)        
    }

    componentWillUnmount() {
        clearInterval(this.loadingInterval)
    }

    render() {
        const style = {
            fontSize: '3em'
        }
        return (
            <div>
                {
                    <p style={style}>
                        <span>Loading{'.'.repeat(this.state.counter)}</span>
                    </p>
                }
            </div>
        );
    }
}

ReactDOM.render(
    <DataFromApi loading={true}/>,
    document.getElementById('root')
)



