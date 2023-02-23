import React from 'react'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import Comments from './Comments';
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import { useLocation } from 'react-router-dom';
import ClickPrompt from './ClickPrompt';
function PostView() {

    let clicked = useParams();
    clicked = clicked.id;
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    window.scrollTo(0,0)
    useEffect(() => {
        setPost();
        setLoading(true);
        setError(false);
        if (clicked !== undefined) {
            fetch(`https://hn.algolia.com/api/v1/items/${clicked}`)
                .then(res => res.json())
                .then(data => {
                    setPost(data);
                    setLoading(false);
                }).catch((e)=>setError(true))
        }
    }, [clicked])

    if(error){
        return <Error />
    }

    if (!clicked) {
        return <ClickPrompt />
    }

    if (post) {
        return (
            <div className='postview md:w-2/3 md:m-auto overflow-x-hidden mt-10px -z-1' id="scrollbar1">
                <div className='text-3xl pt-5 font-sans tracking-tight font-semibold mx-3'>{post.title}</div>
                <div className='font-bold hover:underline hover:cursor-pointer w-fit mx-3 text-blue-900 mt-4'>{post.author}</div>
                <div className='font-bold mx-3 hover:underline hover:cursor-pointer w-fit text-blue-900'>{post.time_ago}</div>
                {post.text && <div className={(post.type === "text" || "story") ? `mx-3 [&>p>a]:underline [&>p>a]:text-blue-800 bg-blue-50 py-5 px-3 rounded-lg` : undefined}>{parse(post.text)}</div>}
                {post.url &&
                    <div className='mx-3 w-full p-5 hover:bg-blue-50 hover:duration-300 hover:cursor-pointer duration-300 rounded-xl text-xl border text-center' onClick={() => window.open(post.url)}>{post.url}<BsBoxArrowInUpRight className='ml-3 inline' /></div>}
                <Comments comments={post.children} />
            </div>
        )
    } else if (!post || loading) {
        return <Loading />
    }
}

export default PostView