const pool = require("../db");

const getProducts = async () => {
    try {
        const query = "select * from productos"
        const rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
};


const getProduct = async (id) =>{
    try {
        const query = "select * from articulos where id =?"
        const row = await pool.query(query, [id]);
        return row; 
    } catch (error) {
        console.log(error)
    }
};

const addProduct = async (data) => {
    try {
        const query = "insert into products set?"
        const rows = await pool.query(query, [data]);
        return rows;
    } catch (error) {
        console.log(error);
    }
};

const modifyProduct = async (data, id) => {
    try {
        const query = "update articulos set ? where id = ?";
        const row = await pool.query(query, [data, id])
        return row;
    } catch (error) {
        console.log(error)
    }
};

const deleteProduct = async (id) => {
        const query = "delete from articulos where id =?"
        const row = await pool.query(query, [id]);
        return row; 
};

module.exports = {getProducts, addProduct, getProduct, deleteProduct, modifyProduct};