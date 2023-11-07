function inserirAluno(){

    const aluno= {
            name: document.getElementById('txtName').value,
            nota1: document.getElementById('txtNota1').value,
            nota2: document.getElementById('txtNota2').value,
        }

        console.log(aluno.nota1, aluno.nota2)
    
    
        if(aluno.name === ""){
            const validNome = document.querySelector('.validNome')
            validNome.innerHTML = '* O nome não pode ser vazio'
            validNome.style.color = 'red'

        }else if(aluno.nota1 === ""){
            const validNota = document.querySelector('.validNota')
            validNota.innerHTML = '* O nota não pode ser vazio'
            validNota.style.color = 'red'
        }else if(aluno.nota2 === ""){
            const validNota = document.querySelector('.validNota')
            validNota.innerHTML = '* O nota não pode ser vazio'
            validNota.style.color = 'red'
        }
        else{
        let bd_alunos = getLocalStorage();
    
        if(!bd_alunos){
    
            bd_alunos = [];
    
        }
    
        bd_alunos.push(aluno);
    
        //start data in local storage
        setLocalStorage(bd_alunos);
    
        //atualizar a tabela após a inserção
        updateTable();
    }
    
    }
    
    //------------------------------------------STORAGE------------------------------------------------------
    function getLocalStorage(){
        return JSON.parse(localStorage.getItem('bd_alunos'));
    
    }
    
    //------------------------------------------------------------------------------------------------------
    function setLocalStorage(bd_alunos){
        localStorage.setItem('bd_alunos', JSON.stringify(bd_alunos));
    
    }
    
    //--------------------------------------------TABLE-----------------------------------------------------
    function updateTable(){
        cleanTable()
    
        const bd_alunos = getLocalStorage();
    
        bd_alunos.forEach(newRow)
    
    }
    
    //------------------------------------------------------------------------------------------------
    function newRow(aluno, index){
    
        const line = document.createElement('tr');
        
        line.innerHTML = `
            <td>${aluno.name}</td>
            <td>${media(`${Number((aluno.nota1).value), Number((aluno.nota2).value)}`)}</td>
            <td><button type="button" class="btn btn-outline-danger" onclick="removeRow(${index})" >Delete</button>
            </td>
        `;
        
        document.querySelector('#tbAlunos>tbody').appendChild(line)
    
        console.log(aluno)
    
    }
    
    //------------------------------------------------------------------------------------------------
    function cleanTable(){
        const tableBody = document.querySelector('#tbAlunos>tbody');
        tableBody.innerHTML = '';
    }

    function removeRow(index){
        const bd_alunos = getLocalStorage();
        const deleteRow = bd_alunos.filter((aluno, i) => i !== index);
        setLocalStorage(deleteRow);
        updateTable();
    }

    function media(n1, n2){
        return (n1 + n2) / 2
    }
    updateTable();