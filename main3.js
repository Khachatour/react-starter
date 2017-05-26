class Text extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            content: 'TEST'
        }
    }

    handleEvent(e) {
        this.setState({
            show: true,
            content: e.target.textContent
        })
    }

    changeValue(e) {
        this.setState({
            content: e.target.value
        })
    }

    enterValueChange(e) {
        if (e.key === 'Enter') {
            this.setState({
                show: !this.state.show
            })
        }
    }


    render() {
        if (this.state.show) {
            return (
                <div>
                    <input value={this.state.content} onChange={e => this.changeValue(e)} onKeyPress={e => this.enterValueChange(e)} />
                </div>
            )
        } else {
            return (
                <div>
                    <p onClick={e => this.handleEvent(e)}>{this.state.content}</p>
                </div>
            )
        }
    }
}

ReactDOM.render(
    <Text />,
    document.getElementById('root')
)