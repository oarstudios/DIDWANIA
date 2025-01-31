import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import search from '../../Images/iconamoon_search-light.png';
import cart from '../../Images/Cart.png';
import userProfImg from '../../Images/Group 46.png';
import logoImg from '../../Images/logo.png';
import './Navbar.css';
import { useAuthContext } from '../../../hooks/useAuthContext';

function Navbar() {
    const { user } = useAuthContext();
    // const user = JSON.parse(localStorage.getItem('user'));
    const [userCart, setUserCart] = useState(JSON.parse(localStorage.getItem('user')))
    // console.log('usernav', user?.user?.cart?.length)
    const [scrollY, setScrollY] = useState(0);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [seStyle, setSeStyle] = useState({
        height: '0',
        padding: '0px'
    });

    useEffect(()=>{
        setUserCart(JSON.parse(localStorage.getItem('user')))
    },[])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("https://147.93.103.125
/products/getallproducts");
            const json = await response.json();

            if (response.ok) {
                setProducts(json.products);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setSeStyle({
            height: "max-content",
            padding: "0px"
        });
    };

    const filteredItems = Array.isArray(products)
        ? products.filter((item) =>
            searchQuery === '' || !item.title
                ? false
                : item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className='navMain'>
            <Link to={'/'}>
                <img src={logoImg} className='logo' alt="logo" />
            </Link>
            <div className='navComps'>
                <Link to={'/dailyAll'}>DAILY ACCESSORIES</Link>
                <Link to={'/religiousAll'}>RELIGIOUS ACCESSORIES</Link>
                <div className='navSearchBar'>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery || ''}
                        onChange={handleSearch}
                    />
                    <img src={search} alt="search" />
                    <ul className='searchedEle' style={seStyle}>
                        {filteredItems.map((item) => (
                            <Link key={item._id} to={`/product/${item._id}`}>
                                <li>{item.title}</li>
                            </Link>
                        ))}
                    </ul>
                </div>

                {user ? (
                    <div className='cno'>
                        <Link to={`/cart/${user?.user?._id}`}>
                            <img src={cart} alt="cart" />
                            {/* Cart count should update automatically when `user` changes */}
                            <p className='orDot'></p>
                        </Link>
                        <Link to={'/order'}>
                            <img src={userProfImg} alt="user profile" />
                        </Link>
                    </div>
                ) : (
                    <Link to={'/signin'}>
                        <button className='nvLoginBtn'>Login</button>
                    </Link>
                )}
            </div>
            <div className='navIcons'>
    <div className='smallSearchBar'>
        <input
            type="text"
            placeholder="Search"
            value={searchQuery || ''}
            onChange={handleSearch} // Make sure search works
        />
        <img src={search} alt="search" />
        <ul className='searchedEle' style={seStyle}>
            {filteredItems.map((item) => (
                <Link key={item._id} to={`/product/${item._id}`}>
                    <li>{item.title}</li>
                </Link>
            ))}
        </ul>
    </div>

    {user ? (
        <div className='cno'>
            <Link to={`/cart/${user?.user?._id}`}>
                <img src={cart} className='icon' alt="cart" />
                <p className='orDot'></p>
            </Link>
            <Link to={'/order'}>
                <img src={userProfImg} className='icon' alt="user profile" />
            </Link>
        </div>
    ) : (
        <Link to={'/signin'}>
            <button className='nvLoginBtn'>Login</button> {/* Moved login button here */}
        </Link>
    )}
</div>

        </div>
    );
}

export default Navbar;
