import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const artifyContext = createContext();
const Context = ({ children }) => {
  const [artistUser, setArtistUser] = useState();
  const [buyerUser, setBuyerUser] = useState();
  const [allBuyerArts, setAllBuyerArts] = useState([]);
  const [allBuyerOrders, setAllBuyerOrders] = useState([]);
  const [allExhibitions, setAllExhibitions] = useState([]);

  useEffect(() => {
    const loadArtistUserData = async () => {
      const storedArtistUser = await AsyncStorage.getItem("artistUser");
      if (storedArtistUser) {
        setArtistUser(JSON.parse(storedArtistUser));
      }
    };
    const loadBuyerUserData = async () => {
      const storedBuyerUser = await AsyncStorage.getItem("BuyerUser");
      if (storedBuyerUser) {
        setBuyerUser(JSON.parse(storedBuyerUser));
      }
    };

    loadArtistUserData();
    loadBuyerUserData();
  }, []);
  return (
    <artifyContext.Provider
      value={{
        artistUser,
        setArtistUser,
        buyerUser,
        setBuyerUser,
        allBuyerArts,
        setAllBuyerArts,
        allBuyerOrders,
        setAllBuyerOrders,
        allExhibitions,
        setAllExhibitions,
      }}
    >
      {children}
    </artifyContext.Provider>
  );
};

const useArtifyContext = () => {
  return useContext(artifyContext);
};

export { Context, useArtifyContext };
