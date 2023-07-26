import styled from 'styled-components'

const Wrapper = styled.div`
width:100vw;
height:100vh;
display:grid;
background: lightGray;
text-align: center;
justify-items:center;
button{
 width:100%;
 padding:3px;
  color:white;
  margin:1rem auto auto ;
  background:blue;
  border-radius:5px;
  border:none;

}
button:hover{
  color:white;
  background:black;
  transition:1s;
}
.container{
  display:grid;
  justify-items:space-between;  
  padding:2rem;
  row-gap:2rem;
  width:fit-content;
  height:fit-content;
  background-color:lightBlue;
  color:blue;
  border-top:solid 5px  blue;
  border-bottom:solid 5px  blue;
  border-radius:10px;
  margin-bottom:2rem;
  box-shadow: 11px 14px 24px -18px rgba(66, 68, 90, 1);

}
.container:hover{

  box-shadow: 5px 6px 8px -18px rgba(66, 68, 90, 1);
transition:1s;

}
.container-login{
  display:grid;
  justify-items:space-between;  
  padding:1rem;
  row-gap:2rem;
  width:fit-content;
  height:fit-content;
  background-color:lightBlue;
  color:blue;
  border-top:solid 5px  blue;
  border-bottom:solid 5px  blue;
  border-radius:10px;
  margin-bottom:2rem;
  box-shadow: 11px 14px 24px -18px rgba(66, 68, 90, 1);

}
.container-login:hover{

  box-shadow: 5px 6px 8px -18px rgba(66, 68, 90, 1);
transition:1s;

}
`

export default Wrapper