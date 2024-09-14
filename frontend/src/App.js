import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

// Constants
const API_KEY = '3dc9ef32c095edddbda60379c23332f7';
const API_URL = 'https://gnews.io/api/v4/top-headlines';

function App() {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('latest');
    const [category, setCategory] = useState('general');
    const [country, setCountry] = useState('');

    const fetchNews = useCallback(async () => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    q: query,
                    category: category,
                    country: country,
                    apikey: API_KEY,
                    lang: 'en',
                    max: 10,
                },
            });
            setArticles(response.data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }, [query, category, country]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    return (
        <div className="App">
            <header className="navbar">
                <div className="logo">
                    <h1>ACONEWS</h1>
                </div>
                <div className="controls">
                    <input 
                        type="text"
                        placeholder="Search for news..."
                        value={query}
                        onChange={handleSearch}
                    />
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="general">General</option>
                        <option value="business">Business</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="science">Science</option>
                        <option value="sports">Sports</option>
                        <option value="technology">Technology</option>
                    </select>
                    <select value={country} onChange={handleCountryChange}>
                        <option value="">All Countries</option>
                        <option value="us">United States</option>
                        <option value="gb">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="in">India</option>
                        <option value="jp">Japan</option>
                        <option value="cn">China</option>
                        <option value="fr">France</option>
                        <option value="de">Germany</option>
                        <option value="it">Italy</option>
                        <option value="es">Spain</option>
                        <option value="mx">Mexico</option>
                        <option value="br">Brazil</option>
                        <option value="za">South Africa</option>
                    </select>
                    <button onClick={fetchNews}>Search</button>
                </div>
            </header>
            <div className="news-container">
                {articles.map((article, index) => (
                    <div key={index} className="news-card">
                        <img src={article.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={article.title} />
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
