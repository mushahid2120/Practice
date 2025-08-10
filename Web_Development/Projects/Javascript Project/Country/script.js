const body=document.querySelector('body');
const darkmode_btn=document.querySelector('.darkmode-container');
const search_bar=document.querySelector('.search-bar')
const main_container=document.querySelector('.main-container')
const contries=document.querySelector('.contries')
const filterBtn=document.querySelector('.filter-btn')
const region_list=document.querySelector('.region-list')

let all_element=document.querySelectorAll('.element');

let darkmode_flag=false;
let filter_flag=false;
const data_url='http://127.0.0.1:5500/Javascript%20Project/Country/data.json'


allContryDataDisplay()
async function allContryDataDisplay(filter_region){
    try{
        const mydata= await (await fetch(data_url)).json();
        mydata.forEach((contry_number)=>{
                                // console.log(filter_region)
                                // console.log('region in top  ==='+ contry_number.region)
                                if(filter_region===undefined){
                                    const newContryElement=createContryElement(contry_number.flags.png,contry_number.name,contry_number.population,contry_number.region,contry_number.capital)
                                    contries.append(newContryElement)
                                }
                                else{
                                    if(contry_number.region===filter_region){
                                        const newContryElement=createContryElement(contry_number.flags.png,contry_number.name,contry_number.population,contry_number.region,contry_number.capital)
                                        contries.append(newContryElement)
                                    }
                                    // console.log(filter_region + "===" + contry_number.region + " " + filter_region=== contry_number.region )
                                }
                                
                                })
    }
    catch(err){
            console.log("async function Error"+err)
    } 
}


region_list.addEventListener('click',(e)=>{
                                
                                e.stopPropogation;
                                contries.innerHTML='';
                                // console.log(e.target.innerHTML)
                                allContryDataDisplay(e.target.innerHTML)
                                filterBtn.children[0].innerHTML=e.target.innerHTML
                                filterBtn.parentElement.classList.remove('open-filter')
                                filter_flag=false;
                                all_element=document.querySelectorAll('.element');
                                
                                
})

filterBtn.addEventListener('click',(e)=>{
                    if(filter_flag){
                        filterBtn.parentElement.classList.remove('open-filter')
                        filter_flag=false;
                    }
                    else{
                        filterBtn.parentElement.classList.add('open-filter')
                        filter_flag=true;
                    }
                    console.log("filterButton")
})


darkmode_btn.addEventListener('click',(e)=>{
                        all_element=document.querySelectorAll('.element');
                        if(darkmode_flag){
                                all_element.forEach((values)=>{values.classList.remove('darkmode-element')});
                                body.classList.remove('darkmode-font')
                                search_bar.classList.remove('darkmode-font')
                                main_container.classList.remove('darkmode-background')
                                darkmode_flag=false;
                        } 
                        else{
                                all_element.forEach((values)=>{values.classList.add('darkmode-element')});
                                body.classList.add('darkmode-font')
                                search_bar.classList.add('darkmode-font')
                                main_container.classList.add('darkmode-background')
                                darkmode_flag=true;
                        }
})

function createContryElement(contryImg,contryName,contryPopulation,contryRegion,contryCapital){
    const contry_element=document.createElement('div')
    contry_element.classList.add('contry','element')
    const con_img=document.createElement('img')
    const contry_detail_container=document.createElement('div')
    contry_detail_container.classList.add('contry-detail-container')
    const contry_name=document.createElement('div')
    contry_name.classList.add('contry-name')
    const contry_detail=document.createElement('div')
    contry_detail.classList.add('contry-detail')
    const population_container=document.createElement('div')
    population_container.classList.add('population-container','contry-data')
    const population=document.createElement('span')
    population.classList.add('population','contry-data-name')
    const pop_num=document.createElement('span')
    pop_num.classList.add('pop-num','contry-data-value')
    population_container.append(population,pop_num)
    
    const region_container=document.createElement('div')
    region_container.classList.add('region-container','contry-data')
    const region=document.createElement('span')
    region.classList.add('country-region','contry-data-name')
    const region_name=document.createElement('span')
    region_name.classList.add('region-name','contry-data-value')
    region_container.append(region,region_name)

    const capital_container=document.createElement('div')
    capital_container.classList.add('capital-container','contry-data')
    const capital=document.createElement('span')
    capital.classList.add('capital','contry-data-name')
    const capital_name=document.createElement('span')
    capital_name.classList.add('capital-name','contry-data-value')
    capital_container.append(capital,capital_name)

    contry_detail.append(population_container,region_container,capital_container)
    contry_detail_container.append(contry_name,contry_detail)
    contry_element.append(con_img,contry_detail_container)

    con_img.src=contryImg
    contry_name.innerHTML=contryName
    pop_num.innerHTML=contryPopulation
    population.innerHTML='Population: '
    region_name.innerHTML=contryRegion
    region.innerHTML='Region: '
    capital_name.innerHTML=contryCapital
    capital.innerHTML='Capital: '
    

    return contry_element
}




// const newEl=createContryElement('./contry.png','Afganistan','23223','Asia','Kabul')

