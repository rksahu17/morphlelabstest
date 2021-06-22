import Draggable from 'react-draggable';
import { useState,useRef } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import '../App.css';
function DraggableItem(props){  
    const [disabled,setDisabled] = useState(true);
    const [position,setPosition] = useState(props.position);
    const onStart = () => {
        console.log("started");
      };
    
    const onStop = () => {
        console.log("stoped")
        let nboxesList=props.boxesList.slice();
        nboxesList[props.id-1].position=position;
        props.setBoxesList(nboxesList);
        console.log(nboxesList);
        
      };
    const enableDrag = (e)=>{
        console.log("diabled")

        setDisabled(false);
    }
    const disableDrag = (e,ui)=>{
       

        // props.setLatestPosition(props.id,e.position);
       
        setDisabled(true);
       
    }
    const handleDrag = (e, ui) => {
        const {x, y} = position;
        setPosition(
          {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        );
       
      };
    const dragHandlers = {onStart: onStart,onDrag: handleDrag, onStop: onStop};
    return (
  
       
      
          <Draggable bounds="parent" handle="strong" disabled={disabled} {...dragHandlers} defaultPosition={props.position}>
            <div className="box no-cursor" >
    <div onMouseEnter={(e)=>enableDrag(e)} onMouseLeave={(e)=>disableDrag(e)}><strong className="cursor">Drag here {props.id}</strong></div>
              <div style={{ width: props.id*100+100+"px",height:props.id*100+100+"px", position: 'relative'}}>
                <div id={"childSpace"+props.id} style={{ width: '100%',height:'100%',overflow: 'auto',}}>
                    
                        {

                                props.children


                        }
                </div>
            </div>
            </div>
           
          </Draggable>
            
       
        
    );
}

export default DraggableItem;