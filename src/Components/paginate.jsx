const Paginate = (userList) => {
    const itemsPerPage = 3
    const numberOfPages = Math.ceil(userList.length / itemsPerPage)
  
    const newUserList= Array.from({ length: numberOfPages }, (_, index) => {
      const start = index * itemsPerPage
      return userList.slice(start, start + itemsPerPage)
    })
  
    return newUserList
  }
  
  export default Paginate