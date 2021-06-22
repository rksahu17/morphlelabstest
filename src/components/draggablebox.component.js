import DraggableItem from './draggableitem.component';
import { useState,useRef,useCallback,useEffect } from 'react';
import Draggable from 'react-draggable';
import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import '../App.css';
function Draggablebox(props){  
    const [parentFlag,setParentFlag] = useState(0);
    const [boxesList,setBoxesList] = useState([]);
    const [boxes,setBoxes] =useState(0);
    const [renderedBoxes,setRenderedBoxes]=useState([]);
    function addBox(flag){
      
        let nboxesList=boxesList.slice();
        let newBox={ "id": boxes+1 , "name": boxes+1,"position":{x:0,y:0}};
        if(nboxesList.length>0){
            
            let x=nboxesList[nboxesList.length-1].position.x;
            let y=nboxesList[nboxesList.length-1].position.y;
            nboxesList[nboxesList.length-1].position.x=0;
            nboxesList[nboxesList.length-1].position.y=0;
            newBox.position={x:x,y:y};
        }
        nboxesList.push(newBox);
        setParentFlag(flag);
        setBoxes(boxes+1);
        setBoxesList(nboxesList);
        
        console.log(boxesList);
       
    }

    useEffect(() => {
        if(parentFlag<=2){
            console.log("here"+parentFlag);
            renderBoxes();
        }
     }, [boxesList]);
     useEffect(() => {
        if(parentFlag<=2){
            console.log("here"+parentFlag);
            resetParentPosition();
        }
     }, [renderedBoxes]);
    
    function resetParentPosition(){
        console.log("resetParentPosition")
        let nboxesList=boxesList.slice();
        if(nboxesList.length>=1){
           
            // let childSpace=document.getElementById("childSpace"+nboxesList.length).getBoundingClientRect();
            // let x2=childSpace.top;
            // let y2=childSpace.left;
            // if(x1 != x1-(x2-x1) && y1 != y1-(y2-y1)){
            //     nboxesList[nboxesList.length-1].position.x=x1-(x2-x1);
            //     nboxesList[nboxesList.length-1].position.x=y1-(y2-y1);
            //     console.log(x1,x2,y1,y2);
            //     //setBoxesList(nboxesList); 
            // }
            let childSpace=document.getElementById("childSpace"+nboxesList.length).parentElement.getBoundingClientRect();
            let parentSpace=document.getElementById("childSpace"+nboxesList.length).parentElement.parentElement.
            getBoundingClientRect();
            let x1=parentSpace.x;
            let y1=parentSpace.y;
            let x2=childSpace.x;
            let y2=childSpace.y;
          
              
                nboxesList[nboxesList.length-1].position.x=nboxesList[nboxesList.length-1].position.x-(x2-x1);
                nboxesList[nboxesList.length-1].position.y=nboxesList[nboxesList.length-1].position.y-(y2-y1);
                if(nboxesList[nboxesList.length-1].position.x<0){
                    nboxesList[nboxesList.length-1].position.x=0;
                }
                if(nboxesList[nboxesList.length-1].position.y<0){
                    nboxesList[nboxesList.length-1].position.y=0;
                }
                console.log(nboxesList[nboxesList.length-1]);
                setParentFlag(parentFlag+1);
              setBoxesList(nboxesList);
          
            //console.log(x1,y1,x2,y2);
            
        }
       
    }
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
        setParentFlag(parentFlag+1);


    }
    
    return (
        
        <div  style={{height:"100vh",overflow:"auto"}}>
        <h1>Draggable</h1>
        <p>
        <button onClick={(e)=>{addBox(0)}}>add a box</button>
        </p>
        {/* <div className="box" style={{height: '520px', width: '100%', position: 'relative', overflow: 'auto', padding: '0'}}>
        <div style={{height: '520px', width: '100%',overflow: 'auto'}}> */}
            
                  {

                        renderedBoxes


                  }
        {/* </div>
        </div> */}
        </div>
    );
}

export default Draggablebox;