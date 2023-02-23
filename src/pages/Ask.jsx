import { useState, useEffect, useContext } from 'react';
import useFetchAll from '../Hooks/useFetchAll';
import usePageBottom from '../Hooks/usePageBottom';
import PostList from '../components/PostList';
import PostView from '../components/PostView';
import Loading from '../components/Loading';
function Ask() {
    const [page, setPage] = useState(1);
    const { news, type, loading } = useFetchAll("ask", page);
    const reachedBottom = usePageBottom();
    const [clicked, setClicked] = useState();

    if (loading) {
        return <Loading />
    }
    if (!loading) {
        return (
            <div className=''>
                <PostList news={news} page={page} setPage={setPage} setClicked={setClicked} />
                
            </div>
        )
    }
}

export default Ask;
