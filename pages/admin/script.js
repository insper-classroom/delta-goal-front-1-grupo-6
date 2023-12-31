function verification_blank(){
    let match_name = document.getElementById('match_name').value;
    let match_date = document.getElementById('match_date').value;
    let csv = document.getElementById('csv');

    if (match_name.trim() === '' || match_date.trim() === '' || csv.files.lenght === 0) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    return true;
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    if(verification_blank()){
        const formData = new FormData(event.target);

        for (const pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        const backendURL = 'http://127.0.0.1:5501/csv';

        fetch(backendURL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok){
                alert('ok');
            }else {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
        })
    }
    
});