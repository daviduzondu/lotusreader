import { useState, useEffect, useContext } from 'react';
import useFetchAll from '../hooks/useFetchAll';
import usePageBottom from '../hooks/usePageBottom';
import PostList from '../components/PostList';
import PostView from '../components/PostView';
import Loading from '../components/Loading';
function Jobs() {
    const [page, setPage] = useState(1);
    const { news, type, loading } = useFetchAll("jobs", page);
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

export default Jobs;