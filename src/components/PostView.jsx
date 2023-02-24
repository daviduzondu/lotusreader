import React from 'react'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import Comments from './Comments';
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import moment from 'moment/moment';
import { FaComment, FaArrowCircleUp, FaRegClock, FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostView() {
    const [visited, setVisited] = useState();
    let clicked = useParams();
    clicked = clicked.id;
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    window.scrollTo(0, 0)
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
                }).catch((e) => setError(true))
        }
    }, [clicked])

    useEffect(() => {
        const showToastMessage = () => {
            toast(`If you click (or tap) on the name of a parent in a discussion, you will be directed to the comment that the parent wrote.`, {
                position: toast.POSITION.TOP_CENTER,
                progress: undefined
            });
        };
        if (!JSON.parse(localStorage.getItem('visited'))) {
            console.log('me')
            showToastMessage()
            setVisited(true)
            localStorage.setItem('visited', JSON.stringify(true))
        }
    }, [visited])

    if (error) {
        return <Error />
    }

    if (post) {
        return (

            <div className='postview md:w-2/3 md:m-auto overflow-x-hidden mt-10px -z-1' id="scrollbar1">
                <div>
                    <ToastContainer
                        position="top-right"
                        autoClose={7000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
                <div className='text-3xl pt-5 font-sans tracking-tight font-semibold mx-3'>{post.title}</div>
                <div className='post-view-headers flex items-center my-3 md:w-3/4'>
                    <div className='font-bold hover:underline flex items-center hover:cursor-pointer w-fit mx-3 text-blue-900 md:flex-none flex-1'>
                        <FaUser className='inline mr-2' />{post.author}</div>
                    <div className='font-bold mx-3 flex items-center w-fit text-blue-900'>
                        <FaRegClock className='inline mr-2' /> {moment(post.created_at).fromNow()}</div>
                    <div className='font-bold mx-3 flex items-center w-fit text-blue-900'>
                        <FaArrowCircleUp className='inline mr-2' />{post.points}</div>
                    <div className='font-bold mx-3 flex items-center w-fit text-blue-900'><FaComment className='inline mr-2' />{post.children.length}</div>
                </div>
                {post.text && <div className={(post.type === "text" || "story") ? `mx-3 [&>p>a]:underline [&>p>a]:text-blue-800 bg-blue-50 py-5 px-3 rounded-lg` : undefined}>{parse(post.text)}</div>}
                {post.url &&
                    <div className='w-full p-5 bg-blue-200 hover:bg-blue-50 hover:duration-300 hover:cursor-pointer duration-300 rounded-xl text-xl border text-center' onClick={() => window.open(post.url)}>{post.url}<BsBoxArrowInUpRight className='ml-3 inline' /></div>}
                <Comments comments={post.children} postAuthor={post.author} />
            </div>
        )
    } else if (!post || loading) {
        return <Loading />
    }
}

export default PostView