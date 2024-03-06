import React, { useState, useEffect } from 'react';

const Exercise = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://www.reddit.com/r/reactjs.json')
            .then((response) => response.json())
            .then((data) => {
                const extractedPosts = data.data.children.map((child) => {
                    const { title, selftext_html, url, score } = child.data;
                    return { title, selftext_html, url, score };
                });
                setPosts(extractedPosts);
            })
            .catch((error) => {
                console.error('Error fetching Reddit data:', error);
            });
    }, []);

    return (
        <div className="reddit-posts">
            {posts.map((post, index) => (
                <div key={index} className="post-card">
                    <h2>{post.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: post.selftext_html }} />
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                        Read more
                    </a>
                    <p>Score: {post.score}</p>
                </div>
            ))}
        </div>
    );
};

export default Exercise;
