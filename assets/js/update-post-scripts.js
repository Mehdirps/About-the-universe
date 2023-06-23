async function updatePost() {
    const str = window.location.href;
    const url = new URL(str);
    const id = url.searchParams.get("id");

    const response = await fetch(`https://freefakeapi.io/api/posts/${id}`);
    const data = await response.json();

    const titleInput = document.querySelector('#title');
    titleInput.value = data.title;
    const slug = data.title.replaceAll(' ', '-').toLowerCase();
    const contentInput = document.querySelector('#content');
    contentInput.value = data.content;

    const imgInput = document.querySelector('#img');
    imgInput.value = data.picture;

    document.querySelector('.update-article-form').addEventListener('submit', (e) => {
        e.preventDefault();

        fetch(`https://freefakeapi.io/api/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: data.title,
                conent: data.content,
                img: data.img,
                slug 
            })
        })
    })
}

updatePost();