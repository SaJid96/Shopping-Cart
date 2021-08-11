import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { Container, Col, Row } from "reactstrap";
import Axios from "axios";
import { random, commerce } from "faker";


const apiKey = "563492ad6f91700001000001b489e42dcb5e4672b6876b4e192a08a7";
const url = "https://api.pexels.com/v1/search?query=mobile&per_page=6&page=1";

const BuyPage = ({ addInCart }) => {
   
    const [product, setProduct] = useState([]);

    
    const fetchPhotos = async () => {
        const {data }= await Axios.get(url, {
            headers: {
                Authorization: apiKey
            }
        });

        const {photos}=data;
      
        const allProduct=photos.map(photo=>({
          smallImage:photo.src.medium,
          tinyImage:photo.src.tiny,
          productName:random.word(),
          productPrice:commerce.price(),
          id:random.uuid()
        }))

        setProduct(allProduct);
       
    }

    useEffect(() => {
        fetchPhotos();
    }, [])

    return (
        <Container fluid>
            <h1 className="text-center text-danger">
              Online Shopping 
            </h1>
            <Row>
                {product.map(product => (
                    <Col md={4} key={product.id}>
                        <CartItem product={product} addInCart={addInCart} ></CartItem>
                    </Col>
                     ))}
            </Row>
        </Container>
    );

}

export default BuyPage;