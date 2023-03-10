import Toastify from "../HelperComponents/Toastify";


const AppReducer = (state  , action) =>
{
    switch (action.type) {
        case "addToDo" :
            return {

                ...state,

                todoCounter: state.todoCounter + 1,
                cards: [...state.cards, action.payload]

            }
        break;
        case "EditToDo" : {


            const cards = state.cards.map((card)=>
            {
                if (card.number === action.payload.number)
                {

                    card = action.payload;
                }

                return card;

            });
            Toastify({type: "info", message: "ToDo Edited !"}) //--- Send Signal To Notify Engine
            return {

                ...state,

                cards: [...cards]
            }
        }
        break;
        case "deleteTodo":
        {

            console.log(action);
            // const cards = state.cards.filter(card=> card.number !== action.payload.number);

            const cards = state.cards.map(card=> {

                if (card.number == action.payload.number)
                    card.status = "deleted"

                return card;
            }  );

            console.log(...cards);


            Toastify({type: "warning", message: "ToDo Deleted !"}) //--- Send Signal To Notify Engine
            return {

                ...state,
                badges : {...state.badges , deleted : state.badges.deleted +1},
                cards: [...cards]
            }

        }
        break;
        case "completeTodo":
        {
            const cards = state.cards.map(card=> {

                if (card.number == action.payload.number)

                    card.status = "completed";



                return card;
            }  );

            // console.log(cards);
            Toastify({type: "success", message: "ToDo Imported !"}) //--- Send Signal To Notify Engine
            return {

                ...state,
                badges : {...state.badges , completed : state.badges.completed+1},
                cards: [...cards]
            }
        }
        break;
        case "showTodo":
        {
            return {
                ...state , showType : "todo"
            }
        }
        break;
        case "showCompleted":
        {
            return {
                ...state ,
                badges : {...state.badges , completed : 0},
                showType : "completed"
            }
        }
        break;
        case "showDeleted":
        {
            return {
                ...state ,
                badges : {...state.badges , deleted : 0},
                showType : "deleted"
            }
        }
        break;

    }
}

export default AppReducer;