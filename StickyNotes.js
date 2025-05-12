const form=document.querySelector("form");
const color=document.querySelector("input");
const textarea=document.querySelector("textarea");
const notesContainer=document.querySelector(".notesContainer");
const notesDiv=document.querySelector(".notesDiv"); 
const undo=document.querySelector("#undo");
const createdNote= [];
const deletedNote=[];

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  const newNode={
    text :textarea.value,
    color:color.value,
     timestamp:new Date().toLocaleString(),
     position:Date.now()
  } ;
  createdNote.push(newNode);
  displayNote();
  textarea.value="";
  textarea.focus();
   
});

function displayNote(){
  notesDiv.innerHTML="";
    const fragment=document.createDocumentFragment();
    
    createdNote.forEach((note)=>{
    
     const noteDiv=document.createElement("div");
     noteDiv.classList.add("note");
     noteDiv.style.backgroundColor= `${note.color}`;
    
     const text=document.createElement("p");
     
     text.innerText=note.text;
     const close=document.createElement("span");
     close.classList.add("close");
     close.innerHTML=`${"&times"}`;
     
     close.addEventListener("click",(e)=>{
     const idxd= createdNote.findIndex((n)=>{
       return note.position==n.position ;
      });
    
      deletedNote.push(...createdNote.splice(idxd,1));
      e.target.closest(".note").remove();
     });
     

     const timestamp=document.createElement("span");
     timestamp.classList.add("timestamp");
     timestamp.innerText=`${note.timestamp}`;
     

     noteDiv.append(text,close,timestamp);
     fragment.append(noteDiv);
    });
    notesDiv.append(fragment);
}

undo.addEventListener("click",(e)=>{
  const lastdn=deletedNote.pop();
  if(lastdn){ 
  createdNote.push(lastdn);
  createdNote.sort((a, b) => b.position - a.position);

  displayNote();

}
 
});
