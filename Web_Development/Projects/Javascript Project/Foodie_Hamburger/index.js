const nav_bar=document.querySelector('.nav-bar')
const menu_icon=document.querySelector('.hamburger-icon-container>img')
const cross_icon=document.querySelector('.cross-icon')
const menu_list =document.querySelector('.menu-list')
menu_icon.addEventListener('click',(e)=>{
                                            e.stopPropagation();
                                            nav_bar.classList.add('menu-open')
})

menu_list.addEventListener('click',(e)=>{
                            e.stopPropagation();
})

cross_icon.addEventListener('click',(e)=>{
                                            
                                            nav_bar.classList.remove('menu-open')
})

window.addEventListener('click',(e)=>{
                                    nav_bar.classList.remove('menu-open')
})