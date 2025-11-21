const ADD = document.getElementById("btn_add");
const DEL = document.getElementById("btn_del");
const NoteCanvas = document.getElementById("NoteCanvas");

ADD.addEventListener("click", () => {

    if (NoteCanvas.style.display != "flex")
    {
    NoteCanvas.style.display = "flex";
    }
    addNote();
});

DEL.addEventListener("click", () =>{

    //const lastCard = NoteCanvas.querySelector("div");
    //if (lastCard) lastCard.remove();

    //NoteCanvas.innerHTML = "";
    //document.getElementById("card").remove();
    if (selected_card) {
        selected_card.remove();
        selected_card = null;
    }

});


function addNote()
{
    const card = document.createElement("div");
    card.className = "relative p-2 gap-2 w-190 h-110 bg-amber-500 border-4 border-black flex flex-col ";
    
    card.tabIndex = 0;
    card.addEventListener("focusin", () => {
    card.classList.add("ring-4", "ring-blue-500", "z-10");
    selected_card = card;
    });

    card.addEventListener("focusout", () => {
        card.classList.remove("ring-4", "ring-blue-500", "z-10");
    });

    makeDraggable(card);

    const title_button_combiner = document.createElement("div");
    title_button_combiner.className = "flex flex-row gap-2";

    const input_title = document.createElement("input");
    input_title.className = "h-10 w-50 focus:w-120 hover:bg-orange-800 transition-all duration-300 bg-red-500 border-4 border-black";
    input_title.id = "title";
    input_title.type = "text";
    input_title.placeholder = "Your title";


    const text_area_container = document.createElement("div");
    text_area_container.className = "flex flex-col gap-2";
    //

    const text_area = document.createElement("textarea");
    text_area.className = "h-20 w-100 resize-none hover:bg-orange-800 transition-all duration-300 bg-red-500 border-4 border-black ";
    text_area.id = "text_area";
    text_area.placeholder = "Your text";

        text_area.addEventListener("focus", () => {
    text_area.classList.remove("h-20", "w-100");
    text_area.classList.add("h-67", "w-150");
    });

    text_area.addEventListener("blur", () => {
        text_area.classList.remove("h-67", "w-150");
        text_area.classList.add("h-20", "w-100");
    });

    text_area_container.append(text_area);

    card.append(input_title, text_area_container);
    NoteCanvas.appendChild(card);

    
}

function makeDraggable(card) {
    let offsetX = 0;
    let offsetY = 0;
    let isDown = false;

    
    card.style.position = "relative";
    card.style.cursor = "default";

    card.addEventListener("pointerdown", e => {
    isDown = true;
    card.setPointerCapture(e.pointerId);

    // Get current size and position
    const rect = card.getBoundingClientRect();

    card.style.width = rect.width + "px";
    card.style.height = rect.height + "px";
    

    
    card.style.position = "absolute";
    card.style.left = rect.left + "px";
    card.style.top = rect.top + "px";
    card.style.cursor = "grabbing";
    
    

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    });


    card.addEventListener("pointermove", e => {
        if (!isDown) return;

        card.style.left = (e.clientX - offsetX) + "px";
        card.style.top = (e.clientY - offsetY) + "px";
    });

    card.addEventListener("pointerup", e => {
        isDown = false;
        card.releasePointerCapture(e.pointerId);
        card.style.cursor = "grab";
    });
}

