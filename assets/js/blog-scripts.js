let index = 6;

function onInit() {
    showArticles(index);
    showMoreArticle(index);
    deletePost();

    const str = window.location.href;
    const url = new URL(str);
    const message = url.searchParams.get("message");

    if (message !== "") {
        document.querySelector('#message').textContent = message;
    }

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

        const buttonUpdate = document.createElement('a');
        buttonUpdate.textContent = "Modifier";
        buttonUpdate.href = `updatepost.html?id=${article.id}`
        buttonUpdate.setAttribute('id', article.id);
        buttonUpdate.classList.add('update');

        const buttonAdd = document.createElement('p');
        buttonAdd.textContent = "Supprimer";
        buttonAdd.setAttribute('id', article.id);
        buttonAdd.classList.add('delete');

        buttonContainer.appendChild(buttonUpdate);
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

        index += 6;

        showArticles(index);
    })
}


async function deletePost() {
    await showArticles(index);

    const deletesButtons = document.querySelectorAll('.delete');

    for (let btn of deletesButtons) {

        btn.addEventListener('click', (e) => {

            const id = e.target.attributes.id.value;
            if (confirm('Le poste va être supprimé ! Etes vous sur ?')) {

                fetch(`https://freefakeapi.io/api/posts/${id}`, { method: 'DELETE' })
                    .then(function (response) {
                        if (response.status === 204) {
                            document.querySelector('#message').textContent = 'Le poste à été supprimé';

                        } else if (response.status !== 204) {
                            document.querySelector('#message').textContent = "Votre poste n'à pas été supprimé suite à une erreur !";
                        }
                    })

            }
        })
    }
}

onInit();