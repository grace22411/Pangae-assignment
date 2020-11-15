import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { ProductList } from "./components/ProductList";
import "./App.css";
import CartProvider from "./context/Cart";
import React, { Component } from "react";
import ProductProvider from "./context/Products";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://pangaea-interviews.now.sh/api/graphql"
  }),
  credentials: "same-origin"
});

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };
  render() {
    return (
      <ApolloProvider client={client}>
        <ProductProvider>
          <CartProvider>
            <div className="container">
              <div className="row">
                <ProductList />
              </div>
            </div>
          </CartProvider>
        </ProductProvider>
      </ApolloProvider>
    );
  }
}

export default App;
