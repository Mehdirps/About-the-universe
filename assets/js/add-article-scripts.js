function postArticle() {
    document.querySelector('.add-article-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.content.value;
        const picture = e.target.img.value;
        const slug = e.target.title.value.replaceAll(' ', '-');

        fetch('https://freefakeapi.io/api/posts', {
            method: 'POST',
            body: JSON.stringify({

                title,
                content,
                slug,
                picture,
                user: 1,
            })
        })
            .then(function (response) {
                if (response.status === 201) {
                    const message = "Votre poste à été créé"
                    window.location.href = `blog.html?message=${message}`;

                } else if (response.status !== 201) {
                    document.querySelector('#message-error').textContent = "Votre poste n'à pas été créé suite à une erreur !"

                }
            })
    });
}

postArticle();