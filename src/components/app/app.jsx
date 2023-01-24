import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);
  const hasError = useSelector((store) => store.burgerIngredients.hasError);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {isLoading && "Loading"}
      {hasError && "Error"}
      {!isLoading && (
        <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
    </div>
  );
}

// function App() {
//   const [state, setData] = useState({
//     data: [],
//     loading: true,
//     error: false,
//   });

//   useEffect(() => {
//     setData({ ...state, loading: true, error: false });
//     getInitialData()
//       .then((res) => {
//         setData({ ...state, data: res.data, loading: false });
//       })
//       .catch((err) => {
//         setData({ ...state, loading: false, error: true });
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className={appStyles.app}>
//       <AppHeader />
//       <IngredientsContext.Provider value={state}>
//         {state.isLoading && "Loading"}
//         {state.hasError && "Error"}
//         {!state.loading && (
//           <main className={appStyles.main}>
//             <BurgerIngredients />
//             <BurgerConstructor />
//           </main>
//         )}
//       </IngredientsContext.Provider>
//     </div>
//   );
// }

export default App;
