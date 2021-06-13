import Draggable from 'react-draggable';
import { useState,useRef } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

function DraggableItem(props){  

    return (
      
        <div>
            <Draggable>
            <div className="Box">
                {props.id}
                <div>
                    {props.children}
                </div>
            </div>
            </Draggable>
        </div>
    );
}

export default DraggableItem;