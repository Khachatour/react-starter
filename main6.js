class Draggable extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            width: '200px',
            height: '50px',
        }
        this.startX,
            this.startY,
            this.startWidth,
            this.startHeight;
    }

    // initDrag(e) {
    //     const selectedElement = document.defaultView.getComputedStyle(this.refs.container)
    //     let startX = e.clientX;
    //     let startY = e.clientY;
    //     let startWidth = parseInt(selectedElement.width, 10);
    //     let startHeight = parseInt(selectedElement.height, 10);
    //     console.log('###################')
    //     console.log(startX, startY, startWidth, startHeight)
    //     console.log('Init Dragging')
    //     // document.getElementsByClassName('child').addEventListener('mousemove', this.doDrag, false);
    //     // document.getElementsByClassName('child').addEventListener('mouseup', this.stopDrag, false);
    //     this.onMouseMove(e, startX, startY, startWidth, startHeight)

    // }


    // doDrag() {
    //     console.log('dragging')
    // }

    // handleDown(e) {
    //     // this.setState({
    //     //     width: '300px',
    //     //     mouseMove: !this.state.mouseMove
    //     // })
    //     this.initDrag(e)
    //     const selectedElement = document.defaultView.getComputedStyle(this.refs.container)
    // }

    // handleUp(e) {
    //     this.setState({
    //         width: '200px',
    //         mouseMove: !this.state.mouseMove
    //     })
    // }

    componentDidMount() {
        console.log('componenet mounted')
        window.addEventListener('mousedown', this.mouseDownEventFromWindow.bind(this), false);
    }

    mouseDownEventFromWindow(e) {
        console.log('====================================')
        console.log('Added listener on window')
        console.log('====================================')
        // this.startX = e.clientX;
        // this.startY = e.clientY;
        // this.startWidth = parseInt(document.defaultView.getComputedStyle(this.refs.container).width, 10);
        // this.startHeight = parseInt(document.defaultView.getComputedStyle(this.refs.container).height, 10);
        document.documentElement.addEventListener('mousemove', this.doDrag.bind(this), false);  
        document.documentElement.addEventListener('mouseup', this.stopDrag, false);

    }

    doDrag(e) {
        let p = document.querySelector('p')
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startWidth = parseInt(document.defaultView.getComputedStyle(this.refs.container).width, 10);
        this.startHeight = parseInt(document.defaultView.getComputedStyle(this.refs.container).height, 10);
        p.style.width = (this.startWidth + e.clientX - this.startX) + 'px'
        p.style.height = (this.startHeight + e.clientY - this.startY) + 'px'

        console.log(p.style.width, p.style.height)
    }

    // onMouseMove(e, startX, startY, startWidth, startHeight) {
    //     console.log(startX, startY, startWidth, startHeight)
    //     let newWidth = (startWidth + e.clientX - startX) + 'px'
    //     let newHeight = (startHeight + e.clientY - startY) + 'px'
    //     console.log(startHeight)
    //     console.log(newWidth)


    // this.setState({
    //     width: newWidth,
    //     height: newHeight
    // })
    // let x = e.clientX
    // let y = e.clientY
    // let coor = "Coordinates: (" + x + ")"
    // p.style.width = (startWidth + e.clientX - startX) + 'px';
    // p.style.height = (startHeight + e.clientY - startY) + 'px';

    // const incrementWidth = (e) => {
    //     if (!this.state.mouseMove) {
    //         return this.setState({
    //             width: this.state.width + e.clientX
    //         })


    //         this.incrementWidth(e)
    //     }
    // }

    // console.log('you are moving tour mouse' + coor)
    // }

    render() {
        return (
            <div>
                <p style={this.state} className='child' ref={'container'}>Tst</p>
            </div>
        )
    }
}


ReactDOM.render(
    <Draggable />,
    document.getElementById('root')
)





{/*<div style={this.state} className='child'
                    ref={'container'}
                    onMouseDown={e => this.handleDown(e)}
                    onMouseUp={e => this.handleUp(e)}
>
                    <p>TESasdT</p>
                </div>*/}