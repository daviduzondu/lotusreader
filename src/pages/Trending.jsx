import { useState, useEffect, useContext } from 'react';
import useFetchAll from '../Hooks/useFetchAll';
import PostList from '../components/PostList';
import Loading from '../components/Loading';
function Trending() {
    const [page, setPage] = useState(1);
    const { news, type, loading } = useFetchAll("active", page);

    if (loading) {
        return <Loading />
    }
    if (!loading) {
        return (
            <div className=''>
                <PostList news={news} page={page} setPage={setPage} type={type} />
                
            </div>
        )
    }
}

export default Trending;
