// const Loading = ({ center }) => {
//     return <div className={center ? 'loading loading-center' : 'loading'}></div>;
//   };
//   export default Loading;

  const Loading = () => {
    return (
      <div className='h-screen flex items-center justify-center'>
        <span className='loading loading-ring loading-lg' />
      </div>
    );
  };
  export default Loading;