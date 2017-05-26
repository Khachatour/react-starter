function InputBrother(props) {
    const handleChanges = e => props.onInputChange(e.target.value)
    const inputValue = props.inputValue
    return (
        <input value={inputValue} onChange={handleChanges} />
    )
}

function InputSister(props) {
    const handleChanges = e => props.onInputChange(e.target.value)
    const inputValue = props.inputValue
    return (
        <input value={inputValue} onChange={handleChanges} />
    )
}

class Family extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: ''
        }
    }

    handleSisterChanges(inputValue) {
        this.setState({
            inputValue
        })
    }

    handleBrotherChanges(inputValue) {
        this.setState({
            inputValue
        })
    }

    render() {
        const inputValue = this.state.inputValue

        return (
            <div>
                <InputBrother inputValue={inputValue} onInputChange={(e) => this.handleBrotherChanges(e)} />
                <InputSister inputValue={inputValue} onInputChange={(e) => this.handleSisterChanges(e)} />
            </div>
        )
    }
}

ReactDOM.render(
    <Family />,
    document.getElementById('root')
)