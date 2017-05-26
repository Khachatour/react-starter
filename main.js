function FilterItem({ item, index }) {
  const handleInputFilterChanges = e => console.log('test')
  return (
    <div>
      <input value={item} onChange={e => handleInputFilterChanges(e)} />
    </div>
  )
}

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputShow: false
    }
  }

  deleteItem(index) {
    this.setState({
      valueArr: this.props.listItem.splice(index, 1)
    })
  }

  editItem(index) {
    this.setState({
      inputShow: !this.state.inputShow,
      index
    })
  }

  render() {
    /**
     * this section is not finished yet
     * trying to edit with input field activating
     */
    if (this.state.inputShow) {
      return (
        <div>
          {this.props.listItem.map((item, index) =>
            <li key={index} ref={index => {
              if (index !== this.state.index) {
                {/*console.log('if section')*/ }
                {/*return <input value={this.props.listItem[index]} />*/ }
                return this.props.listItem.filter(item =>
                  <input value={this.props.listItem[index]} />
                )
              } else {
                console.log('else section')
              }
            }}>
              {item}
              <button onClick={e => this.deleteItem(index)}>Delete</button>
              <button onClick={e => this.editItem(index)}>Edit</button>
            </li>
          )}
        </div>
      )
    } else {
      return (
        <div>
          {this.props.listItem.map((item, index) =>
            <li key={index}>
              {item}
              <button onClick={e => this.deleteItem(index)}>Delete</button>
              <button onClick={e => this.editItem(index)}>Edit</button>
            </li>
          )}
        </div>
      )
    }
  }
}

class Welcome extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      valueArr: []
    }
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({
        input: e.target.value
      })
      this.state.valueArr.push(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    return (
      <div>
        <input
          onKeyPress={e => this._handleKeyPress(e)}
        />
        <ListItem
          listItem={this.state.valueArr}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <Welcome />,
  document.getElementById('root')
)
