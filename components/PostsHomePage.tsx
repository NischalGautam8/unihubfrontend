import { postinterface } from '@/interfaces/postinterface'
import React, { useState, useEffect } from 'react'
import SinglePost from './SinglePost';
import SinglePostSkeleton from './SinglePostSkeleton';

function PostsHomePage() {
    const [posts, setPosts] = useState<postinterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch("https://unihubbackend.onrender.com/api/posts");
                const data = await response.json();
                setPosts(data.msg);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        }   
        getPosts();
    }, []);

    return (
        <div className='w-1/2 pb-2'>
            {loading ? (
                <div className="space-y-6">
                    {[...Array(5)].map((_, index) => (
                        <SinglePostSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {posts.map((element) => (
                        <SinglePost key={element._id} {...element}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostsHomePage;
