const reducer =(state,action)=>{
    console.log(action);
      switch(action?.type){
          case 'GET_ALL_COMMENT':
              return [...action.payload];
          case 'ADD_COMMENT':
              return [...state,action.payload];
          case 'EDIT_COMMENT':
              return state.map(c=> c._id === action.payload._id ? {...c, text: action.payload.text}: c)
          default:
              return state;
      
      }
      
     
  };
  
  export default reducer;