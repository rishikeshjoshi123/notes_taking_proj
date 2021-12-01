console.log('this is index.js .. welcome to project');
//display notes saved in storage in startup
DisplayNotes();

//  Save entered notes 
document.getElementById('add-note-button').addEventListener('click', function() {
    let notes_str = localStorage.getItem('notes');
    let titles_str = localStorage.getItem('titles');

    let notes_obj;
    let titles_obj;
    if (notes_str == null) {
        notes_obj = [];
        titles_obj = [];
    } else {
        // converted string to array for i/o purpose
        notes_obj = JSON.parse(notes_str);
        titles_obj = JSON.parse(titles_str);
    }

    //both title and note box are empty
    if (document.getElementById('note-area').value == '' && document.getElementById('title-area').value == '') {
        document.getElementById('note-area').value = ""; // clearing note text area 
        document.getElementById('title-area').value = ""; //clearing title area
        return;
    }
    notes_obj.push(document.getElementById('note-area').value); // push text value in notes-object
    titles_obj.push(document.getElementById('title-area').value); // push title value in title-obj

    document.getElementById('note-area').value = ""; // clearing note text area 
    document.getElementById('title-area').value = ""; //clearing title area

    localStorage.setItem('notes', JSON.stringify(notes_obj));
    localStorage.setItem('titles', JSON.stringify(titles_obj));


    DisplayNotes();
});

//  show saved notes form storage
function DisplayNotes() {
    let notes_str = localStorage.getItem('notes');
    let titles_str = localStorage.getItem('titles');

    let notes_obj;
    let titles_obj;
    if (notes_str == null) {
        notes_obj = [];
        titles_obj = [];
    } else {
        notes_obj = JSON.parse(notes_str);
        titles_obj = JSON.parse(titles_str);
    }

    show_notes(notes_obj, titles_obj);
}


// pressed delete note button
function DeleteNote(index) {
    // console.log('pressed delete button of ' + index + ' note');

    let notes_str = localStorage.getItem('notes');
    let titles_str = localStorage.getItem('titles');

    let notes_obj = JSON.parse(notes_str);
    let titles_obj = JSON.parse(titles_str);

    for (let i = index; i < notes_obj.length - 1; ++i) {
        notes_obj[i] = notes_obj[i + 1];
        titles_obj[i] = titles_obj[i + 1];
    }
    if (notes_obj.length <= 1) {
        notes_obj = [];
        titles_obj = [];
    } else {
        notes_obj.length = notes_obj.length - 1;
        titles_obj.length = titles_obj.length - 1;
    }
    // localStorage.clear();

    localStorage.setItem('notes', JSON.stringify(notes_obj));
    localStorage.setItem('titles', JSON.stringify(titles_obj));

    DisplayNotes();
}

// search box functionality
function search_and_display() {
    let search_term = document.getElementById('search-box').value;
    console.log(search_term);

    if (search_term == '') { // if search box is empty
        DisplayNotes();
        return;
    }
    let notes_obj;
    let titles_obj;
    if (localStorage.getItem('notes') != null) {
        notes_obj = JSON.parse(localStorage.getItem('notes'));
        titles_obj = JSON.parse(localStorage.getItem('titles'));
    }

    console.log('length of notes obj is :' + notes_obj.length + ' and titles obj is :' + titles_obj.length);

    let new_notes = [];
    let new_titles = [];
    for (let i = 0; i < notes_obj.length; ++i) {
        let e_note = notes_obj[i];
        let e_title = titles_obj[i];

        if (e_note.includes(search_term) == true || e_title.includes(search_term) == true) {
            new_notes.push(e_note);
            new_titles.push(e_title);
        }
    }


    show_notes(new_notes, new_titles);

}


//reusable function
// display notes by adding text to inner html of display section of screen
function show_notes(notes, titles) {
    let html = '';
    for (let index = 0; index < notes.length; index++) {
        const e_note = notes[index];

        let e_title = titles[index];
        if (e_title == "") e_title = "No title";
        html += `     <div class="note" id="${index}">
        <h3 class="note-title">${e_title}</h3>
        <p class="note-text">${e_note}</p>
        <button onclick="DeleteNote(${index})" class="btn" id="delete-btn">Delete Note</button>
    </div>`;
    }

    if (notes.length != 0) {
        document.getElementById('empty-storage-msg').style.display = 'none';
        document.getElementById('display-area').style.display = 'flex';
        document.getElementById('display-area').innerHTML = html;
    } else {
        document.getElementById('empty-storage-msg').style.display = 'flex';
        document.getElementById('display-area').style.display = 'none';
    }

}