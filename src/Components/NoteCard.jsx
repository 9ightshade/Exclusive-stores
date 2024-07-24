import React, { useEffect, useRef, useState } from 'react'
import Trash from '../icons/Trash';
import { setNewOffset,autoGrow, setZindex } from '../utils';
const NoteCard = ({ note }) => {
  // let position = JSON.parse(note.position); // this made position static

  const [position, setPosition] = useState(JSON.parse(note.position)) // makes position dynamic

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);


  const mouseMove = (e) => {
    //cal move direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY
    };


    // mouseStartPos.x = e.clientX;
    // mouseStartPos.y = e.clientY

    // update start position for next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    // update card top and left position.
    setPosition(
      {
        x: cardRef.current.offsetLeft - mouseMoveDir.x,
        y: cardRef.current.offsetTop - mouseMoveDir.y,
      }
    );
  }



  // mouse move event and update
  const mouseDown = (e) => {
    setZindex(cardRef.current);
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp)
  };


  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

  // useref to auto grow the textarea
  const textAreaRef = useRef(null);




  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);


  return (
    <div
      className='card'
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}  >
      {
        body
      }

      <div className='card-header'
        onMouseDown={mouseDown}
        style={{
          backgroundColor: colors.colorHeader
        }} >
        {
          <Trash />
        }
      </div>


      <div className='card-body' >
        <textarea
          onFocus={() => {
            setZindex(cardRef.current)
          }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          ref={textAreaRef}
          style={{
            color: colors.colorText
          }}
          defaultValue={body}
        >

        </textarea>
      </div>

    </div>
  )
}

export default NoteCard
