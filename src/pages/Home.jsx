import { useState, useEffect, useContext } from 'react';
import useFetchAll from '../hooks/useFetchAll';
import PostList from '../components/PostList';
import Loading from '../components/Loading';

function Home() {
    const [page, setPage] = useState(1);
    const { news, type, loading } = useFetchAll("news", page);
    const [clicked, setClicked] = useState();
    
  
    
    if (loading) {
        return <Loading />
    }
    if (!loading) {
        return (
            // <div className=''>
            <div className=''>
                <PostList news={news} page={page} setPage={setPage} setClicked={setClicked} />
                {/* <PostView clicked={clicked}/> */}

            </div>
        )
    }
}

export default Home;
