import React, {useState, useEffect} from 'react';

import api from './services/api';
import Header from './components/Header';

import './App.css';
import carImg from './assets/car.jpg';

/**
 * Componente
 * Propriedade
 * Estado
 */

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const [updateTitle, setUpadateTitle] = useState('');
  const [updateOwner, setUpadateOwner] = useState('');
  const [updateId, setUpadateId] = useState('');
  const [showUpdateInputs, setShowUpdateInputs] = useState(false);

  //UseState retorna um array com 2 posições
  //1. Variavel com o seu valor inicial
  //2. Função para atualizarmos esse valor
  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject(e) {
    //projects.push(`Novo projeto ${Date.now()}`)
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);
    e.preventDefault();

    const data = {
      title,
      owner,
    };

    if (!data.title || !data.owner) {
      alert("Favor preencher todos os campos");
      return;
    }

    try {
      const response = await api.post('projects', data);
      const project = response.data;

      setProjects([...projects, project]);
    } catch(err) {
      alert("Erro ao cadastrar, tente novante")
    }
  }
  
  async function handleDelete(id) {
    try {
      await api.delete(`/projects/${id}`, {
      });

      setProjects(projects.filter((project) => project.id !== id));
  } catch (err) {
      alert('Erro ao deletar o projeto, tente novamente');
  }
}

  function handleUpdateProject({id, title, owner}) {

    setUpadateId(id);
    setUpadateOwner(owner);
    setUpadateTitle(title);
    setShowUpdateInputs(true);
    
  };

  async function handleSubmitUpdate() {
    try {
      const data = {
        id: updateId, 
        title: updateTitle, 
        owner: updateOwner,
      };

      const response = await api.put(`projects/${data.id}`, data);
      
      if (response.status !== 200) {
        alert("Error update project2");
        return;
      }
      
      setShowUpdateInputs(false)
    } catch (err) {
      alert("Error update project");
    }
  };

  return (
    <div className="container">
      <Header title="Projetos"/>
      <header>
        <img src={carImg} alt="Netflix" />
      </header>

      <ul>
        {projects.map(project => 
        <li key ={project.id}>
          <div>
            <span>{project.title}</span>
            <span>{project.owner}</span>
          </div>
          <button type="button" onClick={() => handleDelete(project.id)}>deletar</button>
          <button type="button" onClick={() => handleUpdateProject(project)}>Atualizar</button>
        </li>)}
      </ul>

      <form onSubmit={handleAddProject}>
        <div>
          {!showUpdateInputs && (
            <>
              <input
                type="text"
                placeholder="Nome do Projeto"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <input 
                type="text"
                placeholder= "Name"
                value={owner}
                onChange={e => setOwner(e.target.value)}
              />
            </>
          )}
          {showUpdateInputs && (
            <>
              <input
                type="text"
                placeholder="Atualizar nome do projeto"
                value={updateTitle}
                onChange={e => setUpadateTitle(e.target.value)}
              />
              <input 
                type="text"
                placeholder= "Atualizar owner"
                value={updateOwner}
                onChange={e => setUpadateOwner(e.target.value)}
              />
            </>
          )}
          
        </div>
          {!showUpdateInputs && (
            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
          )}
          {showUpdateInputs && (
            <button type="button" onClick={handleSubmitUpdate}>Atualizar projeto</button>
          )}
      </form>
    </div>
  )
};
export default App;