import styled from 'styled-components'

const Wrapper = styled.section`
width:100vw;
height:100vh;
display:grid;
background: lightGray;
text-align: center;
justify-items:center;
button{
  width:4rem;
  color:black;
  margin:3rem auto auto ;
  background:white;
  border-radius:5px;

}
button:hover{
  color:white;
  background:black;
  transition:1s;
}
.container{
  display:grid;
  justify-items:space-between;  
  padding:1rem;
  width:30vw;
  height:30vh;
  background-color:white;
  border:solid 1px gray;
  border-radius:10px;
  margin-bottom:2rem;
  box-shadow: 11px 14px 24px -18px rgba(66, 68, 90, 1);

}
.container:hover{

  box-shadow: 15px 16px 28px -18px rgba(66, 68, 90, 1);
transition:1s;

}
`

export default Wrapper