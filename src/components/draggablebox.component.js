import DraggableItem from './draggableitem.component';
import { useState,useRef,useCallback,useEffect } from 'react';
import Draggable from 'react-draggable';
import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import '../App.css';
function Draggablebox(props){  
    
    const [boxesList,setBoxesList] = useState([]);
    const [boxes,setBoxes] =useState(0);
    const [renderedBoxes,setRenderedBoxes]=useState([]);
    function addBox(){
       
        let nboxesList=boxesList.slice();
        let newBox={ "id": boxes+1 , "name": boxes+1,"position":{x:0,y:0}};
        if(nboxesList.length>0){
            let x=nboxesList[nboxesList.length-1].position.x - 0.5*nboxesList[nboxesList.length-1].position.x;
            let y=nboxesList[nboxesList.length-1].position.y - 0.5*nboxesList[nboxesList.length-1].position.y;

            newBox.position=nboxesList[nboxesList.length-1].position;
        }
        nboxesList.push(newBox);

        setBoxes(boxes+1);
        setBoxesList(nboxesList)
        console.log(boxesList);
       
    }

    useEffect(() => {
        renderBoxes();
     }, [boxesList]);
    function renderBoxes(){
       
        const newRenderedBoxes = boxesList.map((box) =>
            <DraggableItem key={box.id} id={box.name} position={box.position} boxesList={boxesList} setBoxesList={setBoxesList}/>
        );
        let temp="";let finalList="";
        for(let i=0;i<newRenderedBoxes.length;i++){
            if(temp==""){
                temp=newRenderedBoxes[i];
                finalList=temp;
            }else{
                finalList=React.cloneElement(newRenderedBoxes[i],{children: temp});
                temp=finalList;
               
            }
        }
        setRenderedBoxes(finalList);



    }
    return (
        
        <div>
        <h1>Draggable</h1>
        <p>
        <button onClick={(e)=>{addBox()}}>add a box</button>
        </p>
        <div className="box" style={{height: '1000px', width: '100%', position: 'relative', overflow: 'none', padding: '0'}}>
        <div style={{height: '1000px', width: '100%', padding: '5px'}}>
            
                  {

                        renderedBoxes


                  }
        </div>
        </div>
        </div>
    );
}

export default Draggablebox;