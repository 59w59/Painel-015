import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

// Sidebar e layout estilizado
const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #1a6fb8;
  background-image: linear-gradient(to bottom, #1a6fb8, #060a0e);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const CreditContainer = styled.div`
  padding: 10px;
  background-color: #fff;
  color: #060a0e;
  border-radius: 5px;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f4f7f6;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const selectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    borderColor: '#1e91ed',
    color: '#060a0e',
    fontSize: '16px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#060a0e',
    backgroundColor: state.isSelected ? '#1e91ed' : '#fff',
    '&:hover': {
      backgroundColor: '#1e91ed',
      color: '#fff',
    },
  }),
};

const checkerCCOptions = [
  { value: 'chk-oauth', label: 'CHK 0Auth' },
  { value: 'chk-gg', label: 'CHK GG' },
];

const checkerLoginsOptions = [
  { value: 'chk-americanas', label: 'CHK Americanas' },
  { value: 'chk-carrefour', label: 'CHK Carrefour' },
  { value: 'chk-amazon', label: 'CHK Amazon' },
  { value: 'chk-drogasil', label: 'CHK Drogasil' },
  { value: 'chk-facebook', label: 'CHK Facebook' },
  { value: 'chk-hotmail', label: 'CHK Hotmail' },
  { value: 'chk-renner', label: 'CHK Renner' },
];

function App() {
  return (
    <Container>
      <Sidebar>
        <Profile>
          <ProfileImg src="profile.jpg" alt="Perfil" />
          <h2>Nome do Usuário</h2>
        </Profile>

        <div style={{ width: '100%', marginBottom: '20px' }}>
          <label style={{ color: '#fff', marginBottom: '5px', display: 'block' }}>Checker CC's:</label>
          <Select options={checkerCCOptions} styles={selectStyles} placeholder="Selecione..." />
        </div>

        <div style={{ width: '100%' }}>
          <label style={{ color: '#fff', marginBottom: '5px', display: 'block' }}>Checker Logins:</label>
          <Select options={checkerLoginsOptions} styles={selectStyles} placeholder="Selecione..." />
        </div>

        <CreditContainer>
          Saldo disponível: <span>$500,00</span>
        </CreditContainer>
      </Sidebar>

      <MainContent>
        <Header>
          <h1>Bem-vindo ao Painel</h1>
          <p>Agora você pode selecionar os Checkers diretamente na barra lateral.</p>
        </Header>

        <CardGrid>
          <Card>
            <h3>Informação 1</h3>
            <p>Detalhes da informação 1.</p>
          </Card>
          <Card>
            <h3>Informação 2</h3>
            <p>Detalhes da informação 2.</p>
          </Card>
          <Card>
            <h3>Informação 3</h3>
            <p>Detalhes da informação 3.</p>
          </Card>
          <Card>
            <h3>Informação 4</h3>
            <p>Detalhes da informação 4.</p>
          </Card>
        </CardGrid>
      </MainContent>
    </Container>
  );
}

export default App;
