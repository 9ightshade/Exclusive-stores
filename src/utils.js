export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  }
};



  // function to grow textarea
export  function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = "auto"; // reset height
    current.style.height = current.scrollHeight + "px"; // set new height
  };



//active card should always be in front
export const setZindex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  })
  }