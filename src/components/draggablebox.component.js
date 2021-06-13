import DraggableItem from './draggableitem.component';
import { useState,useRef } from 'react';
import Draggable from 'react-draggable';
import React from 'react';
import ReactDOM from 'react-dom';

function Draggablebox(props){  
    const [boxesList,setBoxesList] = useState([]);
    const [boxes,setBoxes] =useState(0);
    const [renderedBoxes,setRenderedBoxes]=useState([]);
    function addBox(){
        let newBox={ "id": boxes+1 , "name": boxes+1 };
        let nboxesList=boxesList.slice();
        nboxesList.push(newBox);
        setBoxes(boxes+1);
        setBoxesList(nboxesList);
        renderBoxes();
    }
    function renderBoxes(){
        const newRenderedBoxes = boxesList.map((box) =>
            <DraggableItem key={box.id} id={box.name} />
        );
        let temp="";let finalList="";
        for(let i=0;i<newRenderedBoxes.length;i++){
            if(temp==""){
                temp=newRenderedBoxes[i];
                finalList=temp;
            }else{
                finalList=React.cloneElement(newRenderedBoxes[i],{ children: temp});
                temp=finalList;
            }
        }
        setRenderedBoxes(finalList);



    }
    return (
        
        <div id="root">
              <button onClick={(e)=>{addBox()}}>add a box</button>
              <div id="window">
                  {

                        renderedBoxes


                  }
              </div>
        </div>
    );
}

export default Draggablebox;