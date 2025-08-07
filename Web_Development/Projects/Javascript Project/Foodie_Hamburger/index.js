const hamburger_icon=document.querySelector('.hamburger-icon-container>img');
const menu_container=document.querySelector('.hamburger-icon-container');
const menu_list=document.querySelector('.menu-list')
const fade_element=document.querySelector('.reset-anymore')
const cross_icon=document.querySelector('.cross-icon')
const all_link=document.querySelectorAll('a')


hamburger_icon.addEventListener('click',(e)=>{
                                                hamburger_icon.style.display='none'
                                                cross_icon.style.display='block'
                                                menu_container.classList.add('menu-open')
                                                menu_list.style.display='flex';
                                                fade_element.classList.add('fade-away')
                                                

});

cross_icon.addEventListener('click',(e)=>{
                                            hamburger_icon.style.display='inline-block'
                                            cross_icon.style.display='none'
                                            menu_container.classList.remove('menu-open')
                                            menu_list.style.display='none';
                                            fade_element.classList.remove('fade-away')
})

