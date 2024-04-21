import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./index.css";
// import { Provider } from "react-redux";
// import { store } from "./store/store";

// class InternetConnectionChecker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOnline: navigator.onLine 
//     };
//   }

//   componentDidMount() {
//     window.addEventListener("online", this.handleOnline);
//     window.addEventListener("offline", this.handleOffline);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("online", this.handleOnline);
//     window.removeEventListener("offline", this.handleOffline);
//   }

//   handleOnline = () => {
//     this.setState({ isOnline: true });
//   };

//   handleOffline = () => {
//     this.setState({ isOnline: false });
//   };

//   render() {
//     return this.props.children(this.state.isOnline);
//   }
// }

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught by error boundary:", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }

// const Root = () => (
//   <React.StrictMode>
//     <Provider store={store}>
//       <ErrorBoundary>
//         <InternetConnectionChecker>
//           {(isOnline) => (
//             <div className="relative">
//               {!isOnline && (
//                 <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-red-500 text-4xl z-50">
//                   Internet connection lost. Please check your connection.
//                 </h1>
//               )}
//               <App className="absolute inset-0" />
//             </div>
//           )}
//         </InternetConnectionChecker>
//       </ErrorBoundary>
//     </Provider>
//   </React.StrictMode>
// );

// ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
