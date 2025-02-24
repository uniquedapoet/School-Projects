import React, {useState} from "react";


const initialShoppingListData = [
  { item: "eggs", quantity: 1 },
  { item: "milk", quantity: 2 },
  { item: "bread", quantity: 1 },
  { item: "bananas", quantity: 4 },
];

const ShoppingListRow = ({ item, quantity, purchased, setPurchased }) => {
  const style = {};

  if (purchased) {
    style.textDecoration = "line-through";
  }

  return (
    <div style={style}>
      <input
        type="checkbox"
        id={item}
        checked={purchased}
        onChange={() => setPurchased(!purchased)}
      />
      <label htmlFor={item}>{`${item} (qty. ${quantity})`}</label>
    </div>
  );
};

const ShoppingList = ({ initialShoppingListData }) => {
  const [hidePurchased, setHidePurchased] = React.useState(false);
  const [shoppingListData, setShoppingListData] = React.useState(
    initialShoppingListData.map((entry) => {
      return { item: entry.item, quantity: entry.quantity, purchased: false };
    })
  );

  const [searchText, setSearchText] = useState("");
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    
  };

  const handleSearchChange = (event) => {
    setSearchText(event.currentTarget.value);
  }

  const handleItemChecked = (item, isPurchased) => {
    const newShoppingListData = shoppingListData.map((entry) => {
      if (entry.item === item) {
        return {
          item: entry.item,
          quantity: entry.quantity,
          purchased: isPurchased,
        };
      }
      return entry;
    });
    setShoppingListData(newShoppingListData);
  };

  const rowsToDisplay = shoppingListData
  .filter((entry) => !entry.purchased || !hidePurchased)
  .filter((entry) => entry.item.includes(searchText.trim().toLowerCase()));

  const rows = rowsToDisplay.map(({ item, quantity, purchased }) => (
    <ShoppingListRow
      key={item}
      item={item}
      quantity={quantity}
      purchased={purchased}
      setPurchased={(isPurchased) => handleItemChecked(item, isPurchased)}
    />
  ));
  // console.log(searchText);

  return (
    <div>
      <input
        type="checkbox"
        id="hide-purchased"
        checked={hidePurchased}
        onChange={() => setHidePurchased(!hidePurchased)}
      />
      <label htmlFor="hide-purchased">Hide purchased items</label>
      <br />
      <label htmlFor="search">Search for an item: </label>
      <input type="search" 
      id="search"
      value={searchText}
      onChange={handleSearchChange} 
      />
      <br />
      <label htmlFor="add-item">Add an item:</label>
      <input type="text" 
      id="add-item" 
      />
      <button id="button" >Add</button>
      <h2>My Shopping List</h2>
      {rows.length > 0 ? rows : "No items to display"}
    </div>
  );
};
const ShoppingListApp = () => {
  return <ShoppingList initialShoppingListData={initialShoppingListData} />;
};

export default ShoppingListApp;
