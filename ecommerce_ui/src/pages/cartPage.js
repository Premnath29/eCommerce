import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateQuantity, removeFromCart, clearCart } from "../redux/Reducer/cartReducer.js";
import PrimarySearchAppBar from "./navbar.js";
import { useNavigate } from "react-router-dom";

import {
    Grid,
    Container,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Avatar,
    Button,
    Box,
    Dialog,
    AppBar,
    Toolbar,
    Slide,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    Snackbar,
    Alert
} from "@mui/material";
import { red } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart.cart);
    console.log("cart", cart);

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("asc");
    const [expanded, setExpanded] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState(false);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setOpen(true);
    };

    const handleUpdateQuantity = (id, amount) => {
        dispatch(updateQuantity({ id, amount }));
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleConfirmOrder = () => {
        setOpen(false);
        setOrderModalOpen(true);
        dispatch(clearCart());
    };
    const handleCloseOrderModal = () => {
        setOrderModalOpen(false);
        navigate("/products");
    };

    const filteredProducts = products
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = totalPrice * 0.533;
    const deliveryCharge = totalPrice > 20000 ? 0 : 30;
    const finalAmount = totalPrice - discount + deliveryCharge;

    return (
        <>

            <PrimarySearchAppBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} cart={cart} open={open} setOpen={setOpen} />
            <Grid container spacing={2} justifyContent="center">
                {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} lg={3} key={product.id} display="flex" justifyContent="center">
                        <Card sx={{ maxWidth: 280, height: 350, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <CardActions>
                                <Button variant="contained" sx={{ fontSize: "0.8rem", padding: "4px 8px" }} onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </Button>
                            </CardActions>
                            <CardHeader
                                avatar={<Avatar sx={{ bgcolor: red[500], width: 32, height: 32 }}>{product.title.charAt(0)}</Avatar>}
                                title={<Typography variant="subtitle1" sx={{ fontSize: "0.9rem" }}>{product.title}</Typography>}
                                subheader={<Typography variant="body2" sx={{ fontSize: "0.8rem" }}>₹{product.price}</Typography>}
                            />
                            <CardMedia component="img" height="120" image={product.image} alt={product.title} />

                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: expanded[product.id] ? "unset" : 1,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {product.description}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() => setExpanded((prev) => ({ ...prev, [product.id]: !prev[product.id] }))}
                                >
                                    {expanded[product.id] ? "Show Less" : "...More"}
                                </Button>
                            </CardContent>

                        </Card>
                    </Grid>
                ))}
            </Grid>



            <Dialog
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: "#1976d2" }}>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }} variant="h6">
                            Your Cart
                        </Typography>
                        <IconButton color="inherit" onClick={() => setOpen(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box sx={{ padding: 2, maxHeight: "70vh", overflowY: "auto" }}>
                    <List>
                        {cart.map((item) => (
                            <React.Fragment key={item.id}>
                                <ListItemButton sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
                                    <ListItemText
                                        primary={<Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>{item.title}</Typography>}
                                        secondary={`₹${item.price} x ${item.quantity}`}
                                    />
                                    <Box sx={{ display: "flex", alignItems: "center", mt: { xs: 1, sm: 0 } }}>
                                        <IconButton onClick={() => handleUpdateQuantity(item.id, -1)}><RemoveIcon /></IconButton>
                                        <Typography>{item.quantity}</Typography>
                                        <IconButton onClick={() => handleUpdateQuantity(item.id, 1)}><AddIcon /></IconButton>
                                    </Box>
                                    <Button color="error" sx={{ mt: { xs: 1, sm: 0 } }} onClick={() => handleRemoveFromCart(item.id)}>
                                        Remove
                                    </Button>
                                </ListItemButton>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>

                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                            Total Price:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                            ₹{totalPrice.toFixed(2)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                            Discount (13.3%):
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                            -₹{discount.toFixed(2)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                            Delivery Charge:
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                            ₹{deliveryCharge}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                        <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}>
                            Final Amount:
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}>
                            ₹{finalAmount.toFixed(2)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                            variant="contained"
                            onClick={handleConfirmOrder}
                            sx={{
                                fontSize: { xs: "0.9rem", md: "1rem" },
                                px: 3,
                                backgroundColor: "green",
                                color: "white",
                                "&:hover": { backgroundColor: "#FFD700" },
                            }}
                        >
                            Confirm Order
                        </Button>
                    </Box>
                </Box>


            </Dialog>
            <Dialog open={orderModalOpen} onClose={handleCloseOrderModal}>
                <Box sx={{ padding: 4, textAlign: "center" }}>
                    <Typography variant="h5">🎉 Order Confirmed!</Typography>
                    <Typography>Your order has been placed successfully. Thank you for shopping with us!</Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleCloseOrderModal}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
                    🎉 Order Confirmed! Thank you for your purchase.
                </Alert>
            </Snackbar>
        </>

    );
};

export default ShoppingCart;
