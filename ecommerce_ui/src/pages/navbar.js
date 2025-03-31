import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, InputAdornment, Box, Toolbar, MenuItem, TextField, Select, IconButton, Badge, Popover, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchIcon from "@mui/icons-material/Search";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        flexDirection: 'row',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        width: '100%',
        gap: theme.spacing(1),
    },
}));

export default function PrimarySearchAppBar({ search, setSearch, sort, setSort, cart, setOpen }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Search>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%", flexWrap: "wrap" }}>
                                <TextField
                                    label="Search Products"
                                    variant="outlined"
                                    size="small"
                                    fullWidth={isMobile}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{ flex: isMobile ? "1 1 100%" : "auto" }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Search>

                        <Box sx={{ ml: 'auto' }}>
                            <IconButton size="large" color="inherit" onClick={handleFilterClick}>
                                <FilterListOutlinedIcon />
                            </IconButton>

                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <Select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        size="small"
                                        sx={{ backgroundColor: 'white', borderRadius: 1, width: isMobile ? '100%' : 'auto' }}
                                    >
                                        <MenuItem value="asc">Price: Low to High</MenuItem>
                                        <MenuItem value="desc">Price: High to Low</MenuItem>
                                    </Select>                                </Box>
                            </Popover>

                            <IconButton size="large" color="inherit" onClick={() => setOpen(true)}>
                                <Badge badgeContent={cart.reduce((total, item) => total + item.quantity, 0)} color="error">
                                    <AddShoppingCartOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
