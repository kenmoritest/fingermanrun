
import React, { Component } from "react";
import './Fingerman.css'
import FingermanImage from './Fingerman.png'

class Fingerman extends Component {
    constructor(props)
    {
        super(props);
    }

    fingermanwidth = 100;
    fingermanheight = 56;
    defaulttop = (this.props.parentheight-this.fingermanheight);
    fingermannode = {width: this.fingermanwidth, height: this.fingermanheight, top: this.defaulttop, left: (this.props.parentwidth - this.fingermanwidth)};
    speed = this.props.speed;
    goTimer = 0;

    componentDidMount(){

    }

    speedup(){
        this.speed = (this.speed) * 1 + 10;
        this.go();
    }

    go(){
        if (this.goTimer !== 0)
        {
            clearInterval(this.goTimer);
        }

        const border = 50;
        var nextInterval = border / this.speed;
        var nexthop = 1;
        if (this.speed >= border)
        {
            nextInterval = 1;
            nexthop = this.speed / border;
        }

        this.goTimer = setInterval((e) => {
            let nextleft = (document.getElementById('fingermannode').style.left.replace("px", "") - nexthop);
            if (nextleft < 0)
            {
                nextleft = this.props.parentwidth - this.fingermanwidth;
            }
            document.getElementById('fingermannode').style.left = nextleft+"px";
        }, nextInterval);
    }


    jumpupinterval = 10;

    jump(){
        let timerid = setInterval((e)=>{
            let nexttop = (document.getElementById('fingermannode').style.top.replace("px", "") - 10);
            if (nexttop < 0)
            {
                nexttop = 0;
                clearInterval(this.state.jumptimerid);
                let jumptime = 1000 + (this.speed);    
                let timerid = setTimeout((e)=> {
                    let timerid = setInterval((e)=> {
                        let nexttop = (document.getElementById('fingermannode').style.top.replace("px", "") + 10);
                        if (nexttop >= this.defaulttop)
                        {
                            nexttop = this.defaulttop;
                            clearInterval(this.state.jumptimerid);
                        }
                        document.getElementById('fingermannode').style.top = nexttop + "px"
                    },this.jumpupinterval);
                    
                    this.setState({jumptimerid: timerid});
                },jumptime);
            }
            document.getElementById('fingermannode').style.top = nexttop + "px"
        }, this.jumpupinterval);
        this.setState({jumptimerid: timerid})
    
    }
    

    render(){
        return <div>Speed : {this.speed}<br></br><img id="fingermannode" src={FingermanImage} className="Fingerman" style={this.fingermannode}></img></div>

    }

}


export default class FingermanRun extends Component {
  constructor(props)
  {
      super(props);
      this.state = {jumptimerid : 0};
      this.child = React.createRef();
  }

  componentDidMount(){
      this.child.current.go();
  }

  areawidth = (this.props.width != null) ? this.props.width: screen.width;
  skyarea = {width: this.areawidth+"px", height: (this.props.height / 4 * 3)};
  groundarea = {width: this.areawidth+"px", height: (this.props.height / 4)};

  jumpAction(){
      this.child.current.jump();
      this.child.current.speedup();
  }

  render(){
    return <div onClick={(e) => this.jumpAction(e)}>
        <div id="sky" className="sky" style={this.skyarea}>
            <Fingerman ref={this.child} speed={this.props.speed} parentwidth={this.areawidth} parentheight={this.skyarea.height}/>
        </div>
        <div className="ground" style={this.groundarea}>
        </div>
    </div>
  }
}
