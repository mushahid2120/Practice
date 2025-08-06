
const form = document.querySelector('form')
const hori_position = document.querySelector('#horizontal-position');
const ver_position = document.querySelector('#vertical-position');
const type_of_message = document.querySelector("#type");

const input_message = document.querySelector('.input-field');
const duration = document.querySelector('.duration-container>input');
const duration_caption = document.querySelector('.sec');

const show_toast_button = document.querySelector('button');

const all_toast_container = document.querySelector('.all-popup-container');

const top_left_container = document.querySelector('.top-left-container');
const top_right_container = document.querySelector('.top-right-container');
const bottom_left_container = document.querySelector('.bottom-left-container');
const bottom_right_container = document.querySelector('.bottom-right-container');


let count = 0;

input_message.addEventListener('input', function(e) {
    if (e.target.value === '')
        show_toast_button.disabled = true;
    else
        show_toast_button.disabled = false;


});

duration.addEventListener('input', function(e) {

    duration_caption.innerHTML = e.target.value + 's';
})


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const new_created_Element = creatingElement();


    new_created_Element.children[0].classList.add(type_of_message.value);


    new_created_Element.children[0].innerHTML = input_message.value;

    showing_messagess(new_created_Element);
    new_created_Element._timeout = setTimeout(remove_messagess, parseInt(duration.value) * 1000, new_created_Element);
    console.log(new_created_Element.children[0].innerHTML + "  having this timeout ref=  "+ new_created_Element._timeout)

})



all_toast_container.addEventListener('click', function(e) {
    if (e.target.classList.value === 'cross-icon') {
        setTimeout(remove_messagess,100,e.target.parentElement)
        // remove_messagess(e.target.parentElement);
        clearTimeout(e.target.parentElement._timeout);
        console.log(e.target.parentElement.children[0].innerHTML + " time out reference when cross clicked " + e.target._timeout)
    }

})


function creatingElement() {
    const created_box = document.createElement('div');
    created_box.classList.add('toast-pop-up');
    const created_message = document.createElement('span');
    const cross_icon = document.createElement('span');
    cross_icon.innerHTML = "✕";
    cross_icon.classList.add('cross-icon');
    created_box.append(created_message, cross_icon);
    return created_box;
}



function showing_messagess(display_element) {
    let parentContainer;
    if (ver_position.value === 'top') {
        if (hori_position.value === 'left') {
            parentContainer = top_left_container;
            display_element.classList.add('opening-from-left');
        } else {
            parentContainer = top_right_container;
            display_element.classList.add('opening-from-right');
        }
    } else {
        if (hori_position.value === 'left') {
            parentContainer = bottom_left_container;
            display_element.classList.add('opening-from-left');
        } else {
            parentContainer = bottom_right_container;
            display_element.classList.add('opening-from-right');
        }
    }

    display_element._parentContainer = parentContainer; // store reference
    parentContainer.append(display_element);

    
}

function remove_messagess(removing_element) {
    const parentContainer = removing_element._parentContainer;
    if (parentContainer && parentContainer.contains(removing_element)) {
        parentContainer.removeChild(removing_element);
        // if(parentContainer.classList[1].contains('top-left-container') || parentContainer.classList[1]==='bottom-left-container')
        //     removing_element.classList.add('closing-to-left')
        // else
        //     removing_element.classList.add('closing-to-right')
        console.log(removing_element);
        console.log(
            `deleting = ${removing_element.children[0].innerHTML} reference = ${removing_element._timeout}`
        );
    }
}



function new_remove_mess(removing_element){
    removing_element.remove();
}
// "✓"    --success-text: hsl(140, 100%, 27%);  success
//  ! hsl(360, 100%, 45%); error
//   "⚠" hsl(31, 92%, 45%);warning
//   "ⓘ";hsl(210, 92%, 45%); info

/*
const form = document.querySelector('form')
const hori_position = document.querySelector('#horizontal-position');
const ver_position = document.querySelector('#vertical-position');
const type_of_message = document.querySelector("#type");

const input_message = document.querySelector('.input-field');
const duration = document.querySelector('.duration-container>input');
const duration_caption = document.querySelector('.sec');

const show_toast_button = document.querySelector('button');

const all_toast_container = document.querySelector('.all-popup-container');

const top_left_container = document.querySelector('.top-left-container');
const top_right_container = document.querySelector('.top-right-container');
const bottom_left_container = document.querySelector('.bottom-left-container');
const bottom_right_container = document.querySelector('.bottom-right-container');




let timeout_ref;
let count = 0;

input_message.addEventListener('input', function(e) {
    if (e.target.value === '')
        show_toast_button.disabled = true;
    else
        show_toast_button.disabled = false;


});

duration.addEventListener('input', function(e) {

    duration_caption.innerHTML = e.target.value + 's';
})


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const new_created_Element = creatingElement();


    new_created_Element.children[0].classList.add(type_of_message.value);


    new_created_Element.children[0].innerHTML = input_message.value;

    showing_messagess(new_created_Element);
    new_created_Element._timeout = setTimeout(new_remove_mess, parseInt(duration.value) * 1000, new_created_Element);
    console.log(new_created_Element.children[0].innerHTML + "  having this timeout ref=  "+ timeout_ref)

})



all_toast_container.addEventListener('click', function(e) {
    if (e.target.classList.value === 'cross-icon') {
        new_remove_mess(e.target.parentElement);
        clearTimeout(e.target.parentElement._timeout);
        console.log(e.target.parentElement.children[0].innerHTML + " time out reference when cross clicked " + timeout_ref)
    }

})


function creatingElement() {
    const created_box = document.createElement('div');
    created_box.classList.add('toast-pop-up');
    const created_message = document.createElement('span');
    const cross_icon = document.createElement('span');
    cross_icon.innerHTML = "✕";
    cross_icon.classList.add('cross-icon');
    created_box.append(created_message, cross_icon);
    return created_box;
}



function showing_messagess(display_element) {
    if (ver_position.value === 'top')
        if (hori_position.value === 'left')
            top_left_container.append(display_element)
        else
            top_right_container.append(display_element)
    else
    if (hori_position.value === 'left')
        bottom_left_container.append(display_element)
    else
        bottom_right_container.append(display_element)
}

function remove_messagess(removing_element) {
    if (ver_position.value === 'top')
        if (hori_position.value === 'left'){
            
            console.log("deleting = "+ removing_element.children[0].innerHTML)
            top_left_container.removeChild(removing_element)
        }
        else
            top_right_container.removeChild(removing_element)
    else
    if (hori_position.value === 'left')
        bottom_left_container.removeChild(removing_element)
    else
        bottom_right_container.removeChild(removing_element)
}



function new_remove_mess(removing_element){
    removing_element.remove();
    console.log(removing_element.children[0].innerHTML+" deleted ")
}
*/