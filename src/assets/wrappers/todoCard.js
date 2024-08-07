import styled from 'styled-components';
const Wrapper = styled.div`
.card{
width:60%;
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-center;
  gap: 2rem;
  border:1px solid;
  padding:10px;
  background-color:lightBlue; 
  border-top:5px solid blue; 
  border-bottom:5px solid blue; 
  border-radius:10px;
  box-shadow: 15px 16px 28px -18px rgba(66, 68, 90, 1);
}
.card:hover{
    box-shadow: 10px 10px 20px -18px rgba(66, 68, 90, 1);
}

`;

export default Wrapper;