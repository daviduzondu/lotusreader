import { useState, useEffect, useContext } from 'react';
import useFetchAll from '../Hooks/useFetchAll';
import usePageBottom from '../Hooks/usePageBottom';
import PostList from '../components/PostList';
import PostView from '../components/PostView';
import Loading from '../components/Loading';
import { Outlet } from 'react-router-dom';
function New() {
    const [page, setPage] = useState(1);
    const { news, type, loading } = useFetchAll("newest", page);
    const reachedBottom = usePageBottom();
    const [clicked, setClicked] = useState();

    if (loading) {
        return <Loading />
    }
    if (!loading) {
        return (
            // <div className=''>
            <div className=''>
                <PostList news={news} page={page} setPage={setPage} setClicked={setClicked} />
            </div>
        )
    }
}

export default New;
