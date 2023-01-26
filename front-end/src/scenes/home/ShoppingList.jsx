import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import { setItems } from '../../state';

const ShoppingList = () => {

  const dispatch = useDispatch();
  const [value, setValue] = useState('all');
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const items = await fetch("http://localhost:1337/api/items?populate=image", { method: "GET" });
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItem();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const pcPortatil = items.filter(
    (item) => item.attributes.category === "Portatil"
  );

  const pcSobremesa = items.filter(
    (item) => item.attributes.category === "Sobremesa"
  );

  return (
    <Box width='80%' margin='80px auto'>
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: {display: isNonMobile ? "block" : "none" }}}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap"
          }
        }}
      >
        <Tab label="TODOS" value="all" />
        <Tab label="PORTÁTILES" value="Portatil" />
        <Tab label="SOBREMESA" value="Sobremesa" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
        ))}

        {value === "Portatil" 
          && pcPortatil.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
        ))}

        {value === "Sobremesa" 
          && pcSobremesa.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      </Box>
    </Box>
  )
}

export default ShoppingList;