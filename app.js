var movie_storage=[];

const add_btn=document.getElementsByClassName("btn-add")[0];


window.addEventListener("DOMContentLoaded", () => {
    if(JSON.parse(localStorage.getItem("movies"))===null)
    {

    }
    else
    {
        movie_storage=JSON.parse(localStorage.getItem("movies"));
        for(var val in movie_storage)
        {
            addItem(movie_storage[val].name);
        }
        var rembtn=document.getElementsByClassName('btn-rem');
        for(var i=0;i<rembtn.length;i++)
        {
            var div_button=rembtn[i];
            div_button.addEventListener('click',remove_Movie);
        }
        var liclick=document.getElementsByTagName("li");
        
        for(var i=0;i<liclick.length;i++)
        {
            var li_temp=liclick[i];
            li_temp.addEventListener('click',showinfo);
        }
    }
    
});

function addClick()
{
    var rembtn=document.getElementsByClassName('btn-rem');
        for(var i=0;i<rembtn.length;i++)
        {
            var div_button=rembtn[i];
            div_button.addEventListener('click',remove_Movie);
        }
        var liclick=document.getElementsByTagName("li");
        
        for(var i=0;i<liclick.length;i++)
        {
            var li_temp=liclick[i];
            li_temp.addEventListener('click',showinfo);
        }
}
function remove_Movie()
{
    var infodiv=document.getElementsByClassName("info")[0];
    infodiv.style.display="none";
    var id_div=this.id;
    var index=movie_storage.indexOf(id_div);
    movie_storage.splice(index,1);
    localStorage.setItem('movies', JSON.stringify(movie_storage));
    this.parentElement.remove();
}

function add_movie()
{
    var name=document.getElementById('movie_nameinp').value;
    var genre=document.getElementById('gen_inp').value;
    var status=document.getElementById('status').value;
    document.querySelector('.bg-modal').style.display='none';
    var movie={
        "name":name,
        "genre":genre,
        "status":status
    }
    input_movie(movie);
}




function clearStorage()
{
    localStorage.clear();
    window.location.reload();
}


function input_movie(movie_name)
{
    movie_storage.push(movie_name);
    localStorage.setItem('movies', JSON.stringify(movie_storage));
    addItem(movie_name.name);
    window.location.reload();
}






function addItem(movie_name) {
    
    
    const randomColor=randDarkColor();
    var ul = document.getElementById("dynamic-list");
    var li = document.createElement("li");
    li.setAttribute('id', movie_name);
    li.style.backgroundColor =randomColor;
    li.innerHTML=movie_name+'  <button id="'+movie_name+'" class="btn-rem">x</button>';
    ul.appendChild(li);
}





function randDarkColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
}



add_btn.addEventListener('click',()=>{
    document.querySelector('.bg-modal').style.display='flex';
    
});

document.querySelector('.close').addEventListener('click',()=>{
    document.querySelector('.bg-modal').style.display='none';
});

function showinfo()
{
    var title=this.textContent;
    var titlemod=title.slice(0, -2).trim();
    var genre;
    var status;
    for(let x in movie_storage)
    {
        if(movie_storage[x].name===titlemod)
        {
            status=movie_storage[x].status;
            genre=movie_storage[x].genre;
            break;
        }
    }
    var infodiv=document.getElementsByClassName("info")[0];
    if(genre!==undefined && status!==undefined)
    {
    setTimeout(() => {
        infodiv.style.display="block";
    infodiv.innerHTML='<div class="title-info">'+titlemod+'</div><br>Genre: '+genre+'<br>Status: '+status;
    infodiv.style.backgroundColor=randDarkColor();
    }, 200);
    setTimeout(() => {
        infodiv.style.display="none";
    }, 3000);
}
}


const searchbar=document.getElementById("bar");
searchbar.addEventListener('keyup',(val)=>{
    let filter=searchbar.value.toUpperCase();
    
    let movieele=document.getElementById('dynamic-list');
    movieele.innerHTML='';
    for(var i in movie_storage)
        {
            if((movie_storage[i].name.toUpperCase()).includes(filter))
            addItem(movie_storage[i].name);
        }
        addClick();
});

