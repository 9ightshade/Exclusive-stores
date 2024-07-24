import React, { useEffect, useRef, useState } from 'react'
import Trash from '../icons/Trash';
import { setNewOffset, autoGrow, setZindex, bodyParser } from '../utils';
const NoteCard = ({ note }) => {
  // let position = JSON.parse(note.position); // this made position static

  const [position, setPosition] = useState(JSON.parse(note.position)) // makes position dynamic

  const [saving, setSaving] = useState(false); //saving with timer
  const keyUpTimer = useRef(null);

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

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);

  };


  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);

  // useref to auto grow the textarea
  const textAreaRef = useRef(null);

  //save data
  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    console.log("Save data called:", payload);
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };





  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);


  //function handles note save on key up with timer
  const handleKeyUp = async () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      console.log("Timer started");
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };


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
          saving && (
            <div className="card-saving">
              <Spinner color={colors.colorText} />
              <span style={{ color: colors.colorText }}>
                Saving...
              </span>
            </div>
          )
        
        }
      </div>


      <div className='card-body' >
        <textarea
          onKeyUp={handleKeyUp}
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
