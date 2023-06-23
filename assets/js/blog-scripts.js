function onInit() {
    let index = 6;
    showArticles(index);
    showMoreArticle(index);
    deletePost();
}

function getArticles() {
    return new Promise(async resolve => {
        const response = await fetch('https://freefakeapi.io/api/posts');
        const data = await response.json();
        resolve(data);

    });
}

async function showArticles(index) {

    const articles = await getArticles();
    const articlesSliced = articles.slice(0, index)

    console.log(articlesSliced);

    document.querySelector('.blog-articles-container').innerHTML = "";

    for (let article of articlesSliced) {
        let title = document.createElement('h3');
        title.textContent = article.title;

        let img = document.createElement('img');
        img.src = article.picture;
        img.alt = 'Image de ' + article.title;

        let content = document.createElement('p');
        const textSub = article.content.substr(1, 25) + '...'
        content.textContent = textSub;
        content.classList.add('description');

        const articleContent = document.createElement('div');
        articleContent.classList.add('article-content');
        articleContent.appendChild(title);
        articleContent.appendChild(img);
        articleContent.appendChild(content);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttons');

        const buttonMore = document.createElement('a');
        buttonMore.textContent = "Modifier";
        buttonMore.classList.add('update');

        const buttonAdd = document.createElement('p');
        buttonAdd.textContent = "Supprimer";
        buttonAdd.classList.add('delete');

        buttonContainer.appendChild(buttonMore);
        buttonContainer.appendChild(buttonAdd);

        const articleContainer = document.createElement('article');
        articleContainer.classList.add('blog-article');
        articleContainer.appendChild(articleContent)
        articleContainer.appendChild(buttonContainer);


        const blog = document.querySelector('.blog-articles-container');
        blog.appendChild(articleContainer);
    }
}

function showMoreArticle(index) {
    // Revoir cette function :  incrementation se fait que 1 fois passer new index dans variable dans onInit()
    const moreButton = document.querySelector('.more-article');

    moreButton.addEventListener('click', () => {

        let newIndex = index + 6;

        showArticles(newIndex);
    })
}


function deletePost(){
    document.querySelector('.delete').addEventListener('click', () => {
        if(confirm('Le poste va être supprimé ! Etes vous sur ?')){
            console.log('delete');
        }else{
            console.log('pas delete');
        }
    })
}

onInit();